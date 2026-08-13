import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Mail, Phone, MapPin, MessageCircle, Edit2, Eye } from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Table } from '../components/Table'
import { customerService } from '../services/customers'
import { handleError } from '../utils/handleError'

export default function Customers() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchCustomers = async (page = 1) => {
    setLoading(true)
    try {
      const response = await customerService.getAll(page, 10)
      setCustomers(response.data.data || [])
      setTotalPages(Math.ceil((response.data.total || 0) / 10))
      setCurrentPage(page)
    } catch (error) {
      console.error(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone', render: (val) => (
      <div className="flex items-center gap-2">
        <Phone size={16} className="text-gray-400" />
        {val || 'N/A'}
      </div>
    ) },
    { key: 'email', label: 'Email', render: (val) => (
      <div className="flex items-center gap-2">
        <Mail size={16} className="text-gray-400" />
        {val || 'N/A'}
      </div>
    ) },
    { key: 'address', label: 'Address', render: (val) => (
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-gray-400" />
        {val || 'N/A'}
      </div>
    ) },
    { key: 'whatsappId', label: 'WhatsApp ID', render: (val) => (
      <div className="flex items-center gap-2">
        <MessageCircle size={16} className="text-gray-400" />
        {val || 'N/A'}
      </div>
    ) },
    { key: 'orders', label: 'Orders', render: (val) => Array.isArray(val) ? val.length : 0 }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
            <p className="text-gray-600">Manage your customer base</p>
          </div>
          <button className="flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
            <Plus size={20} />
            Add Customer
          </button>
        </div>

        <Table
          columns={columns}
          data={customers}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchCustomers}
          actions={(row) => (
            <>
              <button
                onClick={() => navigate(`/customers/${row._id}`)}
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
