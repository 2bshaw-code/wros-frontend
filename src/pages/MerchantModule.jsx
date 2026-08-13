import React from 'react'
import { useLocation } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useTenant } from '../context/TenantContext'

const moduleCopy = {
  '/billing': ['Billing', 'Review your merchant plan, invoices, and subscription entitlement.'],
  '/projects': ['Projects', 'Organize merchant workspaces and operational projects.'],
  '/api-keys': ['API Keys', 'Manage scoped API credentials for approved merchant integrations.'],
  '/docs': ['Documentation', 'Browse merchant API, webhook, CRM, billing, and delivery guidance.'],
  '/crm': ['CRM', 'View tenant-scoped customer profiles, conversations, orders, and insights.'],
  '/delivery': ['Delivery', 'Manage rider assignments, zones, timelines, and pickup fallback.'],
  '/invoices': ['Invoices', 'Generate, send, and review merchant customer invoices.'],
}

export default function MerchantModule() {
  const { pathname } = useLocation()
  const { tenantId } = useTenant()
  const [title, description] = moduleCopy[pathname] || ['Merchant Console', 'This merchant module is unavailable.']

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold text-whatsapp-green">Merchant workspace</p>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Tenant context</p>
          <p className="mt-1 font-mono text-sm text-gray-900">{tenantId || 'No merchant tenant is associated with this session.'}</p>
        </div>
      </div>
    </DashboardLayout>
  )
}