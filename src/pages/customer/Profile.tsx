import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary-800)]">Not signed in</h2>
        <p className="text-[var(--color-text-muted)] mt-2">Please sign in to view your profile and bookings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-800)] mb-2">My Profile</h1>
        <p className="text-[var(--color-text-muted)] mb-8">Account details and booking preferences.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-50 p-6">
            <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">Personal Info</h2>
            <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
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
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-[var(--color-border-main)] flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">Booking Preferences</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Update your default settings and contact preferences here.</p>
            </div>
            <button onClick={logout} className="mt-6 w-full bg-[var(--color-primary-600)] text-white rounded-2xl py-3 font-semibold hover:bg-[var(--color-primary-800)] transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
