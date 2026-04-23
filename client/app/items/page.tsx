'use client'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import { deleteItem, fetchItem } from '@/services/itemService'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Item {
  _id: string;
  name: string;
  description: string;
  variants: string[];
  basePrice: number;
}

const ItemsPage = () => {

  const [openModal, setOpenModal] = useState(false)
  const [itemData, setItemData] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const fetchData = async () => {
    const data = await fetchItem();
    setItemData(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);

      setItemData((prev) => prev.filter((item) => item._id !== id));

      toast.success("Item deleted");
    } catch (error: any) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='grid gap-3 relative lg:px-4'>
        <div className='flex items-center justify-between px-2 py-2'>
          <h1 className='font-semibold text-xl'>ItemsPage</h1>
          <Button label='Add' onclick={() => setOpenModal(true)} />
        </div>
        <div className='grid place-items-center md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-4'>
          {
            itemData.map((item) => {
              // const [size, color, weight] = item.variants || [];

              return (
                <Card
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.basePrice}
                  variants={item.variants}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              );
            })
          }
        </div>
        {
          openModal && <Modal openModal={openModal} setOpenModal={() => {
            setOpenModal(false);
            setEditItem(null); // ✅ IMPORTANT
          }} refreshItems={fetchData} editItem={editItem} />
        }
      </div>

    </>
  )
}

export default ItemsPage