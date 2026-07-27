export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Settings</h1>
        <p className="text-[var(--color-text-muted)]">Manage account settings and platform configuration.</p>
      </div>

      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">General</h2>
            <p className="text-[var(--color-text-muted)]">Update company details, support contact, and notification preferences.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">Security</h2>
            <p className="text-[var(--color-text-muted)]">Manage login methods, multi-factor authentication, and access controls.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
