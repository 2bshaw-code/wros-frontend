import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import Loading from '../components/Loading.tsx'
import { getErrorMessage } from '../utils/helpers'
import FilterBar from '../components/FilterBar.tsx'
import CreateOrderModal from '../components/CreateOrderModal.tsx'

type Order = { id: string; orderNumber: string; customerId: string; total: number; currency: string; status: string; createdAt: string }

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [params, setParams] = useSearchParams(); const [filters, setFilters] = useState({ search: params.get('search') || '', status: params.get('status') || '' }); const [createOpen, setCreateOpen] = useState(false)
  useEffect(() => { axiosClient.get<{ data: Order[] }>('/mock/orders').then((response) => setOrders(response.data.data)).catch((requestError) => setError(getErrorMessage(requestError, 'Unable to load orders'))).finally(() => setLoading(false)) }, [])
  useEffect(() => { const next = Object.fromEntries(Object.entries(filters).filter(([, value]) => value)); setParams(next, { replace: true }) }, [filters, setParams])
  const visible = orders.filter((order) => (!filters.status || order.status === filters.status) && (!filters.search || `${order.orderNumber} ${order.customerId}`.toLowerCase().includes(filters.search.toLowerCase())))
  return <section className="space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><Header eyebrow="Operations" title="Orders" description="Review and filter the latest mock order activity." /><button type="button" onClick={() => setCreateOpen(true)} className="rounded-lg bg-[#0FA958] px-4 py-2.5 font-semibold text-white">Create Order</button></div><FilterBar fields={[{ key: 'search', label: 'Search order or customer' }, { key: 'status', label: 'Status', type: 'select', options: ['pending', 'processing', 'completed', 'cancelled'] }]} value={filters} onChange={(next) => setFilters(next as typeof filters)} /><DataPanel loading={loading} error={error}>{visible.map((order) => <div key={order.id} className="grid gap-2 border-b border-[#EDEDED] p-4 text-sm last:border-0 sm:grid-cols-5 dark:border-[#263238]"><strong>{order.orderNumber}</strong><span>{order.customerId}</span><span>{order.currency.toUpperCase()} {order.total.toFixed(2)}</span><span className="capitalize">{order.status}</span><span>{new Date(order.createdAt).toLocaleDateString()}</span></div>)}</DataPanel>{createOpen && <CreateOrderModal onClose={() => setCreateOpen(false)} onCreated={() => window.location.reload()} />}</section>
}

export function Header({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <header><p className="text-sm font-semibold text-[#0FA958]">{eyebrow}</p><h1 className="mt-1 text-3xl font-bold">{title}</h1><p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p></header> }
export function DataPanel({ loading, error, children }: { loading: boolean; error: string; children: React.ReactNode }) { return <div className="overflow-hidden rounded-xl border border-[#EDEDED] bg-white shadow-sm dark:border-[#263238] dark:bg-[#202C33]">{loading ? <Loading /> : error ? <p className="p-5 text-sm text-red-600">{error}</p> : children}</div> }