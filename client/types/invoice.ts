export type InvoiceItem = {
  itemId?: string;
  name: string;
  price: number;
  quantity: number;
  gst: number;
  discount: number;
  discountType: "%" | "₹";
  variant?: string;
};