import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    const saved = await invoice.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};