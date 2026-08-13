import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
      <p className="text-5xl font-bold text-accent">404</p>
      <h2 className="mt-3 text-xl font-semibold text-fg">Page not found</h2>
      <p className="mt-2 text-sm text-muted">The page you're looking for doesn't exist.</p>
      <Link
        to="/dashboard"
        className="mt-6 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
