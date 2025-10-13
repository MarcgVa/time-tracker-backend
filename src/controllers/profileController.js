require("dotenv").config();
const { prisma } = require("../utils/prisma");

const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { companies: true, projects: true, profile: true },
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  
  res.json(user);
}

const updateProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    country,
    phone,
    bio,
    avatar,
  } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: { firstName,lastName, address, city, state,zip, country,phone, bio, avatar },
  });
  res.json(updatedUser);
}

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const valid = await bcrypt.compare(currentPassword, req.user.password);
  if (!valid) return res.status(400).json({ message: "Invalid current password" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashedPassword },
  });
  res.json({ message: "Password updated successfully" });
}

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
};  


