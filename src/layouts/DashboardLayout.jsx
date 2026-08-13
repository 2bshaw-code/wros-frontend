import React from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F0F2F5]">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
