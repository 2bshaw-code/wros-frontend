import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  ['Starter', 'Core merchant operations', ['Catalog and inventory', 'Orders and CRM', 'Messaging workspace']],
  ['Growth', 'Automation for active teams', ['Merchant automation', 'BOB guidance', 'Operational reporting']],
  ['Enterprise', 'Cross-merchant oversight', ['Owner console', 'Advanced onboarding', 'Deployment support']],
] as const

export default function PricingPage() {
  return <section className="mx-auto min-h-[68vh] max-w-6xl px-5 py-20"><p className="text-sm font-bold uppercase tracking-widest text-[#0C8A48]">Pricing</p><h1 className="mt-4 text-4xl font-bold md:text-5xl">Choose the operating layer your team needs.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">Start with merchant essentials, then add automation and cross-merchant oversight as operations grow.</p><div className="mt-10 grid gap-5 md:grid-cols-3">{plans.map(([name, description, features], index)=><article key={name} className={`border p-6 ${index===1?'border-[#0FA958] bg-[#EAF8EF] dark:bg-[#183328]':'border-[#DDE5E0] bg-white dark:border-[#34444A] dark:bg-[#202C33]'}`}><h2 className="text-2xl font-bold">{name}</h2><p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p><div className="mt-6 space-y-3">{features.map((feature)=><p key={feature} className="flex items-center gap-2 text-sm"><CheckCircle2 className="text-[#0FA958]" size={18}/>{feature}</p>)}</div><Link to="/contact" className="mt-8 inline-block rounded-lg bg-[#0FA958] px-4 py-2.5 font-semibold text-white">Talk to WROS</Link></article>)}</div></section>
}
