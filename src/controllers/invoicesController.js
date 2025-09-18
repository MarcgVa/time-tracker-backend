const { prisma } = require("../utils/prisma");



const getInvoices = async (req, res, next) => {
  try {
    const { projectId } = req.params.projectId;
    const invoices = await prisma.invoice.findMany({
      where: {
        projectId,
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

    //Update timeEntries that were included on this invoice
    const updatedEntries = await prisma.timeEntry.updateMany({
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
    res.Status(204);
  } catch (err) {
    console.error(err);
  }
};


module.exports = {getInvoices, getInvoice, createInvoice, delInvoice};