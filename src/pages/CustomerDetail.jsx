import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Clock
} from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { customerService } from '../services/customers'
import { orderService } from '../services/orders'
import { handleError } from '../utils/handleError'
import { formatPrice } from '../utils/formatResponse'

export default function CustomerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true)
      setError('')
      try {
        const [customerRes, ordersRes] = await Promise.all([
          customerService.getById(id),
          orderService.getByCustomer(id, 1, 10)
        ])
        setCustomer(customerRes.data.data || customerRes.data)
        setOrders(ordersRes.data.data || [])
      } catch (err) {
        setError(handleError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-whatsapp-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !customer) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error || 'Customer not found'}</p>
          <Link to="/customers" className="inline-block mt-4 text-whatsapp-green font-medium hover:underline">
            Back to Customers
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const orderCount = Array.isArray(customer.orders) ? customer.orders.length : orders.length

  const orderColumns = [
    { key: 'orderNumber', label: 'Order #', width: '100px' },
    { key: 'total', label: 'Amount', render: (val) => formatPrice(val || 0) },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        val === 'completed' ? 'bg-green-100 text-green-700' :
        val === 'pending' ? 'bg-yellow-100 text-yellow-700' :
        val === 'cancelled' ? 'bg-red-100 text-red-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {val || 'pending'}
      </span>
    ) },
    { key: 'createdAt', label: 'Date', render: (val) => val ? new Date(val).toLocaleDateString() : 'N/A' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/customers')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft size={20} />
            Back to Customers
          </button>
          <button className="flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
            <MessageCircle size={18} />
            Contact on WhatsApp
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 bg-whatsapp-green rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
            {customer.name?.[0]?.toUpperCase() || 'C'}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{customer.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {customer.email || 'N/A'}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                {customer.phone || 'N/A'}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {customer.address || 'N/A'}
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} />
                {customer.whatsappId || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Total Orders" value={orderCount} icon={ShoppingCart} color="blue" />
          <Card title="Customer Since" value={customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'} icon={Clock} color="green" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Order History</h3>
          <Table
            columns={orderColumns}
            data={orders}
            loading={false}
            currentPage={1}
            totalPages={1}
            onRowClick={(row) => navigate(`/orders/${row._id}`)}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
