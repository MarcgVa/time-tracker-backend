const router = require("express").Router();
const {
  getInvoices,
  getInvoice,
  createInvoice,
  delInvoice,
  getInvoiceEntries,
} = require("../controllers/invoicesController");
const { protect } = require("../middleware/protect");

router.get("/:projectId/invoices", protect, getInvoices);
router.get("/:id/details", protect, getInvoiceEntries);
router.get("/:id", protect, getInvoice);
router.post("/new", protect, createInvoice);
router.delete("/:id/delete", protect, delInvoice);

module.exports = router;
