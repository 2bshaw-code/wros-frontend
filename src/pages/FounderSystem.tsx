import { useEffect, useState } from 'react'
import { founderApi } from '../api/founder'
import { getStabilityLogs } from '../stability/linkStability'

export default function FounderSystem() { const [data, setData] = useState<any>(null); useEffect(() => { founderApi.system().then((response) => setData({ ...response.data.data, linkStability: getStabilityLogs() })) }, []); return <Panel title="System detail" description="Routes, bundles, collections, integrations, and automation history."><pre className="overflow-auto rounded-lg bg-[#111B21] p-4 text-xs text-[#6EE7A0]">{JSON.stringify(data || { loading: true }, null, 2)}</pre></Panel> }
export function Panel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <div className="space-y-5"><div><h1 className="text-3xl font-bold">{title}</h1><p className="mt-2 text-gray-300">{description}</p></div>{children}</div> }