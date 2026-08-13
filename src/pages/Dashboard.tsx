import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  const cards = [
    { label: 'Total Contacts', value: '—', color: 'bg-blue-500' },
    { label: 'Open Cases', value: '—', color: 'bg-amber-500' },
    { label: 'Documents', value: '—', color: 'bg-green-500' },
    { label: 'Notifications', value: '—', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-fg">
          Welcome back{user ? `, ${user.name}` : ''}!
        </h2>
        <p className="mt-1 text-sm text-muted">
          Here's a summary of your WROS Console activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-5 flex items-center gap-4 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} flex-shrink-0`} />
            <div>
              <p className="text-xs text-muted font-medium uppercase tracking-wide">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-fg">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-fg mb-3">Recent Activity</h3>
          <p className="text-sm text-muted">No recent activity.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-fg mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {['Add Contact', 'Create Document', 'Open Case'].map((action) => (
              <button
                key={action}
                className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:bg-hover transition-colors text-fg"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
