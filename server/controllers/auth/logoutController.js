require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../utils/prisma");
const e = require("express");

const logout = (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  res.json({ message: "Logout Successful" });
};

module.exports = { logout };