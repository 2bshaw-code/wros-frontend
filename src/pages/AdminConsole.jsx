import React, { useEffect, useState } from 'react'
import {
  Users,
  Building2,
  Receipt,
  MessageSquare,
  Brain,
  Send,
  Plus
} from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { adminService } from '../services/admin'
import { billingService } from '../services/billing'
import { whatsappService } from '../services/whatsapp'
import api from '../services/api'
import { handleError } from '../utils/handleError'
import { formatPrice } from '../utils/formatResponse'

const TABS = ['overview', 'billing', 'whatsapp', 'ai']

export default function AdminConsole() {
  const [activeTab, setActiveTab] = useState('overview')
  const [overview, setOverview] = useState({ counts: { products: 0, orders: 0, customers: 0 } })
  const [invoices, setInvoices] = useState([])
  const [templates, setTemplates] = useState([])
  const [aiInsights, setAiInsights] = useState(null)
  const [newTemplate, setNewTemplate] = useState({ name: '', body: '', category: 'general' })
  const [broadcastForm, setBroadcastForm] = useState({ templateId: '', segment: 'vip' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAll = async () => {
    setLoading(true)
    setError('')
    try {
      const [overviewRes, invoicesRes, templatesRes] = await Promise.all([
        adminService.getOverview(),
        billingService.listInvoices().catch(() => ({ data: { data: [] } })),
        whatsappService.listTemplates().catch(() => ({ data: { data: [] } }))
      ])
      setOverview(overviewRes.data.data || overview)
      setInvoices(invoicesRes.data.data || [])
      setTemplates(templatesRes.data.data || [])
    } catch (err) {
      setError(handleError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateTemplate = async () => {
    if (!newTemplate.name || !newTemplate.body) return
    try {
      await whatsappService.createTemplate(newTemplate)
      setNewTemplate({ name: '', body: '', category: 'general' })
      fetchAll()
    } catch (err) {
      setError(handleError(err))
    }
  }

  const handleScheduleBroadcast = async () => {
    if (!broadcastForm.templateId) return
    try {
      await whatsappService.scheduleBroadcast(broadcastForm.templateId, broadcastForm.segment)
      fetchAll()
    } catch (err) {
      setError(handleError(err))
    }
  }

  const fetchAiInsights = async () => {
    try {
      const response = await api.get('/ai/analytics/overview')
      setAiInsights(response.data.data)
    } catch (err) {
      setError(handleError(err))
    }
  }

  useEffect(() => {
    if (activeTab === 'ai' && !aiInsights) {
      fetchAiInsights()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const invoiceColumns = [
    { key: 'period', label: 'Period' },
    { key: 'subscriptionAmountCents', label: 'Subscription', render: (val) => formatPrice((val || 0) / 100) },
    { key: 'messageCount', label: 'Messages' },
    { key: 'messageAmountCents', label: 'Message Cost', render: (val) => formatPrice((val || 0) / 100) },
    { key: 'totalCents', label: 'Total', render: (val) => formatPrice((val || 0) / 100) },
    { key: 'status', label: 'Status' }
  ]

  const templateColumns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'body', label: 'Body' }
  ]

  const docLinks = [
    { label: 'Press Release', href: '/api/docs/press-release/pdf' },
    { label: 'Partner Program', href: '/api/docs/partner-program/pdf' },
    { label: 'Reseller Kit', href: '/api/docs/reseller-kit/pdf' },
    { label: 'Investor FAQ', href: '/api/docs/investor-faq/pdf' },
    { label: 'Brand Book', href: '/api/docs/brand-book/pdf' },
    { label: 'Support Pack', href: '/api/docs/support-customer-success/pdf' },
    { label: 'Sales Pack', href: '/api/docs/sales-messaging-pack/pdf' },
    { label: 'Pre-Testing Readiness', href: '/api/docs/pre-testing-readiness/pdf' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Console</h1>
          <p className="text-gray-600">Tenant, billing, WhatsApp automation, and AI usage</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

        <div className="flex gap-2 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize border-b-2 ${
                activeTab === tab ? 'border-whatsapp-green text-whatsapp-green' : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Products" value={overview.counts?.products || 0} icon={Building2} color="blue" />
              <Card title="Orders" value={overview.counts?.orders || 0} icon={Receipt} color="green" />
              <Card title="Customers" value={overview.counts?.customers || 0} icon={Users} color="purple" />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Generated WROS PDFs</h3>
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
          </div>
        )}

        {activeTab === 'billing' && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Invoices</h3>
            <Table columns={invoiceColumns} data={invoices} loading={loading} currentPage={1} totalPages={1} />
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
                <MessageSquare size={16} /> Create Template
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  className="border rounded-lg px-3 py-2"
                  placeholder="Name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                />
                <input
                  className="border rounded-lg px-3 py-2 md:col-span-2"
                  placeholder="Message body"
                  value={newTemplate.body}
                  onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
                />
              </div>
              <button onClick={handleCreateTemplate} className="mt-3 flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-lg">
                <Plus size={16} /> Add Template
              </button>
            </div>

            <Table columns={templateColumns} data={templates} loading={loading} currentPage={1} totalPages={1} />

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
                <Send size={16} /> Schedule Broadcast
              </h3>
              <div className="flex gap-3">
                <select
                  className="border rounded-lg px-3 py-2"
                  value={broadcastForm.templateId}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, templateId: e.target.value })}
                >
                  <option value="">Select template</option>
                  {templates.map((t) => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
                <select
                  className="border rounded-lg px-3 py-2"
                  value={broadcastForm.segment}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, segment: e.target.value })}
                >
                  <option value="vip">VIP</option>
                  <option value="loyal">Loyal</option>
                  <option value="regular">Regular</option>
                  <option value="new">New</option>
                </select>
                <button onClick={handleScheduleBroadcast} className="bg-whatsapp-green text-white px-4 py-2 rounded-lg">
                  Send Broadcast
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
              <Brain size={16} /> AI + WhatsApp Usage Metrics
            </h3>
            {!aiInsights ? (
              <p className="text-gray-500 text-sm">Loading insights...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><p className="text-xs text-gray-500">Low Stock Predictions</p><p className="text-xl font-bold">{aiInsights.inventoryInsights?.lowStockPredictions?.length || 0}</p></div>
                <div><p className="text-xs text-gray-500">Overstock Alerts</p><p className="text-xl font-bold">{aiInsights.inventoryInsights?.overstockAlerts?.length || 0}</p></div>
                <div><p className="text-xs text-gray-500">Slow Moving Products</p><p className="text-xl font-bold">{aiInsights.inventoryInsights?.slowMovingProducts?.length || 0}</p></div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
