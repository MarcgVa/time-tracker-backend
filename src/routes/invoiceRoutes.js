const router = require("express").Router();
const { getInvoices, getInvoice, createInvoice, delInvoice, getInvoiceEntries} = require("../controllers/invoicesController");
const { authenticateToken } = require("../middleware/auth");


router.get('/:projectId/invoices', authenticateToken, getInvoices);
router.get('/:id/details', authenticateToken, getInvoiceEntries);
router.get('/:id', authenticateToken, getInvoice);
router.post('/', authenticateToken, createInvoice);
router.delete('/:id/delete', authenticateToken, delInvoice);


module.exports = router;
