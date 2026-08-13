import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useConsoleStore } from './store/consoleStore'
import TypedLogin from './pages/TypedLogin'
import TypedRegister from './pages/TypedRegister'
import TypedDashboard from './pages/TypedDashboard'
import TypedCRM from './pages/TypedCRM'
import TypedDocs from './pages/TypedDocs'
import TypedLegal from './pages/TypedLegal'
import TypedSettings from './pages/TypedSettings'

function Protected() { const token = useConsoleStore((state) => state.token); return token ? <Outlet /> : <Navigate to="/login" replace /> }

export default function TypedApp() { const hydrate = useConsoleStore((state) => state.hydrate); const token = useConsoleStore((state) => state.token); useEffect(() => hydrate(), [hydrate]); return <BrowserRouter basename="/console"><ErrorBoundary><Routes><Route path="/login" element={<TypedLogin />} /><Route path="/register" element={<TypedRegister />} /><Route element={<Protected />}><Route path="/dashboard" element={<TypedDashboard />} /><Route path="/crm" element={<TypedCRM />} /><Route path="/docs" element={<TypedDocs />} /><Route path="/legal" element={<TypedLegal />} /><Route path="/settings" element={<TypedSettings />} /></Route><Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} /><Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} /></Routes></ErrorBoundary></BrowserRouter> }