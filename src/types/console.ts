export type Role = 'admin' | 'tenant_admin' | 'operator' | 'analyst' | 'user'

export interface ConsoleUser {
  id?: string
  email: string
  role?: Role
  operatorRole?: Role
  tenantId?: string
  businessId?: string
  permissions?: string[]
  plan?: { id?: string; name?: string }
}

export interface ApiEnvelope<T> {
  success: boolean
  data: T
  error?: { message?: string }
}

export interface Customer {
  _id: string
  name: string
  email?: string
  phone?: string
  tags?: string[]
}