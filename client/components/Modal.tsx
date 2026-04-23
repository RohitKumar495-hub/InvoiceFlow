'use client'
import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import { RxCross1 } from 'react-icons/rx'
import Button from './Button'
import { createItem, updateItem } from '@/services/itemService'
import toast from 'react-hot-toast'

interface ModalProps {
  openModal: boolean
  setOpenModal: () => void
  editItem?: any;
  refreshItems: () => void
}

const Modal = ({ setOpenModal, refreshItems, editItem }: ModalProps) => {

  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    price: '',
    variants: [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (index: number, value: string) => {
    const updated = [...formData.variants];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      variants: updated,
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, ''],
    }));
  };

  const removeVariant = (index: number) => {
    const updated = formData.variants.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      variants: updated,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.itemName,
      description: formData.description,
      basePrice: Number(formData.price),
      variants: formData.variants.filter(v => v.trim() !== ''),
    };

    try {
      if (editItem) {
        await updateItem(editItem.id, payload);
        toast.success("Item updated ✅");
      } else {
        await createItem(payload);
        toast.success("Item added ✅");
      }

      refreshItems();
      resetForm();
      setOpenModal();
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      description: '',
      price: '',
      variants: [''],
    });
  };

  const handleClose = () => {
    resetForm();
    setOpenModal();
  };

  useEffect(() => {
    if (editItem) {
      setFormData({
        itemName: editItem.name,
        description: editItem.description,
        price: editItem.price,
        variants: editItem.variants || [''],
      });
    }
  }, [editItem]);

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
      <div className='dark:bg-[#1f2937] px-4 py-4 rounded-md lg:w-175 grid gap-4'>
        <div className='flex justify-between items-center'>
          <h1 className='font-semibold'>Add Item</h1>
          <button onClick={handleClose} className='font-semibold cursor-pointer hover:text-red-500'><RxCross1 /></button>
        </div>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-6 gap-y-3'>
            <div className='grid gap-4 h-fit'>
              <InputBox label='Item Name *' value={formData.itemName} onChange={handleChange} name='itemName' type='text' />
              <InputBox label='Price *' type='text' value={formData.price} onChange={handleChange} name='price' />
            </div>
            <div className='grid gap-4 h-fit'>
              <InputBox label='Description *' type='text' value={formData.description} onChange={handleChange} name='description' />
              <div className="grid gap-2">
                <label>Variants</label>

                {formData.variants.map((variant, index) => (
                  <div key={index} className="flex gap-2 flex-wrap-reverse">
                    <InputBox type="text" value={variant} onChange={(e) => handleVariantChange(index, e.target.value)} placeholder={`Variant ${index + 1}`} name='variants' />

                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-500 cursor-pointer"
                    >
                      <RxCross1 size={20} />
                    </button>
                  </div>
                ))}

                <Button
                  type="button"
                  label='Add Variant'
                  onclick={addVariant}
                />
              </div>
            </div>
          </div>
          <div className='flex gap-4 items-center justify-end'>
            <Button label='Cancel' onclick={setOpenModal} />
            <Button
              label={editItem ? "Update" : "Save"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal