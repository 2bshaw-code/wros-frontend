import { useEffect, useState } from 'react'
import { apiClient } from '../api/client'

interface CrmRow {
  id: string | number
  name: string
  email: string
  company: string
}

export default function CrmPage() {
  const [rows, setRows] = useState<CrmRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchRows = async () => {
      try {
        const { data } = await apiClient.get<CrmRow[] | { data?: CrmRow[] }>('/crm')
        const parsedRows = Array.isArray(data) ? data : data.data ?? []

        if (isMounted) {
          setRows(parsedRows)
        }
      } catch {
        if (isMounted) {
          setError('Unable to fetch CRM records right now.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchRows()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <h2>CRM</h2>
      <p className="page-intro">Customer records and relationship insights.</p>

      {isLoading ? <p>Loading CRM data...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!isLoading && !error ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3}>No CRM records available.</td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.company}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}
