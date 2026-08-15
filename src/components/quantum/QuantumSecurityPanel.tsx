import { useEffect, useState } from 'react'
import { useQuantumSecurity } from '../../api/quantum.ts'
import { writeStabilityLog } from '../../stability/linkStability'
import { QuantumPanelFrame, QuantumResult } from './QuantumPanelFrame.tsx'

export default function QuantumSecurityPanel() { const [result, setResult] = useState<any>(null); useEffect(() => { useQuantumSecurity().then((response) => { setResult(response.data.data.output); writeStabilityLog('quantum-security', 'Quantum security simulation completed', '/founder/quantum/security') }) }, []); return <QuantumPanelFrame title="Quantum Security" description="Mock security risk simulation with no system access or configuration changes."><div className="grid gap-5 lg:grid-cols-3"><QuantumResult title="Risk level" value={result?.riskLevel || 'Running simulation'} /><QuantumResult title="Findings" value={result?.findings || 'Pending'} /><QuantumResult title="Status" value={result?.status || 'Pending'} /></div></QuantumPanelFrame> }