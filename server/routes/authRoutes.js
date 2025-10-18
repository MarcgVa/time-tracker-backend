const router = require("express").Router();
const { login, me } = require("../controllers/auth/authController");
const { signup } = require("../controllers/auth/registerController");
const { logout } = require("../controllers/auth/logoutController");
const { protect } = require("../middleware/protect");
const loginLimiter = require("../middleware/loginLimiter");


router.get("/auth/me", protect ,me);
router.post("/auth/register", signup);
router.post("/auth/login", loginLimiter, login);
router.post("/auth/logout", logout);

module.exports = router;
