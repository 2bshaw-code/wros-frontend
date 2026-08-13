import React from 'react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { BobChat } from '../components/BobChat'

const quickActions = [
  { label: 'Generate product description', prompt: 'Generate product description for a reusable water bottle' },
  { label: 'Suggest reorder items', prompt: 'Suggest reorder items from the current product list' },
  { label: 'Summarise sales', prompt: 'Summarise sales trends and highlights' },
  { label: 'Create WhatsApp template', prompt: 'Create a WhatsApp promo message template' },
]

export default function BobAssistant() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="dashboard-header">
          <h1 className="text-4xl font-bold text-gray-900">BOB AI Assistant</h1>
          <p className="mt-2 text-gray-600">Retail guidance grounded in your products, inventory, and recent sales.</p>
        </div>
        <BobChat embedded quickActions={quickActions} />
      </div>
    </DashboardLayout>
  )
}