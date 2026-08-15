import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosClient from '../api/axiosClient.ts'

const copy: Record<string, [string, string]> = {
  '/console/owner': ['Merchant list', 'Review merchants across the WROS platform without adopting a tenant context.'],
  '/console/owner/onboarding': ['Merchant onboarding', 'Track account setup and help merchants establish their first workspace.'],
  '/console/owner/analytics': ['Merchant analytics', 'Review aggregate platform indicators without exposing tenant-private records.'],
  '/console/owner/settings': ['Owner settings', 'Manage owner-level platform preferences and access expectations.'],
  '/console/owner/automation': ['Owner automation', 'Coordinate platform-level onboarding and operational follow-up.'],
}

export default function OwnerConsole() {
  const { pathname } = useLocation()
  const [overview, setOverview] = useState<any>(null)
  const [error, setError] = useState('')
  useEffect(() => { axiosClient.get('/owner/overview').then((response) => setOverview(response.data.data)).catch((requestError) => setError(requestError.response?.data?.error?.message || 'Owner data is unavailable')) }, [])
  const [title, description] = copy[pathname] || ['Owner console', 'Owner-level WROS operations.']
  return <section className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-widest text-[#0C8A48]">Owner workspace</p><h1 className="mt-2 text-3xl font-bold">{title}</h1><p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p></div>{error && <p className="border-l-4 border-red-500 bg-white p-4 text-sm text-red-700 dark:bg-[#202C33]">{error}</p>}<div className="grid gap-4 md:grid-cols-3">{[['Merchants',overview?.merchantCount ?? '—'],['Active workspaces',overview?.activeMerchantCount ?? '—'],['Role','Owner']].map(([label,value])=><article key={label} className="border border-[#DDE5E0] bg-white p-5 shadow-sm dark:border-[#34444A] dark:bg-[#202C33]"><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></article>)}</div></section>
}
