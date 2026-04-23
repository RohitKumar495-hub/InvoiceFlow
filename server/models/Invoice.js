import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: String,
    date: String,

    customerDetails: {
      name: String,
      phone: String,
      email: String,
      address: String,
    },

    items: [
      {
        itemId: String,
        name: String,
        variant: String,
        quantity: Number,
        price: Number,
        gst: Number,
        discount: Number,
        discountType: String,
        total: Number,
      },
    ],

    summary: {
      subtotal: Number,
      totalGST: Number,
      totalDiscount: Number,
      grandTotal: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);