const router = require("express").Router();
const { protect } = require('../middleware/protect');
const {
  getProfile,
  updatePassword,
  updateProfile,
} = require("../controllers/profileController.js");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/profile/password", protect, updatePassword);

module.exports = router;
