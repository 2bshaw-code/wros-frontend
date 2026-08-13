import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

export default function GuestRoute() {
  const token = useAppStore((state) => state.token)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
