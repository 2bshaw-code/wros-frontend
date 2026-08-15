import { useEffect } from 'react'
import { Activity, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react'
import StableLink from '../../stability/StableLink.tsx'
import { writeStabilityLog } from '../../stability/linkStability'
import { QuantumPanelFrame } from './QuantumPanelFrame.tsx'

const destinations = [
  ['Forecasting', 'Simulate demand and revenue outlooks.', '/founder/quantum/forecasting', BrainCircuit],
  ['Optimisation', 'Explore isolated margin and bundle recommendations.', '/founder/quantum/optimisation', Sparkles],
  ['Anomalies', 'Review mock risk signals without data mutation.', '/founder/quantum/anomalies', Activity],
  ['Security', 'Run a contained quantum security assessment.', '/founder/quantum/security', ShieldCheck],
] as const

export default function QuantumHomePanel() {
  useEffect(() => { writeStabilityLog('quantum-view', 'Founder quantum home opened', '/founder/quantum') }, [])
  return <QuantumPanelFrame title="Quantum Intelligence" description="A contained founder workspace for mock forecasting, optimisation, anomaly, and security analysis."><section aria-label="Quantum" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{destinations.map(([name, description, path, Icon]) => <StableLink key={path} to={path} className="rounded-xl border border-[#263238] bg-[#202C33] p-5 hover:bg-[#2A3942]"><Icon className="text-[#6EE7A0]" size={21} /><h2 className="mt-4 font-semibold">{name}</h2><p className="mt-2 text-sm text-gray-300">{description}</p></StableLink>)}</section><StableLink to="/founder/bob/quantum" className="inline-flex items-center gap-2 rounded-lg bg-[#0FA958] px-5 py-3 font-semibold text-white hover:bg-[#0C8A48]"><BrainCircuit size={18} />Open Bob Quantum Intelligence</StableLink></QuantumPanelFrame>
}