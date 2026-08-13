export default function DocsPage() {
  return (
    <div className="prose">
      <h1>Documentation</h1>

      <h2>Getting Started</h2>
      <p>
        Welcome to the WROS Console. This platform provides a centralised interface for
        managing your organisation's resources, contacts, and settings.
      </p>

      <h2>Authentication</h2>
      <p>
        All API requests require a valid JWT token passed in the <code>Authorization</code>{' '}
        header as <code>{'******'}</code>. Tokens are issued on login and expire
        after 24 hours.
      </p>

      <h2>API Reference</h2>
      <p>The WROS API base URL is <strong>https://api.wros.co.uk/api</strong>. The following endpoints are available:</p>
      <ul>
        <li><strong>POST /auth/login</strong> — Authenticate and receive a JWT token</li>
        <li><strong>POST /auth/register</strong> — Create a new user account</li>
        <li><strong>GET /users/me</strong> — Retrieve the current user profile</li>
        <li><strong>GET /crm/contacts</strong> — List all CRM contacts</li>
        <li><strong>POST /crm/contacts</strong> — Create a new contact</li>
        <li><strong>GET /dashboard/stats</strong> — Retrieve dashboard statistics</li>
      </ul>

      <h2>Rate Limiting</h2>
      <p>
        Requests are limited to 1,000 per hour per API key. Rate limit headers are included
        in every response: <code>X-RateLimit-Limit</code> and <code>X-RateLimit-Remaining</code>.
      </p>

      <h2>Errors</h2>
      <p>
        The API returns standard HTTP status codes. A <code>401 Unauthorized</code> response
        indicates an invalid or expired token. A <code>422 Unprocessable Entity</code>{' '}
        response includes a JSON body with validation errors.
      </p>

      <h2>Support</h2>
      <p>
        For support enquiries please contact{' '}
        <a href="mailto:support@wros.co.uk" style={{ color: 'var(--primary)' }}>
          support@wros.co.uk
        </a>
        .
      </p>
    </div>
  )
}
