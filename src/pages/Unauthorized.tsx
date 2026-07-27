import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-[var(--color-border-main)] rounded-3xl p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary-600)] mb-4">Unauthorized</p>
        <h1 className="text-4xl font-bold text-[var(--color-primary-800)] mb-4">You do not have access</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          The page you tried to reach is restricted based on your user role. Please sign in with the correct account or return to your dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl border border-[var(--color-border-main)] px-6 py-3 text-sm font-semibold text-[var(--color-text-main)] hover:bg-[var(--color-background)] transition"
          >
            Return Home
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary-600)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-800)] transition"
          >
            Sign in again
          </Link>
        </div>
      </div>
    </div>
  );
}
