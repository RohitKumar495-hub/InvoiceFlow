// src/services/itemService.ts
import axiosInstance from "@/lib/axios";

export const createItem = async (data: any) => {
  const res = await axiosInstance.post("/items", data)
  return res.data
};

export const fetchItem = async () => {
    const res = await axiosInstance.get("items")
    return res.data
}

export const deleteItem = async (id: string) => {
  const res = await axiosInstance.delete(`/items/${id}`);
  return res.data;
};

export const updateItem = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/items/${id}`, data);
  return res.data;
};
