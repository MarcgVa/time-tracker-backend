const router = require("express").Router();
const {
  getTimeEntries,
  startTimer,
  stopTimer,
  delTimeEntry,
} = require("../controllers/timeEntriesController");
const { protect } = require("../middleware/protect");

router.get("/projects/:id/times", getTimeEntries);
router.post("/projects/:id/start", protect, startTimer);
router.put("/time/:id/stop", protect, stopTimer);
router.delete("/time/:id/delete", protect, delTimeEntry);

module.exports = router;
