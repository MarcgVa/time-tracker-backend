const router = require("express").Router();
const {
  getTimeEntries,
  startTimer,
  stopTimer,
  delTimeEntry,
} = require("../controllers/timeEntriesController");
const { protect } = require("../middleware/protect");

router.get("time/:id", getTimeEntries);
router.post("/time/:id/start", protect, startTimer);
router.put("/time/:id/stop", protect, stopTimer);
router.delete("/time/:id/delete", protect, delTimeEntry);

module.exports = router;
