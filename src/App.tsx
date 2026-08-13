function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  const hostingUrl = import.meta.env.VITE_HOSTING_URL

  return (
    <div>
      <h1>WROS Console</h1>
      <p>API: {apiUrl}</p>
      <p>Host: {hostingUrl}</p>
    </div>
  )
}

export default App
