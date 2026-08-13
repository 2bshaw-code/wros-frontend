import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  Settings,
  BarChart3,
  Bot,
  ShieldCheck,
  CreditCard,
  Truck,
  FileText,
  Menu,
  X
} from 'lucide-react'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/customers', icon: Users, label: 'Customers' },
  { path: '/inventory', icon: Warehouse, label: 'Inventory' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/crm', icon: Users, label: 'CRM' },
  { path: '/delivery', icon: Truck, label: 'Delivery' },
  { path: '/invoices', icon: FileText, label: 'Invoices' },
  { path: '/billing', icon: CreditCard, label: 'Billing', roles: ['tenant_admin', 'admin'] },
  { path: '/bob', icon: Bot, label: 'BOB AI Assistant' },
  { path: '/admin', icon: ShieldCheck, label: 'Admin Console', roles: ['admin'], permission: 'manage_tenants' },
  { path: '/settings', icon: Settings, label: 'Settings', roles: ['tenant_admin', 'admin'] },
]

const canView = (item, user) => {
  if (!item.roles && !item.permission) return true
  const permissions = user?.permissions || []
  return item.roles?.includes(user?.operatorRole) || permissions.includes(item.permission) || permissions.includes('manage_tenants')
}

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const { user } = useAuth()
  const visibleMenuItems = menuItems.filter((item) => canView(item, user))

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 lg:hidden z-40 p-3 bg-whatsapp-green text-white rounded-xl shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-[#E4E6EB] overflow-y-auto transition-transform duration-300 z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-5 border-b border-[#E4E6EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-whatsapp-green rounded-xl shadow-sm flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">WROS</h2>
              <p className="text-xs text-gray-500">Retail OS</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1.5">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-whatsapp-green text-white shadow-sm'
                    : 'text-gray-700 hover:bg-[#F0F2F5] hover:text-[#128C7E]'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-50 lg:hidden transition-opacity z-20 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  )
}
