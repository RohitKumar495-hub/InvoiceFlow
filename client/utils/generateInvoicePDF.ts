import jsPDF from "jspdf";
import { InvoiceItem } from "@/types/invoice";

type DiscountType = "%" | "₹";

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerDetails: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  items?: InvoiceItem[];
  summary: {
    subtotal?: number;
    totalDiscount?: number;
    totalGST?: number;
    grandTotal: number;
  };
}

export const generateInvoicePdf = (
  data: InvoiceData,
  calculateRowTotal: (item: InvoiceItem) => string
) => {
  const pdf = new jsPDF("p", "mm", "a4");

  // 🔹 Header
  pdf.setFontSize(16);
  pdf.text("Invoice", 105, 10, { align: "center" });

  pdf.setFontSize(10);
  pdf.text(`Invoice No: ${data.invoiceNumber}`, 10, 20);
  pdf.text(`Date: ${data.date}`, 150, 20);

  // 🔹 Customer Details
  pdf.text(`Name: ${data.customerDetails.name ?? "-"}`, 10, 30);
  pdf.text(`Phone: ${data.customerDetails.phone ?? "-"}`, 10, 35);
  pdf.text(`Email: ${data.customerDetails.email ?? "-"}`, 10, 40);
  pdf.text(`Address: ${data.customerDetails.address ?? "-"}`, 10, 45);

  // 🔹 Table Header
  let y = 60;

pdf.setFont("helvetica", "bold");
  pdf.text("Item", 10, y);
  pdf.text("Qty", 90, y);
  pdf.text("Price", 110, y);
  pdf.text("GST", 140, y);
  pdf.text("Total", 170, y);
pdf.setFont("helvetica", "normal");

  y += 2;
  pdf.line(10, y, 200, y);

  y += 6;

  // 🔹 Items
  (data.items ?? []).forEach((item) => {
    const base = item.price * item.quantity;

    const discount =
      item.discountType === "%"
        ? (base * item.discount) / 100
        : item.discount;

    const afterDiscount = base - discount;
    const gst = (afterDiscount * item.gst) / 100;
    const total = (afterDiscount + gst).toFixed(2);

    pdf.text(item.name ?? "-", 10, y);
    pdf.text(String(item.quantity ?? 0), 95, y);
    pdf.text(`Rs. ${item.price ?? 0}`, 110, y);
    pdf.text(`${item.gst ?? 0}%`, 140, y);
    pdf.text(`Rs. ${total}`, 170, y);

    y += 7;
  });

  // 🔹 Summary
  y += 10;

  pdf.line(120, y, 200, y);
  y += 6;

  pdf.text(
    `Subtotal: Rs. ${(data.summary.subtotal ?? 0).toFixed(2)}`,
    120,
    y
  );
  y += 6;

  pdf.text(
    `Discount: Rs. ${(data.summary.totalDiscount ?? 0).toFixed(2)}`,
    120,
    y
  );
  y += 6;

  pdf.text(
    `GST: Rs. ${(data.summary.totalGST ?? 0).toFixed(2)}`,
    120,
    y
  );
  y += 6;

  pdf.setFont("helvetica", "bold");
  pdf.text(
    `Total: Rs. ${(data.summary.grandTotal ?? 0).toFixed(2)}`,
    120,
    y
  );

  // 🔹 Save PDF
  pdf.save(`${data.invoiceNumber}.pdf`);
};