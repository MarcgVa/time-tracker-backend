const router = require("express").Router();
const { getTimeEntries, startTimer, stopTimer, delTimeEntry } = require("../controllers/timeEntriesController");
const { authenticateToken } = require("../middleware/auth");


router.get('/projects/:id/time-entries', getTimeEntries);
router.post('/projects/:id/time-entries', authenticateToken, startTimer);
router.put('/time-entries/:id', authenticateToken, stopTimer);
router.delete('/time-entries/:id',authenticateToken, delTimeEntry);

module.exports = router;
