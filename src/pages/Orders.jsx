import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, Edit2 } from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Table } from '../components/Table'
import { orderService } from '../services/orders'
import { handleError } from '../utils/handleError'
import { formatPrice } from '../utils/formatResponse'

export default function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState('')

  const fetchOrders = async (page = 1) => {
    setLoading(true)
    try {
      const response = await orderService.getAll(page, 10, status)
      setOrders(response.data.data || [])
      setTotalPages(Math.ceil((response.data.total || 0) / 10))
      setCurrentPage(page)
    } catch (error) {
      console.error(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders(1)
  }, [status])

  const columns = [
    { key: 'orderNumber', label: 'Order #', width: '100px' },
    { key: 'customerId', label: 'Customer', render: (val) => val?.name || 'N/A' },
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
    { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            <p className="text-gray-600">Manage customer orders</p>
          </div>
          <button className="flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
            <Plus size={20} />
            New Order
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <Table
          columns={columns}
          data={orders}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchOrders}
          actions={(row) => (
            <>
              <button
                onClick={() => navigate(`/orders/${row._id}`)}
                className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition"
              >
                <Eye size={18} />
              </button>
              <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition">
                <Edit2 size={18} />
              </button>
            </>
          )}
        />
      </div>
    </DashboardLayout>
  )
}
