import { useEffect, useState } from 'react'
import { founderApi } from '../api/founder'
import { Panel } from './FounderSystem'
import { getStabilityLogs } from '../stability/linkStability'
export default function FounderLogs() { const [data, setData] = useState<any>(null); useEffect(() => { founderApi.logs().then((response) => setData({ ...response.data.data, lsl: getStabilityLogs() })) }, []); return <Panel title="Founder logs" description="Backend actions, errors, slow routes, and system summaries."><pre className="overflow-auto rounded-lg bg-[#202C33] p-5 text-sm text-[#6EE7A0]">{JSON.stringify(data || { loading: true }, null, 2)}</pre></Panel> }