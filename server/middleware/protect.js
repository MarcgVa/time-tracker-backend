require('dotenv').config();
const { prisma } = require("../utils/prisma");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { protect };
