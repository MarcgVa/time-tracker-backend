const router = require("express").Router();
const { getTimeEntries, startTimer, stopTimer, delTimeEntry } = require("../controllers/timeEntriesController");
const { authenticateToken } = require("../middleware/auth");


router.get('/projects/:id/times', getTimeEntries);
router.post('/projects/:id/start', authenticateToken, startTimer);
router.put('/time/:id/stop', authenticateToken, stopTimer);
router.delete('/time/:id/delete',authenticateToken, delTimeEntry);

module.exports = router;
