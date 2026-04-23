'use client'
import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { Toaster } from 'react-hot-toast'

const LayoutClient = ({ children }: { children : ReactNode}) => {

    const [collapsed, setCollapsed] = useState(false)
    
  return (
    <div className={`grid ${!collapsed ? 'md:grid-cols-[20%_80%] lg:grid-cols-[15%_85%]' : 'md:grid-cols-[7%_93%] lg:grid-cols-[3%_97%]'} dark:text-white`}>
        <Toaster position="top-center" reverseOrder={false} />
        <nav >
          <Sidebar toggle={() => setCollapsed(!collapsed)} collapsed={collapsed}/>
        </nav>
        <main className='min-h-screen dark:bg-[#111827] dark:text-white'>
          <TopBar />
          <section className='mt-14 mb-20 p-3'>
            {children}
          </section>
        </main>
    </div>
  )
}

export default LayoutClient