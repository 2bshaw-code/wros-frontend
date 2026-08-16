import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../state/authStore'

export default function FounderRoute() {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  if (!user?.founder && user?.role !== 'founder' && user?.role !== 'founder_admin' && user?.role !== 'founder_master' && user?.operatorRole !== 'founder' && user?.operatorRole !== 'founder_admin' && user?.operatorRole !== 'founder_master') return <Navigate to="/console" replace />
  return <Outlet />
}