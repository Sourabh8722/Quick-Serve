import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ProviderProfile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary-800)]">Not signed in</h2>
        <p className="text-[var(--color-text-muted)] mt-2">Please sign in to view your provider profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Provider Profile</h1>
          <p className="text-[var(--color-text-muted)]">Manage your account, service listing details, and provider status.</p>
        </div>
        <Link
          to="/provider/dashboard"
          className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary-600)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-800)] transition-colors"
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </Link>
      </div>

      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl bg-slate-50 p-6">
            <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">Account Summary</h2>
            <div className="space-y-4 text-sm text-[var(--color-text-muted)]">
              <div>
                <span className="block font-medium text-[var(--color-text-main)]">Name</span>
                <span>{user.name}</span>
              </div>
              <div>
                <span className="block font-medium text-[var(--color-text-main)]">Email</span>
                <span>{user.email}</span>
              </div>
              <div>
                <span className="block font-medium text-[var(--color-text-main)]">Role</span>
                <span>{user.role}</span>
              </div>
              <div>
                <span className="block font-medium text-[var(--color-text-main)]">Joined</span>
                <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-[var(--color-border-main)]">
            <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">Provider details</h2>
            <div className="space-y-4 text-sm text-[var(--color-text-muted)]">
              <div>
                <span className="block font-medium text-[var(--color-text-main)]">Business name</span>
                <span>{user.businessName || 'Not provided'}</span>
              </div>
              <div>
                <span className="block font-medium text-[var(--color-text-main)]">Service category</span>
                <span>{user.profession || 'Not provided'}</span>
              </div>
              <div>
                <span className="block font-medium text-[var(--color-text-main)]">Provider status</span>
                <span>{user.providerStatus ?? 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--color-border-main)] bg-[#f8fafc] p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-main)]">Approval status</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              {user.providerStatus === 'APPROVED'
                ? 'Your account is approved. You can manage requests and accept bookings.'
                : user.providerStatus === 'PENDING'
                ? 'Your application is pending. You will receive approval soon.'
                : 'Your application was rejected. Contact support to reapply.'}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary-600)]">
            <CheckCircle2 size={18} />
            {user.providerStatus ?? 'Pending'}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[var(--color-border-main)] bg-white p-6">
          <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">Profile actions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <button onClick={logout} className="rounded-2xl bg-[var(--color-primary-600)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-800)] transition-colors">
              Sign out
            </button>
            <Link to="/provider/dashboard" className="inline-flex items-center justify-center rounded-2xl border border-[var(--color-border-main)] px-4 py-3 text-sm font-semibold text-[var(--color-text-main)] hover:bg-gray-50 transition-colors">
              View dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
