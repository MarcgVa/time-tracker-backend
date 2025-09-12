require("dotenv").config();
const {prisma} = require("../utils/prisma")
const { bcrypt, jwt } = require("../utils/auth");


const signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

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
    res.status(400).json({ error: "User already exists" });
  }
};

const login = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user?.password);

  if (!match) return res.status(403).json({ error: "Invalid credentials" });
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({ user, token });
};


const me = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  console.log(token);
  const id = jwt.verify(token, process.env.JWT_SECRET).id;

  const user = await prisma.user.findUnique({
    where: {
      id
    },
  });

  res.send(user);
};




module.exports = { signup, login, me };
