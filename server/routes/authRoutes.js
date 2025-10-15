const router = require("express").Router();
const { login } = require("../controllers/auth/authController");
const { signup } = require("../controllers/auth/registerController");
const { logout } = require("../controllers/auth/logoutController");
const { handleRefreshToken } = require('../controllers/auth/refreshTokenController');
const { protect } = require("../middleware/protect");

router.get("/auth/refresh", handleRefreshToken);
router.post("/auth/register", signup);
router.post("/auth/login", login);
router.post("/auth/logout", protect, logout);

module.exports = router;
