import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/consoleApi'
import { AuthFrame } from './TypedLogin'
import type { ApiEnvelope, ConsoleUser } from '../types/console'
import { useConsoleStore } from '../store/consoleStore'

export default function TypedRegister() {
  const navigate = useNavigate(); const setSession = useConsoleStore((state) => state.setSession)
  const [form, setForm] = useState({ email: '', password: '', confirm: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    try { const response = await api.post<ApiEnvelope<{ token: string; user: ConsoleUser }>>('/auth/register', { email: form.email, password: form.password }); setSession(response.data.data.user, response.data.data.token); navigate('/dashboard') }
    catch (requestError: any) { setError(requestError.response?.data?.error?.message || 'Unable to register') }
    finally { setLoading(false) }
  }
  return <AuthFrame title="Create your console" subtitle="Start managing your WROS workspace."><form onSubmit={submit} className="space-y-4">{(['email', 'password', 'confirm'] as const).map((field) => <label key={field} className="block text-sm font-medium">{field === 'confirm' ? 'Confirm password' : field[0].toUpperCase() + field.slice(1)}<input className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 dark:border-gray-600 dark:bg-[#2A3942]" type={field === 'email' ? 'email' : 'password'} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} required /></label>)}{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button className="w-full rounded-lg bg-[#128C7E] py-3 font-semibold text-white" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button><p className="text-center text-sm text-gray-500">Already registered? <Link className="font-semibold text-[#128C7E]" to="/login">Sign in</Link></p></form></AuthFrame>
}