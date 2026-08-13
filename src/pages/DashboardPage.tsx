const widgets = [
  { title: 'Revenue Snapshot', value: '£0.00', note: 'Monthly overview pending API connection.' },
  { title: 'Open Opportunities', value: '0', note: 'CRM opportunities will appear here.' },
  { title: 'Support Tickets', value: '0', note: 'No active tickets in the queue.' },
  { title: 'System Health', value: 'Online', note: 'All core services are operational.' },
]

export default function DashboardPage() {
  return (
    <section>
      <h2>Dashboard</h2>
      <p className="page-intro">Welcome to the WROS Console dashboard.</p>

      <div className="widget-grid">
        {widgets.map((widget) => (
          <article key={widget.title} className="widget-card">
            <h3>{widget.title}</h3>
            <p className="widget-value">{widget.value}</p>
            <p>{widget.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
