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

module.exports = { signup };
