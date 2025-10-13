require("dotenv").config();
const {prisma} = require("../utils/prisma")
const { bcrypt, jwt } = require("../utils/auth");
const {generateToken} = require("../utils/generateToken");


const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) return res.status(400).json({ error: "User already exists" });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ user, token });

  }catch(err){
    console.error(err);
    res.status(400).json({ error: err });
  } 
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user?.password);
    if (!valid) return res.status(403).json({ error: "Invalid credentials" });

    const token = generateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login Successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Logout Successful" });
};


module.exports = { signup, login, logout };
