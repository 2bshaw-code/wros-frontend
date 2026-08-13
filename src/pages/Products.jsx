import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Edit2, Search, Eye } from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Table } from '../components/Table'
import { productService } from '../services/products'
import { handleError } from '../utils/handleError'
import { formatPrice } from '../utils/formatResponse'

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createError, setCreateError] = useState('')
  const [productForm, setProductForm] = useState({ name: '', price: '', stock: '0', category: 'General' })

  const fetchProducts = async (page = 1) => {
    setLoading(true)
    try {
      const response = await productService.getAll(page, 10, category)
      setProducts(response.data.data || [])
      setTotalPages(Math.ceil((response.data.total || 0) / 10))
      setCurrentPage(page)
    } catch (error) {
      console.error(handleError(error))
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true)
      try {
        const response = await productService.search(searchQuery)
        setProducts(response.data.data || [])
        setTotalPages(1)
      } catch (error) {
        console.error(handleError(error))
      } finally {
        setLoading(false)
      }
    } else {
      fetchProducts(1)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.delete(id)
        fetchProducts(currentPage)
      } catch (error) {
        console.error(handleError(error))
      }
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    setCreateError('')

    try {
      await productService.create({
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock)
      })
      setProductForm({ name: '', price: '', stock: '0', category: 'General' })
      setShowCreateForm(false)
      fetchProducts(1)
    } catch (error) {
      setCreateError(handleError(error))
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [category])

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'sku', label: 'SKU' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price', render: (val) => formatPrice(val || 0) },
    { key: 'stock', label: 'Stock' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <button
            onClick={() => setShowCreateForm((isVisible) => !isVisible)}
            className="flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreate} className="bg-white rounded-lg shadow p-6 space-y-4">
            {createError && <p className="text-sm text-red-600">{createError}</p>}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                value={productForm.name}
                onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
                placeholder="Product name"
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={productForm.price}
                onChange={(event) => setProductForm({ ...productForm, price: event.target.value })}
                placeholder="Price"
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
              />
              <input
                type="number"
                min="0"
                value={productForm.stock}
                onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })}
                placeholder="Stock"
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
              />
              <input
                value={productForm.category}
                onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}
                placeholder="Category"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowCreateForm(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-whatsapp-green text-white rounded-lg hover:bg-opacity-90 transition">Create Product</button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Search
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
              <option value="books">Books</option>
            </select>
          </div>
        </div>

        <Table
          columns={columns}
          data={products}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchProducts}
          actions={(row) => (
            <>
              <button
                onClick={() => navigate(`/products/${row._id}`)}
                className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition"
              >
                <Eye size={18} />
              </button>
              <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition">
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(row._id)}
                className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        />
      </div>
    </DashboardLayout>
  )
}
