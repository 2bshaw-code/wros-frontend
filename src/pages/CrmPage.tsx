const contacts = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', company: 'Acme Ltd' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', status: 'Lead', company: 'Beta Corp' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', status: 'Active', company: 'Gamma Inc' },
  { id: 4, name: 'Dave Miller', email: 'dave@example.com', status: 'Inactive', company: 'Delta Co' },
  { id: 5, name: 'Eve Wilson', email: 'eve@example.com', status: 'Lead', company: 'Epsilon Ltd' },
]

const statusColor: Record<string, string> = {
  Active: '#22c55e',
  Lead: '#f59e0b',
  Inactive: '#9ca3af',
}

export default function CrmPage() {
  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Contacts</span>
        <button
          style={{
            padding: '0.4rem 0.9rem',
            background: 'var(--primary)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          + Add Contact
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td style={{ fontWeight: 500 }}>{c.name}</td>
              <td style={{ color: 'var(--text-muted)' }}>{c.email}</td>
              <td>{c.company}</td>
              <td>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: `${statusColor[c.status]}22`,
                    color: statusColor[c.status],
                  }}
                >
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
