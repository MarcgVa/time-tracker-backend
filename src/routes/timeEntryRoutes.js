const router = require("express").Router();
const { getTimeEntries, startTimer, stopTimer, delTimeEntry } = require("../controllers/timeEntriesController");
const { authenticateToken } = require("../middleware/auth");


router.get('/', getTimeEntries);
router.post('/start', authenticateToken, startTimer);
router.put('/stop', authenticateToken, stopTimer);
router.delete('/',authenticateToken, delTimeEntry);

module.exports = router;
