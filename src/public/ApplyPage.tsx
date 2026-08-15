import { FormEvent, useState } from 'react'
import { CheckCircle2, Lock, Upload } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { getPublicPackage, publicPackages } from './packages.ts'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://wros-backend.onrender.com/api'

export default function ApplyPage() {
  const [searchParams] = useSearchParams()
  const [packageId, setPackageId] = useState(getPublicPackage(searchParams.get('package') || '').id)
  const [logoName, setLogoName] = useState('')
  const [standardsName, setStandardsName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const selectedPackage = getPublicPackage(packageId)
  const supportsAdvancedBranding = packageId !== 'starter'

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/business/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerName: String(form.get('ownerName') || '').trim(),
          businessName: String(form.get('businessName') || '').trim(),
          email: String(form.get('email') || '').trim(),
          phone: String(form.get('phone') || '').trim(),
          whatsappNumber: String(form.get('phone') || '').trim(),
        }),
      })
      if (!response.ok) throw new Error('We could not submit the application. Please review your details and try again.')
      setStatus('success')
      setMessage(`Application received for the ${selectedPackage.name}. Our team will review your details and confirm the next secure onboarding step.`)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Application submission failed. Please try again.')
    }
  }

  if (status === 'success') return <section className="mx-auto min-h-[68vh] max-w-3xl px-5 py-24"><CheckCircle2 className="text-[#0FA958]" size={48}/><p className="mt-6 text-sm font-bold uppercase tracking-widest text-[#0C8A48]">Application received</p><h1 className="mt-3 text-4xl font-bold">Thank you for applying.</h1><p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">{message}</p><p className="mt-5 border-l-2 border-[#0FA958] pl-4 text-sm">No package abilities or privileged roles are enabled until the application and security review are complete.</p></section>

  return <section className="mx-auto max-w-6xl px-5 py-16"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#0C8A48]">Apply to WROS</p><h1 className="mt-4 text-4xl font-bold md:text-5xl">Tell us about your retail operation.</h1><p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">Submit the essentials now. Your selected pack and brand materials will be confirmed during a secure onboarding review.</p></div><form onSubmit={submitApplication} className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]"><div className="grid gap-5 border border-[#DDE5E0] bg-white p-6 dark:border-[#34444A] dark:bg-[#202C33] sm:grid-cols-2"><Field label="Business name" name="businessName" required/><Field label="Business type" name="businessType" required/><Field label="Owner name" name="ownerName" required/><Field label="Email" name="email" type="email" required/><Field label="Phone / WhatsApp" name="phone" type="tel" required/><Field label="VAT number" name="vatNumber"/><Field label="Business address" name="address" className="sm:col-span-2"/>{supportsAdvancedBranding&&<><Field label="Website" name="website" type="url"/><Field label="Social profile" name="social" type="url"/></>}<Field label="Primary brand colour" name="brandColour" type="color"/><label className="grid gap-2 text-sm font-semibold">Requested package<select value={packageId} onChange={(event)=>setPackageId(event.target.value as typeof packageId)} className="h-11 border border-[#B9C8BF] bg-white px-3 dark:border-[#506067] dark:bg-[#172126]">{publicPackages.map((plan)=><option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label><FileField label="Logo" fileName={logoName} onChange={setLogoName}/>{supportsAdvancedBranding&&<FileField label="Brand standards" fileName={standardsName} onChange={setStandardsName}/>}<div className="sm:col-span-2"><label className="flex items-start gap-3 text-sm"><input required type="checkbox" name="terms" className="mt-1"/><span>I confirm these details are accurate and agree to be contacted about onboarding and applicable terms.</span></label>{status==='error'&&<p role="alert" className="mt-4 text-sm font-semibold text-red-700 dark:text-red-300">{message}</p>}<button disabled={status==='submitting'} className="mt-6 rounded-lg bg-[#0FA958] px-5 py-3 font-bold text-white disabled:opacity-60">{status==='submitting'?'Submitting...':'Submit application'}</button></div></div><aside className="space-y-5"><div className="border border-[#0FA958] bg-[#EAF8EF] p-5 dark:bg-[#183328]"><p className="text-xs font-bold uppercase tracking-widest text-[#0C8A48]">Selected pack</p><h2 className="mt-2 text-2xl font-bold">{selectedPackage.name}</h2><p className="mt-2 text-sm leading-6">{selectedPackage.positioning}</p><p className="mt-4 text-xs font-semibold">{selectedPackage.roleOutcome}</p></div><div className="border border-[#DDE5E0] p-5 dark:border-[#34444A]"><Lock className="text-[#0FA958]"/><h2 className="mt-3 font-bold">Secure onboarding</h2><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">Bank details are never collected on this public form. Billing information is requested only after approval through a secure payment flow.</p><p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">Selected files stay on your device for now and are not uploaded. We will request them through the secure onboarding channel.</p></div></aside></form></section>
}

function Field({ label, name, type = 'text', required = false, className = '' }: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return <label className={`grid gap-2 text-sm font-semibold ${className}`}>{label}<input name={name} type={type} required={required} className="h-11 min-w-0 border border-[#B9C8BF] bg-white px-3 dark:border-[#506067] dark:bg-[#172126]"/></label>
}

function FileField({ label, fileName, onChange }: { label: string; fileName: string; onChange: (name: string) => void }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<span className="flex h-11 items-center gap-2 border border-[#B9C8BF] px-3 dark:border-[#506067]"><Upload size={17}/><span className="truncate font-normal">{fileName || 'Choose file for onboarding review'}</span></span><input type="file" accept="image/*,.pdf" className="sr-only" onChange={(event)=>onChange(event.target.files?.[0]?.name || '')}/></label>
}