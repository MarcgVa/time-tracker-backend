const router = require("express").Router();
const {
  getInvoices,
  getInvoice,
  createInvoice,
  delInvoice,
  getInvoiceEntries,
} = require("../controllers/invoicesController");
const { protect } = require("../middleware/protect");

router.get("/invoice/:projectId/invoices", protect, getInvoices);
router.get("/invoice/:id/details", protect, getInvoiceEntries);
router.get("/invoice/:id", protect, getInvoice);
router.post("/invoice/", protect, createInvoice);
router.delete("/invoice/:id/delete", protect, delInvoice);

module.exports = router;
