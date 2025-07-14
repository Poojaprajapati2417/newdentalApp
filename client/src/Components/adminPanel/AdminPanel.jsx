import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminPanel = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col bg-[#f4f4f5] '>
      <Header className="z-10" />
      <div className='flex flex-1 overflow-hidden bg-[#f4f4f5] '>
        <Sidebar className="w-full h-[calc(100vh-90px)] fixed top-[90px] left-0 md:w-1/4 lg:w-1/5 bg-[#fff] rounded-tr-[40px] shadow-[5px_20px_14px_rgba(46,55,164,0.05)] overflow-y-hidden" />

        <main className="flex-1 md:ml-[25%] lg:ml-[20%] p-4 overflow-auto  mt-3">
            {children}
        </main>
      </div>
    </div>
  )
}

export default AdminPanel;