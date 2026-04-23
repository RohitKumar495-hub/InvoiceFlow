'use client'

import InputBox from '@/components/InputBox';
import { usePathname } from 'next/navigation';
import { fetchItem } from "@/services/itemService";
import React, { useEffect, useState } from 'react';
import { createInvoice } from "@/services/invoiceService";
import { generateInvoicePdf } from "@/utils/generateInvoicePDF";
import { InvoiceItem } from "@/types/invoice";
import toast from 'react-hot-toast';
import Button from '@/components/Button';

// 🔹 Item type
interface Item {
  _id: string;
  name: string;
  description: string;
  variants: string[];
  basePrice: number;
}

const InvoicePage = () => {

  const pathName = usePathname();
  const autoGenerateInvoice_Date = pathName === '/invoices';
  const [items, setItems] = useState<Item[]>([]);

  const [formData, setFormData] = useState({
    invoiceNo: '',
    date: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    billingAddress: '',
  });

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      itemId: "",
      name: "",
      price: 0,
      quantity: 1,
      gst: 5,
      discount: 0,
      discountType: "%",
      variant: "",
    },
  ]);

  // 🔹 Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Generate invoice number
  const generateInvoiceNo = () => {
    const year = new Date().getFullYear();

    const lastNumber =
      Number(localStorage.getItem('invoiceCounter') || '0') + 1;

    localStorage.setItem('invoiceCounter', String(lastNumber));

    const padded = String(lastNumber).padStart(4, '0');

    return `INV-${year}-${padded}`;
  };

  // 🔹 Get today's date
  const getTodayDate = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // 🔹 Select item
  const handleItemSelect = (index: number, id: string) => {
    const selected = items.find((i) => i._id === id);

    if (!selected) return;

    const updated = [...invoiceItems];
    updated[index].itemId = id;
    updated[index].name = selected.name;
    updated[index].price = selected.basePrice;

    setInvoiceItems(updated);
  };

  // 🔹 Update row fields
  const handleChangeRow = <K extends keyof InvoiceItem>(
    index: number,
    field: K,
    value: InvoiceItem[K]
  ) => {
    const updated: InvoiceItem[] = [...invoiceItems];
    updated[index][field] = value;
    setInvoiceItems(updated);
  };

  // 🔹 Add new row
  const addRow = () => {
    setInvoiceItems((prev) => [
      ...prev,
      {
        itemId: "",
        name: "",
        price: 0,
        quantity: 1,
        gst: 5,
        discount: 0,
        discountType: "%",
        variant: "",
      },
    ]);
  };

  // 🔹 Calculate row total
  const calculateRowTotal = (item: InvoiceItem) => {
    const base = item.price * item.quantity;

    const discount =
      item.discountType === "%"
        ? (base * item.discount) / 100
        : item.discount;

    const afterDiscount = base - discount;

    const gst = (afterDiscount * item.gst) / 100;

    return (afterDiscount + gst).toFixed(2);
  };

  const calculateSummary = () => {
    let subtotal = 0;
    let totalGST = 0;
    let totalDiscount = 0;
    let grandTotal = 0;

    invoiceItems.forEach((item) => {
      const base = item.price * item.quantity;

      const discount =
        item.discountType === "%"
          ? (base * item.discount) / 100
          : item.discount;

      const afterDiscount = base - discount;

      const gst = (afterDiscount * item.gst) / 100;

      subtotal += base;
      totalDiscount += discount;
      totalGST += gst;
      grandTotal += afterDiscount + gst;
    });

    return {
      subtotal,
      totalDiscount,
      totalGST,
      grandTotal,
    };
  };

  const summary = calculateSummary();



  const handleSaveInvoice = async () => {
    const payload = {
      invoiceNumber: formData.invoiceNo,
      date: formData.date,

      customerDetails: {
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        address: formData.billingAddress,
      },

      items: invoiceItems.map((item) => ({
        ...item,
        total: Number(calculateRowTotal(item)),
      })),

      summary,
    };

    try {
      await createInvoice(payload);
      toast.success("Invoice saved successfully")
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong")
    }
  };

  const handleDownloadPDF = () => {
    const payload = {
      invoiceNumber: formData.invoiceNo,
      date: formData.date,
      customerDetails: {
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        address: formData.billingAddress,
      },
      items: invoiceItems,
      summary,
    };

    generateInvoicePdf(payload, calculateRowTotal);
  };

  // 🔹 Auto generate invoice
  useEffect(() => {
    if (autoGenerateInvoice_Date) {
      setFormData((prev) => ({
        ...prev,
        invoiceNo: generateInvoiceNo(),
        date: getTodayDate(),
      }));
    }
  }, [autoGenerateInvoice_Date]);

  // 🔹 Fetch items
  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItem();
      setItems(data);
    };

    getItems();
  }, []);

  return (
    <div className='grid gap-4' id='invoice-content'>

      <h1 className='text-center font-semibold text-xl'>
        Generate Invoice
      </h1>

      <div className=''>

        {/* 🔹 Form */}
        <form className='grid gap-3 grid-cols-2'>

          <div>

            <div className='dark:bg-[#1f2937] rounded-md px-2 py-2 h-fit'>
              <h2 className="font-semibold mb-3">Customer Details</h2>
              <div className='grid grid-cols-2 gap-6'>
                <InputBox label='Invoice No. *' value={formData.invoiceNo} name='invoiceNo' type='text' />
                <InputBox label='Date *' value={formData.date} name='date' type='text' />

                <InputBox label='Full Name *' value={formData.fullName} name='fullName' type='text' onChange={handleChange} />
                <InputBox label='Phone Number *' value={formData.phoneNumber} name='phoneNumber' type='text' onChange={handleChange} />
                <InputBox label='Email *' value={formData.email} name='email' type='email' onChange={handleChange} />
                <InputBox label='Billing Address *' value={formData.billingAddress} name='billingAddress' type='text' onChange={handleChange} />
              </div>

            </div>

            <div className="mt-6 dark:bg-[#1f2937] p-4 rounded-md">

              <h2 className="font-semibold mb-3">Summary</h2>

              <div className="flex justify-between mb-1">
                <span>Subtotal:</span>
                <span>₹{summary.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Total Discount:</span>
                <span>- ₹{summary.totalDiscount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Total GST:</span>
                <span>+ ₹{summary.totalGST.toFixed(2)}</span>
              </div>

              <hr className="my-2 border-gray-600" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Grand Total:</span>
                <span>₹{summary.grandTotal.toFixed(2)}</span>
              </div>

            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex gap-4 mt-4">
                <Button
                  type="button"
                  label='Save Invoice'
                  onclick={handleSaveInvoice}
                />

                <Button
                  type="button"
                  label='Download Invoice'
                  onclick={handleDownloadPDF}
                />
              </div>
            </div>
          </div>




          {/* 🔥 Line Items */}
          <div className="dark:bg-[#1f2937] px-2 py-2 rounded-md max-h-[80vh] overflow-y-auto h-fit">

            <h2 className="font-semibold mb-3">Line Items</h2>
            <div className='grid gap-2'>
              {invoiceItems.map((row, index) => (
                <div key={index} className="grid gap-2 mb-2 grid-cols-2">

                  {/* Item */}
                  <div className='grid gap-1'>
                    <label htmlFor="select-item">Select Item</label>
                    <select
                      value={row.itemId}
                      onChange={(e) => handleItemSelect(index, e.target.value)}
                      className="dark:bg-[#2e3b4c] px-2 py-2 outline-none rounded-md w-35 md:w-auto"
                    >
                      <option value="">Select Item</option>
                      {items.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <InputBox
                    label='Quantity'
                    type="number"
                    name={'quantity'}
                    value={String(row.quantity)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeRow(index, "quantity", Number(e.target.value))
                    }
                  />

                  {/* GST */}
                  <InputBox
                    label='GST'
                    name='gst'
                    type="number"
                    value={String(row.gst)}
                    onChange={(e) =>
                      handleChangeRow(index, "gst", Number(e.target.value))
                    }
                  />

                  {/* Discount */}
                  <InputBox
                    type="number"
                    label='Discount'
                    name='discount'
                    value={String(row.discount)}
                    onChange={(e) =>
                      handleChangeRow(index, "discount", Number(e.target.value))
                    }
                  />

                  {/* Discount Type */}
                  <div className='grid gap-1'>
                    <label htmlFor="discount-type">Discount Type</label>
                    <select
                      value={row.discountType}
                      name='discount-type'
                      onChange={(e) =>
                        handleChangeRow(index, "discountType", e.target.value as "%" | "₹")
                      }
                      className="dark:bg-[#2e3b4c] px-2 py-2 outline-none rounded-md w-35 md:w-auto"
                    >
                      <option value="%">%</option>
                      <option value="₹">₹</option>
                    </select>
                  </div>

                  {/* Price */}
                  <InputBox
                    name='price'
                    type="text"
                    label='Price'
                    value={String(row.price)}
                    onChange={(e) =>
                      handleChangeRow(index, "price", Number(e.target.value))
                    }
                  />

                  {/* Total */}
                  <InputBox
                    name='total'
                    type="text"
                    label='Total'
                    value={`₹${calculateRowTotal(row)}`}
                    onChange={(e) =>
                      handleChangeRow(index, "price", Number(e.target.value))
                    }
                  />

                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addRow}
              className="mt-2 text-indigo-400 cursor-pointer"
            >
              + Add Item
            </button>

          </div>

        </form>
      </div>

    </div>
  )
}

export default InvoicePage;