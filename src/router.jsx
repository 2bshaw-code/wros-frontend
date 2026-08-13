import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetail = lazy(() => import('./pages/OrderDetail'))
const Customers = lazy(() => import('./pages/Customers'))
const CustomerDetail = lazy(() => import('./pages/CustomerDetail'))
const Inventory = lazy(() => import('./pages/Inventory'))
const Reports = lazy(() => import('./pages/Reports'))
const Settings = lazy(() => import('./pages/Settings'))
const AdminConsole = lazy(() => import('./pages/AdminConsole'))
const BobAssistant = lazy(() => import('./pages/BobAssistant'))
const NotFound = lazy(() => import('./pages/NotFound'))
const MerchantModule = lazy(() => import('./pages/MerchantModule'))
const ConsoleResource = lazy(() => import('./pages/ConsoleResource'))

const pageFallback = <div className="flex h-screen items-center justify-center text-gray-600">Loading WROS...</div>
const page = (Page) => <Suspense fallback={pageFallback}><Page /></Suspense>
const protectedPage = (Page) => <ProtectedRoute><Suspense fallback={pageFallback}><Page /></Suspense></ProtectedRoute>

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-whatsapp-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return token ? children : <Navigate to="/login" />
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: page(Login)
  },
  {
    path: '/signin',
    element: page(Login)
  },
  {
    path: '/register',
    element: page(Register)
  },
  {
    path: '/signup',
    element: page(Register)
  },
  {
    path: '/dashboard',
    element: protectedPage(Dashboard)
  },
  {
    path: '/products',
    element: protectedPage(Products)
  },
  {
    path: '/products/:id',
    element: protectedPage(ProductDetail)
  },
  {
    path: '/orders',
    element: protectedPage(Orders)
  },
  {
    path: '/orders/:id',
    element: protectedPage(OrderDetail)
  },
  {
    path: '/customers',
    element: protectedPage(Customers)
  },
  {
    path: '/customers/:id',
    element: protectedPage(CustomerDetail)
  },
  {
    path: '/inventory',
    element: protectedPage(Inventory)
  },
  {
    path: '/settings',
    element: protectedPage(Settings)
  },
  {
    path: '/reports',
    element: protectedPage(Reports)
  },
  {
    path: '/admin',
    element: protectedPage(AdminConsole)
  },
  {
    path: '/bob',
    element: protectedPage(BobAssistant)
  },
  {
    path: '/docs',
    element: protectedPage(ConsoleResource)
  },
  {
    path: '/legal',
    element: protectedPage(ConsoleResource)
  },
  ...['/billing', '/projects', '/api-keys', '/docs', '/crm', '/delivery', '/invoices'].map((path) => ({
    path,
    element: protectedPage(MerchantModule)
  })),
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: '*',
    element: page(NotFound)
  }
], { basename: '/console' })
