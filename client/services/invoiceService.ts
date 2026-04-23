import axiosInstance from "@/lib/axios";

export const createInvoice = async (data: any) => {
  const res = await axiosInstance.post("/invoices", data);
  return res.data;
};

export const fetchInvoices = async () => {
  const res = await axiosInstance.get("/invoices");
  return res.data;
};