import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useAuthStore } from './state/authStore'
import { useConsoleStore } from './store/consoleStore'

export default function App() {
  const loadUser = useAuthStore((state) => state.loadUser)
  const hydrate = useConsoleStore((state) => state.hydrate)
  useEffect(() => {
    hydrate()
    void loadUser()
  }, [hydrate, loadUser])
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  )
}