const router = require("express").Router();
const { protect } = require("../middleware/protect.js");
const { getDashboardInfo } = require("../controllers/dashboardController.js");

router.get('/', protect, getDashboardInfo);

module.exports = router;
