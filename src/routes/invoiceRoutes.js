const router = require("express").Router();
const { getInvoices, getInvoice, createInvoice, delInvoice } = require("../controllers/invoicesController");
const { authenticateToken } = require("../middleware/auth");


app.get('/:projectId', authenticateToken, getInvoices);
app.get('/:invoice', authenticateToken, getInvoice);
app.post('/', authenticateToken, createInvoice);
app.delete('/:invoice',authenticateToken, delInvoice);


module.exports = router;
