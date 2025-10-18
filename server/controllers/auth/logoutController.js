
const logout = (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  res.json({ message: "Logout Successful" });
};


module.exports = { logout };