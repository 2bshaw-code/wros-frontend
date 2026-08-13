import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Table } from '../components/Table'
import { productService } from '../services/products'
import { handleError } from '../utils/handleError'
import { formatPrice } from '../utils/formatResponse'

export default function Inventory() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchInventory = async (page = 1) => {
    setLoading(true)
    try {
      const response = await productService.getAll(page, 10)
      setInventory(response.data.data || [])
      setTotalPages(Math.ceil((response.data.total || 0) / 10))
      setCurrentPage(page)
    } catch (error) {
      console.error(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory(1)
  }, [])

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'sku', label: 'SKU', render: (val) => val || 'N/A' },
    { key: 'barcode', label: 'Barcode', render: (val) => val || 'N/A' },
    { key: 'category', label: 'Category', render: (val) => val || 'N/A' },
    { key: 'price', label: 'Price', render: (val) => formatPrice(val || 0) },
    { key: 'stock', label: 'Stock' },
    { key: 'supplier', label: 'Supplier', render: (val) => val || 'N/A' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
          <p className="text-gray-600">Track stock levels across your product catalog</p>
        </div>

        <Table
          columns={columns}
          data={inventory}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchInventory}
        />
      </div>
    </DashboardLayout>
  )
}
