import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../state/authStore'

export default function FounderRoute() {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  if (!user?.founder && user?.role !== 'founder_admin' && user?.operatorRole !== 'founder_admin') return <Navigate to="/console" replace />
  return <Outlet />
}