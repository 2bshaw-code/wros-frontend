import type { ReactNode } from 'react'
import { Atom } from 'lucide-react'
import { Header, Insight } from '../../pages/FounderSales.tsx'

export function QuantumPanelFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div className="space-y-8"><Header title={title} description={description} /><section className="rounded-xl border border-[#263238] bg-[#202C33] p-5"><div className="flex items-center gap-2"><Atom className="text-[#6EE7A0]" size={20} /><p className="font-semibold">Mock quantum service layer</p></div><p className="mt-2 text-sm text-gray-300">Founder-only simulated analysis. No external provider, tenant data, or operational workflow is changed.</p></section>{children}</div>
}

export function QuantumResult({ title, value }: { title: string; value: unknown }) {
  return <Insight title={title} value={typeof value === 'string' ? value : JSON.stringify(value)} />
}