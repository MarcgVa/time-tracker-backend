const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { prisma } = require("../../utils/prisma");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(401);
  const refreshToken = cookies.token;
  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });

  const foundUser = await prisma.user.findUnique({ where: { refreshToken:{has: refreshToken} } });

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });
        const result = await prisma.user.update({
          where: { id: hackedUser.id },
          data: { refreshToken: [] },
        });
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await prisma.user.update({
          where: {
            id: foundUser.id,
          },
          data: { refreshToken: foundUser.refreshToken },
        });
      }

      if (err || foundUser.id !== decoded.id) {
        return res.sendStatus(403);
      }

      // Refresh token was still valid
      const accessToken = jwt.sign(
        {
          user: decoded.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      const newRefreshToken = jwt.sign(
        { user: foundUser.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await prisma.user.update({
        where: {
          id: foundUser.id,
        },
        data: { refreshToken: foundUser.refreshToken },
      });

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
