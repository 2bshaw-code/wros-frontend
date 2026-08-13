import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Edit2,
  Package,
  Tag,
  DollarSign,
  Boxes,
  ImageOff
} from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { productService } from '../services/products'
import { handleError } from '../utils/handleError'
import { formatPrice } from '../utils/formatResponse'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await productService.getById(id)
        const data = response.data.data || response.data
        setProduct(data)

        if (data?.category) {
          const relatedRes = await productService.getAll(1, 4, data.category)
          const relatedProducts = (relatedRes.data.data || []).filter((p) => p._id !== id)
          setRelated(relatedProducts)
        }
      } catch (err) {
        setError(handleError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
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

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error || 'Product not found'}</p>
          <Link to="/products" className="inline-block mt-4 text-whatsapp-green font-medium hover:underline">
            Back to Products
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : []
  const isLowStock = (product.stock || 0) < 10

  const relatedColumns = [
    { key: 'name', label: 'Product Name' },
    { key: 'sku', label: 'SKU' },
    { key: 'price', label: 'Price', render: (val) => formatPrice(val || 0) },
    { key: 'stock', label: 'Stock' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <button className="flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
            <Edit2 size={18} />
            Edit Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {images.length > 0 ? (
                <div className="space-y-3">
                  <img
                    src={images[0]}
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-lg border border-gray-200"
                  />
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.slice(1, 5).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${product.name} ${idx + 2}`}
                          className="w-full h-16 object-cover rounded border border-gray-200"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-72 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 text-gray-400">
                  <ImageOff size={48} />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mt-3">{product.name}</h1>
                <p className="text-gray-600 mt-2">{product.description || 'No description available.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Tag className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">SKU</p>
                    <p className="text-gray-800 font-medium">{product.sku || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-gray-800 font-medium capitalize">{product.category || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-gray-800 font-medium">{formatPrice(product.price || 0)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Boxes className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Stock Level</p>
                    <p className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
                      {product.stock ?? 0} units
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Price" value={formatPrice(product.price || 0)} icon={DollarSign} color="green" />
          <Card title="Stock" value={product.stock ?? 0} icon={Boxes} color={isLowStock ? 'red' : 'blue'} description={isLowStock ? 'Low stock' : 'In stock'} />
          <Card title="Category" value={product.category || 'N/A'} icon={Package} color="purple" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Related Products</h3>
          <Table
            columns={relatedColumns}
            data={related}
            loading={false}
            currentPage={1}
            totalPages={1}
            onRowClick={(row) => navigate(`/products/${row._id}`)}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
