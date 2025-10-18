require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../utils/prisma");



const login = async (req, res, next) => {
 
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);


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
    // Send access token to client
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ user, token });
  
    console.log("user logged in");
 
  } catch (err) {
    console.error(err);
  }
};

const me = async (req, res, next) => {

  const token = req.headers?.authorization.split(" ")[1]
  const id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).id;
  const user = await prisma.user.findUnique({ where: { id }, });
  res.send(user);
}
module.exports = {login, me};
