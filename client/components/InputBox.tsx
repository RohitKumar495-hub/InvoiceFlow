interface InputBoxProps {
    label ?: string
    type : string
    value : string
    name : string
    placeholder ?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ label, type, value, name, onChange, placeholder } : InputBoxProps ) => {

  return (
    <div className='grid gap-1'>
        <label htmlFor={name}>{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            readOnly={name === 'invoiceNo' || name === 'date' || name === 'total' || name === 'price'}
            placeholder={placeholder}
            onChange={onChange}
            className={`dark:bg-[#2e3b4c] px-2 py-1 outline-none rounded-md w-35 md:w-38 lg:w-auto ${
                name === 'invoiceNo' || name === 'date' || name === 'total' || name === 'price' ? 'cursor-not-allowed' : ''
            }`}
        />
    </div>
  )
}

export default InputBox