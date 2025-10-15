const {jwt} = require('jsonwebtoken');

const generateToken = ({ userId }) => {
  console.log('generateToken userId', userId);

  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
};

const generateRefreshToken = ({userId}) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};

module.exports = { generateToken, generateRefreshToken };