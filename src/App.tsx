import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useAuthStore } from './state/authStore'

export default function App() { const loadUser = useAuthStore((state) => state.loadUser); useEffect(() => { void loadUser() }, [loadUser]); return <BrowserRouter basename="/console"><ErrorBoundary><AppRoutes /></ErrorBoundary></BrowserRouter> }