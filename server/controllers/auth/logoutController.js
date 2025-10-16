require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../utils/prisma");
const e = require("express");

const logout = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(204); //No Content
  const refreshToken = cookies.token;
  const user = await prisma.user.findUnique({ where: { refreshToken: { has: refreshToken }, }, },);
  if (!user) {  
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }
  
  const results = await prisma.user.delete({ where: { refreshToken: { equals: refreshToken }, }, },);
  console.log('resulst', results);

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
};

module.exports = { logout };