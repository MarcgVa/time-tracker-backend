const router = require("express").Router();
const { login, me } = require("../controllers/auth/authController");
const { signup } = require("../controllers/auth/registerController");
const { logout } = require("../controllers/auth/logoutController");
const { protect } = require("../middleware/protect");
const loginLimiter = require("../middleware/loginLimiter");


router.get("/me", protect ,me);
router.post("/register", signup);
router.post("/login",loginLimiter, login);
router.post("/logout",logout);

module.exports = router;
