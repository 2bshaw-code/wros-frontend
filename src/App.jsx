import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TenantProvider } from './context/TenantContext'
import { router } from './router'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </TenantProvider>
    </AuthProvider>
  )
}

export default App
