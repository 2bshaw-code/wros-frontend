import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.tsx'
import Sidebar from '../components/Sidebar.tsx'
import { useAuthStore } from '../state/authStore'

export default function MainLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />

  return (
    <div className="flex min-h-screen bg-[#F5F6F7] text-[#1C1E21] dark:bg-[#111B21] dark:text-white">
      <Sidebar />
      <div className="min-w-0 flex-1 md:ml-64">
        <Navbar />
        <main className="p-5 md:p-8"><Outlet /></main>
      </div>
    </div>
  )
}