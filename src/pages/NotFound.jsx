import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-whatsapp-green">404</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-3 text-gray-600">The WROS console route you requested is unavailable.</p>
        <Link to="/dashboard" className="mt-6 inline-flex rounded-lg bg-whatsapp-green px-4 py-2 font-medium text-white">
          Return to dashboard
        </Link>
      </div>
    </div>
  )
}