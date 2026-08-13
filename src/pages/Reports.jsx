import React, { useEffect, useMemo, useState } from 'react'
import {
  TrendingUp,
  Package,
  Users,
  Warehouse,
  DollarSign,
  Filter
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/Card'
import { reportService } from '../services/reports'
import { handleError } from '../utils/handleError'
import { calculateRegionalEstimate, formatAnalyticsPrice } from '../utils/formatResponse'

const SEGMENT_COLORS = ['#128C7E', '#1877F2', '#a855f7', '#f59e0b', '#ef4444']

export default function Reports() {
  const [salesTrend, setSalesTrend] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [customerSegments, setCustomerSegments] = useState([])
  const [inventoryMovement, setInventoryMovement] = useState([])
  const [summary, setSummary] = useState({ totalSales: 0, totalOrders: 0, totalCustomers: 0, avgOrderValue: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [category, setCategory] = useState('')

  const fetchReports = async () => {
    setLoading(true)
    setError('')
    try {
      const [salesRes, topRes, segmentsRes, inventoryRes, summaryRes] = await Promise.all([
        reportService.getSalesTrend(startDate, endDate),
        reportService.getTopProducts(startDate, endDate),
        reportService.getCustomerSegments(),
        reportService.getInventoryMovement(startDate, endDate),
        reportService.getSummary(startDate, endDate)
      ])

      setSalesTrend(salesRes.data.data || [])
      setTopProducts(topRes.data.data || [])
      setCustomerSegments(segmentsRes.data.data || [])
      setInventoryMovement(inventoryRes.data.data || [])
      setSummary(summaryRes.data.data || summary)
    } catch (err) {
      setError(handleError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyFilters = () => {
    fetchReports()
  }

  const filteredTopProducts = useMemo(
    () => (category ? topProducts.filter((p) => p.category === category) : topProducts),
    [category, topProducts]
  )
  const regionalEstimate = calculateRegionalEstimate(summary.totalSales, summary.totalOrders)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600">Insights into sales, products, customers, and inventory</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-7">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
            <div className="flex items-end">
              <button
                onClick={handleApplyFilters}
                className="w-full bg-whatsapp-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Regional Sales Estimate" value={formatAnalyticsPrice(regionalEstimate.total)} icon={DollarSign} color="green" description={`Includes ${Math.round(regionalEstimate.taxRate * 100)}% tax and local shipping`} />
          <Card title="Total Orders" value={summary.totalOrders || 0} icon={Package} color="blue" />
          <Card title="Total Customers" value={summary.totalCustomers || 0} icon={Users} color="purple" />
          <Card title="Avg Order Value" value={formatAnalyticsPrice(regionalEstimate.total / Math.max(summary.totalOrders || 1, 1))} icon={TrendingUp} color="yellow" description="Regional estimate" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-7">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
              <TrendingUp size={16} />
              Sales Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={formatAnalyticsPrice} />
                <Tooltip formatter={formatAnalyticsPrice} />
                <Line type="monotone" dataKey="sales" stroke="#128C7E" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-7">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
              <Package size={16} />
              Top Products
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={filteredTopProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="unitsSold" fill="#1877F2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-7">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
              <Users size={16} />
              Customer Segments
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  dataKey="count"
                  nameKey="segment"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-7">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
              <Warehouse size={16} />
              Inventory Movement
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={inventoryMovement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="stockIn" stackId="1" stroke="#128C7E" fill="#128C7E" fillOpacity={0.3} />
                <Area type="monotone" dataKey="stockOut" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-6">
            <div className="w-8 h-8 border-4 border-whatsapp-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
