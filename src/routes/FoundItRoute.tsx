import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../state/authStore'

const allowedRoles = new Set(['founder', 'founder_admin', 'founder_master', 'admin', 'owner'])

export default function FoundItRoute() {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  const role = user?.operatorRole || user?.role
  if (!role || (!allowedRoles.has(role) && !user?.founder)) return <Navigate to="/console" replace />
  return <Outlet />
}