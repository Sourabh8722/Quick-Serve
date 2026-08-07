import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Phone, KeyRound } from 'lucide-react';

function getDefaultRedirect(role: string) {
  if (role === 'ADMIN') return '/admin';
  if (role === 'SERVICE_PROVIDER') return '/provider/dashboard';
  return '/dashboard';
}

export default function AuthLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loginMethod, setLoginMethod] = useState<'PASSWORD' | 'OTP'>('PASSWORD');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = new URLSearchParams(location.search).get('redirect') ?? '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Password or OTP based auth
      const authPassword = loginMethod === 'PASSWORD' ? password : 'password'; 
      
      const user = await login(identifier, authPassword);
      
      // Dynamic routing based on backend authenticated role
      const target = from && !['/login', '/register'].includes(from) ? from : getDefaultRedirect(user.role);
      navigate(target, { replace: true });
    } catch (err: any) {
      setError(err?.message ?? 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 py-8">
      <div className="w-full max-w-md bg-white border border-[var(--color-border-main)] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Welcome Back</h1>
            <p className="text-[var(--color-text-muted)] mt-1">Sign in to your account.</p>
          </div>
          <div className="w-12 h-12 bg-[var(--color-primary-600)] rounded-2xl flex items-center justify-center text-white shrink-0">
            <Lock size={22} />
          </div>
        </div>

        {/* Login Method Toggle */}
        <div className="flex gap-4 mb-6 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
           <label className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-lg cursor-pointer transition-colors ${loginMethod === 'PASSWORD' ? 'bg-white shadow-sm text-[var(--color-primary-700)]' : 'text-gray-500 hover:text-gray-700'}`}>
             <input type="radio" checked={loginMethod === 'PASSWORD'} onChange={() => setLoginMethod('PASSWORD')} className="hidden" />
             Password
           </label>
           <label className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-lg cursor-pointer transition-colors ${loginMethod === 'OTP' ? 'bg-white shadow-sm text-[var(--color-primary-700)]' : 'text-gray-500 hover:text-gray-700'}`}>
             <input type="radio" checked={loginMethod === 'OTP'} onChange={() => setLoginMethod('OTP')} className="hidden" />
             OTP
           </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Mobile Number or Email</label>
            <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2 bg-white focus-within:border-[var(--color-primary-500)] transition-colors">
              <Phone size={18} className="text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter mobile or email"
                className="w-full border-none outline-none text-sm text-[var(--color-text-main)] bg-transparent"
                required
              />
            </div>
          </div>

          {loginMethod === 'PASSWORD' ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-[var(--color-text-main)]">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-[var(--color-primary-600)] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2 bg-white focus-within:border-[var(--color-primary-500)] transition-colors">
                <Lock size={18} className="text-[var(--color-text-muted)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-none outline-none text-sm text-[var(--color-text-main)] bg-transparent"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">One Time Password (OTP)</label>
              <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2 bg-white focus-within:border-[var(--color-primary-500)] transition-colors">
                <KeyRound size={18} className="text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full border-none outline-none text-sm text-[var(--color-text-main)] bg-transparent"
                  required
                />
                <button type="button" className="text-xs font-medium text-[var(--color-primary-600)] hover:underline shrink-0">
                  Send OTP
                </button>
              </div>
            </div>
          )}

          {error && <div className="text-sm text-rose-600 bg-rose-50 p-3 rounded-xl">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl px-4 py-3 mt-4 text-white font-semibold transition shadow-sm ${loading ? 'bg-gray-300 text-gray-600' : 'bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)]'}`}
          >
            {loading ? 'Verifying…' : 'Sign in'}
          </button>
        </form>

        <p className="text-xs text-center text-[var(--color-text-muted)] mt-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <strong>Demo Accounts:</strong><br/>
          user@quickservice.com | provider@quickservice.com | admin@quickservice.com
        </p>
        
        <p className="text-xs text-center text-[var(--color-text-muted)] mt-2">
          <em>Service Providers & Admins: Please use your registered email/mobile. Quick Service will automatically route you to your portal.</em>
        </p>

        <div className="mt-8 text-center text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border-main)] pt-6">
          <span>Don't have an account?</span>{' '}
          <Link to="/register" className="text-[var(--color-primary-600)] font-semibold hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
}
