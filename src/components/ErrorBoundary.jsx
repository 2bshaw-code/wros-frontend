import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('WROS console render failure', error, errorInfo)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <section className="w-full max-w-md border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">Console unavailable</h1>
          <p className="mt-2 text-sm text-gray-600">The current screen could not be displayed. Your session has not been changed.</p>
          <div className="mt-5 flex justify-center gap-3"><button className="rounded-lg bg-whatsapp-green px-4 py-2 text-sm font-medium text-white" onClick={() => window.location.reload()}>Reload console</button><a className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700" href="/">Return to Website</a></div>
        </section>
      </main>
    )
  }
}