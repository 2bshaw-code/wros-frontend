import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../state/authStore'

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/console/login" replace />
}