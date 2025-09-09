const router = require("express").Router();
const { signup, login, me } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");



router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticateToken, me);


module.exports = router;