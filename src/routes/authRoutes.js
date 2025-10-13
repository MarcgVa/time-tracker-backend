const router = require("express").Router();
const { signup, login, logout } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const { protect } = require("../middleware/authMiddleware");



router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/logout", protect, logout);


module.exports = router;