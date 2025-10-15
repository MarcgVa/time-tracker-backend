require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../utils/prisma");
const e = require("express");

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    // Check for duplicate user
    const duplicate = await prisma.user.findUnique({ where: { email } });
    if (duplicate)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and store new user
    const user = await prisma.user.create({
      data: {
        name: firstName,
        email,
        password: hashedPassword,
        profile: {
          create: { firstName, lastName },
        },
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const login = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //Validate password
    const valid = await bcrypt.compare(password, user?.password);
    if (!valid) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    if (valid) {
      // Generate tokens
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      const newRefreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET
      );

      let newRefreshTokenArray = !cookies?.token
        ? user.refreshToken
        : user.refreshToken?.filter((rt) => rt !== cookies.token);

      if (cookies?.token) {
        const refreshToken = cookies.token;
        const foundToken = await prisma.user.findUnique({
          where: {
            id: user.id,
            refreshToken: { has: refreshToken },
          },
        });

        // Detected refresh token reuse!
        if (!foundToken) {
          // Delete all refresh tokens
          newRefreshTokenArray = [];
        }
        console.log("attempted refresh token reuse at login!");
        res.clearCookie("token", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      }

      // Save refreshToken to current user
      const updatedTokenArray = [...newRefreshTokenArray, newRefreshToken];
      const result = await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: updatedTokenArray },
      });
      console.log("updated user with new refreshToken");

      // Create secure cookie with refresh token
      res.cookie("token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      // Send access token to client
      res.json({
        token: accessToken,
        user: { id: user.id, name: user.name, email: user.email },
      });
      console.log("user logged in");
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  res.json({ message: "Logout Successful" });
};

module.exports = { signup, login, logout };
