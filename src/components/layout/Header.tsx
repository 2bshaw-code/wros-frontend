import { Menu, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const user = useAuthStore((s) => s.user);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-border bg-header">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-lg text-muted hover:bg-hover"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base font-semibold text-fg">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted hover:bg-hover transition-colors"
          title="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {user && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block text-sm font-medium text-fg">
              {user.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
