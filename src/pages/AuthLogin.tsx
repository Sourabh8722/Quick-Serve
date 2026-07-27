import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

function getDefaultRedirect(role: string) {
  if (role === 'ADMIN') return '/admin';
  if (role === 'SERVICE_PROVIDER') return '/provider/dashboard';
  return '/dashboard';
}

export default function AuthLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = new URLSearchParams(location.search).get('redirect') ?? '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      const target = from && !['/login', '/register'].includes(from) ? from : getDefaultRedirect(user.role);
      navigate(target, { replace: true });
    } catch (err: any) {
      setError(err?.message ?? 'Invalid login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 py-8">
      <div className="w-full max-w-md bg-white border border-[var(--color-border-main)] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Sign in</h1>
            <p className="text-[var(--color-text-muted)]">Access your QuickServe dashboard.</p>
          </div>
          <div className="w-12 h-12 bg-[var(--color-primary-600)] rounded-2xl flex items-center justify-center text-white">
            <Lock size={22} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Email</label>
            <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2">
              <Mail size={18} className="text-[var(--color-text-muted)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-none outline-none text-sm text-[var(--color-text-main)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Password</label>
            <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2">
              <Lock size={18} className="text-[var(--color-text-muted)]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border-none outline-none text-sm text-[var(--color-text-main)]"
              />
            </div>
          </div>

          {error && <div className="text-sm text-rose-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl px-4 py-3 text-white font-semibold transition ${loading ? 'bg-gray-300 text-gray-600' : 'bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-800)]'}`}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-sm text-[var(--color-text-muted)] mt-6">
          Use <strong>user@quickserve.com</strong>, <strong>provider@quickserve.com</strong>, or <strong>admin@quickserve.com</strong> for quick access.
        </p>

        <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          <span>Need an account?</span>{' '}
          <Link to="/register" className="text-[var(--color-primary-600)] hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}
