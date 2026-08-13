import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { api } from '../services/consoleApi'
import { useConsoleStore } from '../store/consoleStore'
import type { ApiEnvelope, ConsoleUser } from '../types/console'

export default function TypedLogin() {
  const navigate = useNavigate()
  const setSession = useConsoleStore((state) => state.setSession)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError('')
    try {
      const response = await api.post<ApiEnvelope<{ token: string; user: ConsoleUser }>>('/auth/login', { email, password })
      setSession(response.data.data.user, response.data.data.token)
      navigate('/dashboard')
    } catch (requestError: any) { setError(requestError.response?.data?.error?.message || 'Unable to sign in') }
    finally { setLoading(false) }
  }

  return <AuthFrame title="Welcome back" subtitle="Sign in to your WROS console."><form onSubmit={submit} className="space-y-4"><label className="block text-sm font-medium">Email<div className="relative mt-2"><Mail className="absolute left-3 top-3 text-gray-400" size={18} /><input className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 dark:border-gray-600 dark:bg-[#2A3942]" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div></label><label className="block text-sm font-medium">Password<div className="relative mt-2"><Lock className="absolute left-3 top-3 text-gray-400" size={18} /><input className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 dark:border-gray-600 dark:bg-[#2A3942]" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div></label>{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button className="w-full rounded-lg bg-[#128C7E] py-3 font-semibold text-white" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button><p className="text-center text-sm text-gray-500">New to WROS? <Link className="font-semibold text-[#128C7E]" to="/register">Create an account</Link></p></form></AuthFrame>
}

export function AuthFrame({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) { return <div className="grid min-h-screen place-items-center bg-gradient-to-br from-[#E7F5F3] via-white to-[#F0F2F5] p-5 dark:from-[#111B21] dark:via-[#202C33] dark:to-[#111B21]"><div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-[#263238] dark:bg-[#202C33]"><div className="mb-7 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#128C7E] text-xl font-bold text-white">W</div><h1 className="text-2xl font-bold">{title}</h1><p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{subtitle}</p></div>{children}</div></div> }