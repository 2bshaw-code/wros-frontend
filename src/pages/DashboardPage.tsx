const stats = [
  { label: 'Total Users', value: '1,284', change: '+12% this month' },
  { label: 'Active Sessions', value: '47', change: '+3 today' },
  { label: 'API Calls', value: '98,432', change: '+8% this week' },
  { label: 'Uptime', value: '99.9%', change: 'Last 30 days' },
]

const recentActivity = [
  { id: 1, action: 'User login', user: 'alice@example.com', time: '2 min ago' },
  { id: 2, action: 'Record created', user: 'bob@example.com', time: '15 min ago' },
  { id: 3, action: 'Settings updated', user: 'carol@example.com', time: '1 hr ago' },
  { id: 4, action: 'Export generated', user: 'dave@example.com', time: '3 hr ago' },
  { id: 5, action: 'User registered', user: 'eve@example.com', time: '5 hr ago' },
]

export default function DashboardPage() {
  return (
    <>
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-change">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">Recent Activity</div>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row) => (
              <tr key={row.id}>
                <td>{row.action}</td>
                <td>{row.user}</td>
                <td style={{ color: 'var(--text-muted)' }}>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
