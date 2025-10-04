const router = require("express").Router();
const { getInvoices, getInvoice, createInvoice, delInvoice, getInvoiceEntries} = require("../controllers/invoicesController");
const { authenticateToken } = require("../middleware/auth");


router.get('/invoice/:projectId/invoices', authenticateToken, getInvoices);
router.get("/invoice/:id/details", authenticateToken, getInvoiceEntries);
router.get("/invoice/:id", authenticateToken, getInvoice);
router.post("/invoice/", authenticateToken, createInvoice);
router.delete("/invoice/:id/delete", authenticateToken, delInvoice);


module.exports = router;
