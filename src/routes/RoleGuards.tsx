import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../state/authStore'
import { isFounder, isMerchant, isOwner } from '../utils/roleRoutes.ts'

const AccessPage = ({ title, message }: { title: string; message: string }) => <main className="grid min-h-screen place-items-center bg-[#F4F7F5] p-6 dark:bg-[#111B21] dark:text-white"><div className="max-w-lg border-l-4 border-[#0FA958] bg-white p-7 shadow-lg dark:bg-[#202C33]"><h1 className="text-2xl font-bold">{title}</h1><p className="mt-3 text-gray-600 dark:text-gray-300">{message}</p><a href="/" className="mt-6 inline-block font-semibold text-[#0C8A48]">Return to Website</a></div></main>

export function MerchantRoute() {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  if (!isMerchant(user)) return <Navigate to={isFounder(user) ? '/founder' : '/console/owner'} replace />
  if (!user?.tenantId && !user?.businessId) return <AccessPage title="Merchant workspace not connected" message="Your account is valid, but no merchant tenant is associated with it. Ask an owner to complete merchant onboarding, then sign in again." />
  return <Outlet />
}

export function OwnerRoute() {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  if (!isOwner(user)) return <Navigate to={isFounder(user) ? '/founder' : '/console/merchant'} replace />
  return <Outlet />
}

export function RoleHome() {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  if (isFounder(user)) return <Navigate to="/founder" replace />
  if (isOwner(user)) return <Navigate to="/console/owner" replace />
  return <Navigate to="/console/merchant" replace />
}

export function ConsoleFallback({ label }: { label: string }) {
  return <AccessPage title={`${label} page unavailable`} message="This page is not available in the current WROS build. Use the console navigation or return to the public website." />
}
