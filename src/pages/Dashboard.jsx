import React, { useEffect, useState } from 'react'
import { BarChart3, Bot, ShoppingCart, Users, Package } from 'lucide-react'
import { BobChat } from '../components/BobChat'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { orderService } from '../services/orders'
import { customerService } from '../services/customers'
import { productService } from '../services/products'
import { handleError } from '../utils/handleError'
import { formatPrice } from '../utils/formatResponse'
import { DateWeatherWidget } from '../components/DateWeatherWidget'

const docLinks = [
  { label: 'Press Release', href: '/api/docs/press-release/pdf' },
  { label: 'Partner Program', href: '/api/docs/partner-program/pdf' },
  { label: 'Reseller Kit', href: '/api/docs/reseller-kit/pdf' },
  { label: 'Investor FAQ', href: '/api/docs/investor-faq/pdf' },
  { label: 'Brand Book', href: '/api/docs/brand-book/pdf' },
  { label: 'Pre-Testing Readiness', href: '/api/docs/pre-testing-readiness/pdf' }
]

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalRevenue: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [bobOpen, setBobOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes, productsRes] = await Promise.all([
          orderService.getAll(1, 5),
          customerService.getAll(1, 1),
          productService.getAll(1, 1)
        ])

        const orders = ordersRes.data.data || []
        setRecentOrders(orders)

        const totalOrders = ordersRes.data.total || 0
        const totalCustomers = customersRes.data.total || 0
        const totalProducts = productsRes.data.total || 0
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)

        setStats({
          totalOrders,
          totalCustomers,
          totalProducts,
          totalRevenue
        })
      } catch (error) {
        console.error(handleError(error))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const columns = [
    { key: 'orderNumber', label: 'Order #', width: '100px' },
    { key: 'customerId', label: 'Customer', render: (val, row) => row.customerId?.name || 'N/A' },
    { key: 'total', label: 'Amount', render: (val) => formatPrice(val || 0) },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        val === 'completed' ? 'bg-[#E7F5F3] text-[#0C6A60]' :
        val === 'pending' ? 'bg-yellow-100 text-yellow-700' :
        val === 'cancelled' ? 'bg-red-100 text-red-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {val || 'pending'}
      </span>
    ) },
    { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="dashboard-header">
          <div><h1 className="text-4xl font-bold text-gray-900">Dashboard</h1><p className="mt-2 text-gray-600">Welcome back. Here is your business overview.</p></div>
          <DateWeatherWidget />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <Card
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            color="blue"
          />
          <Card
            title="Total Customers"
            value={stats.totalCustomers}
            icon={Users}
            color="green"
          />
          <Card
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            color="purple"
          />
          <Card
            title="Total Revenue"
            value={formatPrice(stats.totalRevenue)}
            icon={BarChart3}
            color="yellow"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Recent Orders</h2>
          <Table
            columns={columns}
            data={recentOrders}
            loading={loading}
            currentPage={1}
            totalPages={1}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated WROS PDFs</h2>
          <div className="flex flex-wrap gap-3">
            {docLinks.map((doc) => (
              <a
                key={doc.label}
                href={doc.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-lg bg-[#0FA958] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c8a48]"
              >
                {doc.label}
              </a>
            ))}
          </div>
        </div>

        {bobOpen && <BobChat onClose={() => setBobOpen(false)} />}
        <button type="button" onClick={() => setBobOpen(true)} className="bob-fab bg-whatsapp-green text-white" aria-label="Ask BOB">
          <Bot size={22} />
          Ask BOB
        </button>
      </div>
    </DashboardLayout>
  )
}
