import { TbBrandTablerFilled } from "react-icons/tb";

const TopBar = () => {

  return (
    <div className='dark:bg-[#1f2937] px-2 py-3 top-0 fixed w-full z-10'>
        <div className='flex justify-between md:max-w-xl lg:max-w-7xl'>
            <div className='flex gap-2 items-center'>
                <TbBrandTablerFilled size={25}/>
                <h1 className='font-semibold font-mono text-xl'>HealthyChef</h1>
            </div>
        </div>
    </div>
  )
}

export default TopBar