import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, FileText, ShieldCheck } from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'

const resources = {
  '/docs': {
    title: 'Documentation',
    description: 'Operational and API documentation for the WROS console.',
    icon: BookOpen,
    links: [
      ['API documentation', '/api/docs'],
      ['Pre-testing readiness PDF', '/api/docs/pre-testing-readiness/pdf'],
      ['Partner programme PDF', '/api/docs/partner-program/pdf'],
    ],
  },
  '/legal': {
    title: 'Legal and privacy',
    description: 'WROS privacy, cookie, terms, and support references.',
    icon: ShieldCheck,
    links: [
      ['Privacy notice', '#privacy'],
      ['Cookie notice', '#cookies'],
      ['Terms of service', '#terms'],
      ['Contact support', 'mailto:info@wros.co.uk'],
    ],
  },
}

export default function ConsoleResource() {
  const { pathname } = useLocation()
  const resource = resources[pathname] || resources['/docs']
  const Icon = resource.icon || FileText

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-[#E7F5F3] p-3 text-[#0C6A60]"><Icon size={24} /></div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{resource.title}</h1>
            <p className="mt-2 text-gray-600">{resource.description}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {resource.links.map(([label, href]) => href.startsWith('#') ? (
            <a key={label} href={href} className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-gray-800 shadow-sm hover:border-[#0FA958]">{label}</a>
          ) : (
            <a key={label} href={href} target={href.startsWith('/api/') ? '_blank' : undefined} rel={href.startsWith('/api/') ? 'noreferrer' : undefined} className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-gray-800 shadow-sm hover:border-[#0FA958]">{label}</a>
          ))}
        </div>
        <Link to="/dashboard" className="inline-flex text-sm font-medium text-[#0C6A60]">Return to dashboard</Link>
      </div>
    </DashboardLayout>
  )
}