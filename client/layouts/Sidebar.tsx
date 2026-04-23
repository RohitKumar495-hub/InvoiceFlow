'use client'
import Link from 'next/link'
import { HiMenu } from "react-icons/hi";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { FaBox, FaPlus } from "react-icons/fa";
import { usePathname } from 'next/navigation';

interface SideBarProps {
    collapsed : boolean
    toggle : () => void
}

const Sidebar = ({ toggle, collapsed } : SideBarProps) => {

    const navItems = [
        { name: 'Dashboard', url: '/', icon: IoHome},
        { name: 'Items', url: '/items', icon: FaBox},
        { name: 'Create Invoice', url: '/invoices', icon: FaPlus},
    ]

    const pathName = usePathname()

  return (
    <>
        <div className={`dark:bg-[#1f2937] px-2 p-2 h-screen hidden md:block fixed ${collapsed ? '' : 'w-39 lg:w-58'}`}>
            <nav className='grid gap-3'>
                <div className='flex justify-between items-center py-2'>
                    {
                        !collapsed ? 
                        <HiMenu size={30} className='cursor-pointer' onClick={toggle} /> :
                        <HiMenuAlt2 size={30} className='cursor-pointer' onClick={toggle} />
                    }
                    <h1 className={`${collapsed ? 'hidden' : ''} font-semibold`}>ADMIN</h1>
                </div>
                <div className='grid gap-4'>
                    {
                        navItems.map((navItem) => {
                            return (
                                <Link href={navItem.url} key={navItem.name} className={`${pathName === navItem.url ? 'bg-[#354050]' : ''} p-2 rounded-md flex gap-3 items-center hover:translate-x-1 hover:bg-[#354050]`}>
                                    <navItem.icon size={20} />
                                    
                                    <p className={`${collapsed ? 'hidden' : ''}`}>{navItem.name}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            </nav>
        </div>
        <div className="dark:bg-[#1f2937] px-2 pb-2 p-2 bottom-0 fixed w-full h-14 rounded md:hidden z-10">
            <div className='flex justify-evenly'>
                    {
                        navItems.map((navItem) => {
                            return (
                                <Link href={navItem.url} key={navItem.name} className={`${pathName === navItem.url ? 'bg-[#354050]' : ''} p-2 rounded-md hover:bg-[#354050]`}>
                                    <navItem.icon size={20} />
                                </Link>
                            )
                        })
                    }
            </div>
        </div>
    </>

  )
}

export default Sidebar