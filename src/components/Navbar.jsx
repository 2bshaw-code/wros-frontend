import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-[#F0F2F5] to-white border-b border-[#E4E6EB] sticky top-0 z-50">
      <div className="px-5 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-whatsapp-green rounded-xl shadow-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WROS</h1>
            <p className="text-xs text-gray-500">Retail operations</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-gray-600">{user?.name}</span>
          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-[#1877F2] hover:bg-blue-50 rounded-lg transition"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}
