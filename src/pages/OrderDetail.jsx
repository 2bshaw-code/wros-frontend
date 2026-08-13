import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Printer,
  User,
  Mail,
  Phone,
  Package,
  DollarSign
} from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { orderService } from '../services/orders'
import { handleError } from '../utils/handleError'
import { calculateRegionalEstimate, formatDiscount, formatPrice } from '../utils/formatResponse'

const STATUS_STYLES = {
  completed: 'bg-[#E7F5F3] text-[#0C6A60]',
  paid: 'bg-[#E7F5F3] text-[#0C6A60]',
  shipped: 'bg-purple-100 text-purple-700',
  processing: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700'
}

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await orderService.getById(id)
        setOrder(response.data.data || response.data)
      } catch (err) {
        setError(handleError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  const handlePrint = () => window.print()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-whatsapp-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !order) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error || 'Order not found'}</p>
          <Link to="/orders" className="inline-block mt-4 text-whatsapp-green font-medium hover:underline">
            Back to Orders
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const items = order.items || []
  const status = (order.status || 'pending').toLowerCase()
  const customer = order.customerId || {}
  const regionalEstimate = calculateRegionalEstimate(order.total, 1, order.discount || order.discountAmount)

  const itemColumns = [
    { key: 'productId', label: 'Product', render: (val) => val?.name || 'N/A' },
    { key: 'price', label: 'Price', render: (val) => formatPrice(val || 0) },
    { key: 'quantity', label: 'Qty' },
    {
      key: 'lineTotal',
      label: 'Line Total',
      render: (val, row) => formatPrice((row.price || 0) * (row.quantity || 0))
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between print:hidden">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            <Printer size={18} />
            Print Invoice
          </button>
        </div>

        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-sm p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order #{order.orderNumber || order._id}</h1>
            <p className="text-gray-600 text-sm mt-1">
              Placed on {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Order Status" value={status.charAt(0).toUpperCase() + status.slice(1)} icon={Package} color="purple" />
          <Card title="Regional Estimate" value={formatPrice(regionalEstimate.total)} icon={DollarSign} color="green" description="Tax and shipping estimated locally" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-7">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
            <User size={16} />
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-gray-800 font-medium">{customer.name || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{customer.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-gray-800 font-medium">{customer.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Line Items</h3>
          <Table columns={itemColumns} data={items} loading={false} currentPage={1} totalPages={1} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-7 flex justify-end receipt-summary">
          <div className="w-full md:w-80 text-gray-800 space-y-2">
            <div className="flex justify-between"><span>Order subtotal</span><span>{formatPrice(regionalEstimate.subtotal)}</span></div>
            {regionalEstimate.discount > 0 && <div className="flex justify-between text-[#128C7E]"><span>Discount</span><span>-{formatDiscount(regionalEstimate.discount)}</span></div>}
            <div className="flex justify-between"><span>Estimated tax ({Math.round(regionalEstimate.taxRate * 100)}%)</span><span>{formatPrice(regionalEstimate.tax)}</span></div>
            <div className="flex justify-between"><span>Estimated shipping</span><span>{formatPrice(regionalEstimate.shipping)}</span></div>
            <div className="flex justify-between border-t border-[#0C6A60] pt-3 font-bold text-lg"><span>Regional estimate</span><span>{formatPrice(regionalEstimate.total)}</span></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
