import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { AuthUser } from '../../context/AuthContext';

const statusStyles = {
  APPROVED: 'bg-emerald-100 text-emerald-700',
  PENDING: 'bg-amber-100 text-amber-700',
  REJECTED: 'bg-rose-100 text-rose-700',
};

export default function ProvidersManagement() {
  const { fetchUsers, updateUser } = useAuth();
  const [providers, setProviders] = useState<AuthUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const users = await fetchUsers();
      setProviders(users.filter((user) => user.role === 'SERVICE_PROVIDER'));
      setLoading(false);
    };

    load();
  }, [fetchUsers]);

  const filtered = useMemo(
    () => providers.filter((provider) =>
      provider.name.toLowerCase().includes(search.toLowerCase()) ||
      (provider.profession ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (provider.businessName ?? '').toLowerCase().includes(search.toLowerCase()),
    ),
    [providers, search],
  );

  const handleApproval = async (provider: AuthUser, approve: boolean) => {
    const updated = await updateUser(provider.id, { providerStatus: approve ? 'APPROVED' : 'REJECTED' });
    setProviders((current) => current.map((item) => (item.id === provider.id && updated ? updated : item)));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Providers</h1>
          <p className="text-[var(--color-text-muted)]">Manage service providers and approvals.</p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search providers..."
          className="border border-[var(--color-border-main)] rounded-2xl px-4 py-3 text-sm outline-none"
        />
      </div>

      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Business</th>
              <th className="px-6 py-4">Service category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-muted)]">Loading providers…</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-muted)]">No providers found.</td>
              </tr>
            ) : (
              filtered.map((provider) => (
                <tr key={provider.id} className="border-t border-[var(--color-border-main)] hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-[var(--color-text-main)]">{provider.name}</td>
                  <td className="px-6 py-4">{provider.businessName ?? '—'}</td>
                  <td className="px-6 py-4">{provider.profession ?? '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[provider.providerStatus ?? 'PENDING']}`}>
                      {provider.providerStatus ?? 'PENDING'}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleApproval(provider, true)}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(provider, false)}
                      className="rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
