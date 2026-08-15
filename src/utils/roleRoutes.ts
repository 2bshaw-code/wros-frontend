import type { ConsoleUser } from '../types/console'

export const isFounder = (user: ConsoleUser | null) => Boolean(
  user?.founder || user?.role === 'founder' || user?.role === 'founder_admin' || user?.operatorRole === 'founder' || user?.operatorRole === 'founder_admin'
)

export const isOwner = (user: ConsoleUser | null) => Boolean(
  !isFounder(user) && (user?.role === 'owner' || user?.role === 'admin' || user?.operatorRole === 'owner')
)

export const isMerchant = (user: ConsoleUser | null) => Boolean(user && !isFounder(user) && !isOwner(user))

export const getRoleHome = (user: ConsoleUser | null) => {
  if (isFounder(user)) return '/founder'
  if (isOwner(user)) return '/console/owner'
  return '/console/merchant'
}
