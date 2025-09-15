const router = require("express").Router();
const { getTimeEntries, startTimer, stopTimer, delTimeEntry } = require("../controllers/timeEntriesController");
const { authenticateToken } = require("../middleware/auth");


router.get('/', getTimeEntries);
router.post('/startTime', authenticateToken, startTimer);
router.put('/stopTime', authenticateToken, stopTimer);
router.delete('/delEntry',authenticateToken, delTimeEntry);

module.exports = router;
