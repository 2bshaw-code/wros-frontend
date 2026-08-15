import { Cloud, GitBranch, Server } from 'lucide-react'
import { Panel } from './FounderSystem.tsx'

export default function FounderDeployments() {
  return <Panel title="Deployments" description="Read-only deployment readiness and release checkpoints."><div className="grid gap-4 md:grid-cols-3">{[['Backend service','Render-ready',Server],['Frontend static site','Build-ready',Cloud],['Release branch','main',GitBranch]].map(([label,value,Icon]) => { const Component = Icon as typeof Server; return <article key={label as string} className="rounded-xl border border-[#263238] bg-[#202C33] p-5"><Component className="text-[#6EE7A0]" size={20}/><p className="mt-4 text-sm text-gray-400">{label as string}</p><p className="mt-1 font-semibold">{value as string}</p></article> })}</div></Panel>
}
