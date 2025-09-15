const { get } = require("../../server/app");
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
    const { projectId, total } = req.body;
    const invoice = await prisma.invoice.create({
      data: {
        projectId,
        total,
        issuedAt: new Date(),
      },
    });
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