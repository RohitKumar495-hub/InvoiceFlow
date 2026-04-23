'use client'

import { useEffect, useState } from 'react'
import { fetchInvoices } from '@/services/invoiceService'
import { generateInvoicePdf } from "@/utils/generateInvoicePDF";

interface Invoice {
    _id: string;
    invoiceNumber: string;
    date: string;

    customerDetails: {
        name: string;
        email?: string;
        phone?: string;
        address?: string;
    };

    items?: {
        name: string;
        quantity: number;
        price: number;
        gst: number;
        discount: number;
        discountType: "%" | "₹";
    }[]; // 👈 ADD THIS

    summary: {
        subtotal?: number;
        totalDiscount?: number;
        totalGST?: number;
        grandTotal: number;
    };
}

const Table = () => {

    const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
        });
    };

    const getData = async () => {
        try {
            const data = await fetchInvoices();
            setInvoiceData(data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='border-2 rounded-md min-w-32 overflow-scroll lg:overflow-hidden'>
            <table className='w-full text-center'>
                <thead className='border-b'>
                    <tr className='text-xs lg:text-base'>
                        <th className='border-r p-2'>Invoice No.</th>
                        <th className='border-r p-2'>Customer</th>
                        <th className='border-r p-2'>Email</th>
                        <th className='border-r p-2'>Amount</th>
                        <th className='border-r p-2'>Date</th>
                        <th className='border-r p-2'>Download</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        invoiceData.map((data) => (
                            <tr key={data._id} className='border-b text-xs lg:text-base'>
                                <td className='border-r p-2'>{data.invoiceNumber}</td>
                                <td className='border-r p-2'>{data.customerDetails?.name}</td>
                                <td className='border-r p-2'>{data.customerDetails?.email}</td>
                                <td className='border-r p-2'>
                                    {formatCurrency(data.summary?.grandTotal)}
                                </td>
                                <td className='border-r p-2'>{data.date}</td>
                                <td className='border-r p-2'>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                invoiceNumber: data.invoiceNumber,
                                                date: data.date,
                                                customerDetails: data.customerDetails,
                                                items: data.items,
                                                summary: data.summary,
                                            };

                                            generateInvoicePdf(
                                                {
                                                    invoiceNumber: data.invoiceNumber,
                                                    date: data.date,
                                                    customerDetails: data.customerDetails,
                                                    items: data.items ?? [],
                                                    summary: data.summary,
                                                },
                                                (item) => {
                                                    const base = item.price * item.quantity;

                                                    const discount =
                                                        item.discountType === "%"
                                                            ? (base * item.discount) / 100
                                                            : item.discount;

                                                    const afterDiscount = base - discount;
                                                    const gst = (afterDiscount * item.gst) / 100;

                                                    return (afterDiscount + gst).toFixed(2);
                                                }
                                            );
                                        }}


                                        className="cursor-pointer hover:underline"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table