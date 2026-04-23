import Button from './Button'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

interface CardProps {
    id : string
    name : string
    description : string
    price : number
    variants: string[]
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
}

const Card = ({ id, name, description, price, variants, onEdit, onDelete  } : CardProps) => {
  return (
    <div className='dark:bg-[#1f2937] px-2 py-2 rounded-md w-70 min-h-60'>
        <div className='grid gap-2'>
            <h1 className='text-xl font-semibold'>{name}</h1>
            <p>Description:- {description}</p>
            <p>Price :- ₹ {price}</p>
            {variants.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-1">
                    {variants.map((variant, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-700 rounded"
                    >
                        {variant}
                    </span>
                    ))}
                </div>
            )}
            <div className='grid grid-cols-2 gap-4'>
                <Button label='Edit' Icon={FaEdit} onclick={() => onEdit({ id, name, description, price, variants })} />
                <Button label='Delete' Icon={MdDelete} onclick={() => onDelete(id)}  />
            </div>
        </div>
    </div>
  )
}

export default Card