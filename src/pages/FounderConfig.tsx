import { useEffect, useState } from 'react'
import { founderApi } from '../api/founder'
import { Panel } from './FounderSystem'
export default function FounderConfig() { const [data, setData] = useState<any>(null); useEffect(() => { founderApi.config().then((response) => setData(response.data.data)) }, []); return <Panel title="Configuration" description="Read-only environment and integration summary. Secrets are never exposed."><pre className="overflow-auto rounded-lg bg-[#202C33] p-5 text-sm text-[#6EE7A0]">{JSON.stringify(data || { loading: true }, null, 2)}</pre></Panel> }