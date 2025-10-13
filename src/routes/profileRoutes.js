const router = require("express").Router();
const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { getProfile, updatePassword, updateProfile } = require("../controllers/profileController.js");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);

module.exports = router;