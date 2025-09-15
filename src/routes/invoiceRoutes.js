const router = require("express").Router();
const { getInvoices, getInvoice, createInvoice, delInvoice } = require("../controllers/invoicesController");
const { authenticateToken } = require("../middleware/auth");


router.get('/:projectId', authenticateToken, getInvoices);
router.get('/:invoice', authenticateToken, getInvoice);
router.post('/', authenticateToken, createInvoice);
router.delete('/:invoice',authenticateToken, delInvoice);


module.exports = router;
