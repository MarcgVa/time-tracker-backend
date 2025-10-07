const { prisma } = require("../utils/prisma");



const getInvoices = async (req, res, next) => {
  try {
    const { projectId } = req.params.projectId;
   
    const invoices = await prisma.invoice.findMany({
      where: {
        projectId,
      },
      include: {
        project: true,
      },
    });

    res.json(invoices);
  } catch (err) {
    console.error(err);
  }
};


const getInvoice = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    if (!id) return res.status(400).json({ error: "Bad request" });
    
    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
    });

    res.json(invoice);

  } catch (err) {
    console.error(err);
  }
};

const createInvoice = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    if (!projectId) return res.status(400).json({ error: "Bad request" });

    //Get project and timeEntries
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        timeEntries: {
          where: {
            invoice: null,
          },
        },
      },
    });
    
    if (!project) { return res.Status(404).json({ error: "Project not found" }) };

    //calculate invoice amount
    const seconds = project.timeEntries.reduce((s, e) => s + (e.endTime && e.startTime ? (new Date(e.endTime) - new Date(e.startTime)) / 1000 : 0), 0);
    const hours = seconds / 3600;
    const total = Number((hours * (project.hourlyRate || 0)).toFixed(2));
 
    //create invoice
    const invoice = await prisma.invoice.create({
      data: {
        projectId,
        total,
        issuedAt: new Date(),
      },
    });

    if (!invoice) return res.status(404).json({ error: 'Failed to create invoice' });
    
    //Update timeEntries that were included on this invoice
    await prisma.timeEntry.updateMany({
      where: {
        projectId,
        invoice: null,
      },
      data: {
        invoice: invoice.id,
      },
    });

    res.json(invoice);

  } catch (err) {
    console.error(err);
  }
};

const delInvoice = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const invoice = await prisma.invoice.delete({
      where: {
        id,
      },
    });

    if (!invoice) return res.status(404).json({ error: 'Unable to delete invoice' });
    res.Status(204);
    
  } catch (err) {
    console.error(err);
  }
};

const getInvoiceEntries = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entries = await prisma.timeEntry.findMany({
      where: {
        invoice: id,
      },
    });

    res.json(entries);

  } catch (err) {
    console.error(err);
  }
};



module.exports = {getInvoices, getInvoice, createInvoice, delInvoice, getInvoiceEntries};