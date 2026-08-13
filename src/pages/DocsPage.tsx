export default function DocsPage() {
  return (
    <section>
      <h2>Documentation</h2>
      <p className="page-intro">Reference guides for daily operations in WROS Console.</p>
      <div className="content-card">
        <h3>Getting Started</h3>
        <p>Use the Dashboard for system snapshots and the CRM section for account tracking.</p>
      </div>
      <div className="content-card">
        <h3>Authentication</h3>
        <p>Users must log in using their account credentials to access protected resources.</p>
      </div>
      <div className="content-card">
        <h3>Support</h3>
        <p>Contact internal support for account provisioning, API troubleshooting, and access issues.</p>
      </div>
    </section>
  )
}
