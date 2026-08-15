import { Bot, Send, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicPackages } from './packages.ts'

export const OPEN_BOB_LITE_EVENT = 'wros:open-bob-lite'
export const openBobLite = () => window.dispatchEvent(new Event(OPEN_BOB_LITE_EVENT))

const answerVisitor = (question: string) => {
  const text = question.trim().toLowerCase()
  if (!text) return 'Ask me about WROS, features, pricing, or how to apply.'
  if (/founder|full access|advanced tools/.test(text)) return 'The Founder Pack is reviewed manually. It includes Pro abilities, dedicated onboarding, advanced BOB tools, and eligibility for founder access after security approval.'
  if (/multi|analytics|priority|pro/.test(text)) return 'The Pro Pack fits teams that need multi-workspace support, advanced analytics, AI-assisted workflows, and priority support.'
  if (/automation|brand standards|growth|full crm/.test(text)) return 'The Growth Pack adds full CRM, catalog and messaging, advanced automation, and richer brand controls.'
  if (/starter|basic|small|begin|cheap|first/.test(text)) return 'The Starter Pack is the simplest entry: basic CRM, catalog, messaging, limited automation, and core branding.'
  if (/price|plan|pack|choose|recommend/.test(text)) return 'Start with Starter for one focused workspace, Growth for full daily operations, Pro for multi-workspace analytics, or Founder for a manually reviewed strategic setup.'
  if (/apply|application|onboard|signup/.test(text)) return 'Open the application page, choose a package, submit your verified business contact details, and WROS will review the request before collecting sensitive financial or brand files.'
  if (/crm|catalog|message|order|feature/.test(text)) return 'WROS connects CRM, catalog, messaging, orders, and automation so retail teams can work from one clear operating layer.'
  return 'WROS helps retail teams turn conversations into connected operations. I can explain features, compare packs, or guide you through the application.'
}

export default function BobLite({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([{ role: 'bob', text: 'Hi, I’m BOB Lite. Ask me which WROS pack fits your business.' }])
  if (!open) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = question.trim()
    if (!text) return
    setMessages((items) => [...items, { role: 'visitor', text }, { role: 'bob', text: answerVisitor(text) }])
    setQuestion('')
  }

  return <section className="fixed inset-x-4 bottom-4 z-50 ml-auto w-auto max-w-sm overflow-hidden rounded-xl border border-[#CFE0D5] bg-white shadow-2xl dark:border-[#34444A] dark:bg-[#202C33] sm:right-6"><header className="flex items-center justify-between bg-[#0FA958] px-4 py-3 text-white"><div className="flex items-center gap-2"><Bot size={20}/><strong>BOB AI Lite</strong></div><button type="button" onClick={onClose} aria-label="Close BOB Lite"><X size={19}/></button></header><div className="max-h-72 space-y-3 overflow-y-auto bg-[#F4F7F5] p-4 dark:bg-[#172126]">{messages.map((message,index)=><p key={`${message.role}-${index}`} className={`w-fit max-w-[88%] rounded-lg px-3 py-2 text-sm leading-6 ${message.role==='bob'?'bg-white text-[#17211B] dark:bg-[#2A3942] dark:text-white':'ml-auto bg-[#DCF8C6] text-[#17211B]'}`}>{message.text}</p>)}</div><div className="border-t border-[#DDE5E0] p-3 dark:border-[#34444A]"><form onSubmit={submit} className="flex gap-2"><input value={question} onChange={(event)=>setQuestion(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-[#B9C8BF] px-3 py-2 text-sm dark:border-[#3A4A50] dark:bg-[#172126]" placeholder="Ask about WROS or a pack" aria-label="Ask BOB Lite"/><button type="submit" className="grid h-10 w-10 place-items-center rounded-lg bg-[#0FA958] text-white" aria-label="Send question"><Send size={17}/></button></form><div className="mt-3 flex items-center justify-between text-xs"><span className="text-gray-500">Visitor guidance only</span><Link to="/apply" className="font-bold text-[#0C8A48]">Apply now</Link></div></div></section>
}

export function BobPlanPrompts({ onAsk }: { onAsk: (prompt: string) => void }) {
  return <div className="flex flex-wrap gap-2">{publicPackages.map((plan)=><button key={plan.id} type="button" onClick={()=>onAsk(`Tell me about the ${plan.name}`)} className="rounded-full border border-[#B9C8BF] px-3 py-1.5 text-xs font-semibold dark:border-[#3A4A50]">{plan.name}</button>)}</div>
}
