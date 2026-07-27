import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-primary-800)]">404</h1>
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">Page not found</p>
        <div className="mt-6">
          <Link to="/" className="bg-[var(--color-primary-600)] text-white px-4 py-2 rounded">Return Home</Link>
        </div>
      </div>
    </div>
  );
}
