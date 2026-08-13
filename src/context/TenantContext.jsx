import React, { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'

const TenantContext = createContext(null)

export const TenantProvider = ({ children }) => {
  const { user } = useAuth()
  const tenantId = user?.tenantId || user?.businessId || null

  return (
    <TenantContext.Provider value={{ tenantId, hasTenant: Boolean(tenantId) }}>
      {children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => {
  const context = useContext(TenantContext)
  if (!context) throw new Error('useTenant must be used within TenantProvider')
  return context
}