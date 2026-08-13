import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

export default function Settings() {
  const user = useAuthStore((s) => s.user);
  const { theme, toggleTheme } = useThemeStore();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-fg">Settings</h2>
        <p className="mt-1 text-sm text-muted">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-fg mb-4">Profile</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Name</label>
            <input
              type="text"
              defaultValue={user?.name ?? ''}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Email</label>
            <input
              type="email"
              defaultValue={user?.email ?? ''}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-fg mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-fg">Theme</p>
            <p className="text-xs text-muted mt-0.5">
              Currently using <strong>{theme}</strong> mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-fg hover:bg-hover transition-colors"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>

      {/* API */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-fg mb-4">API</h3>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">API Endpoint</label>
          <input
            type="text"
            value={import.meta.env.VITE_API_URL || 'https://api.wros.co.uk/api'}
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-border bg-input text-muted text-sm font-mono focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
