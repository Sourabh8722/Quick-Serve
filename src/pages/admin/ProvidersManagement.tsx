import { useMemo, useState } from 'react';

const mockProviders = [
  { id: 1, name: 'Amit Patel', category: 'Electrician', rating: 4.6, jobs: 89 },
  { id: 2, name: 'Jane Smith', category: 'Cleaning', rating: 4.8, jobs: 124 },
  { id: 3, name: 'Emily Loft', category: 'AC Repair', rating: 4.7, jobs: 156 },
];

export default function ProvidersManagement() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => mockProviders.filter(provider => provider.name.toLowerCase().includes(search.toLowerCase()) || provider.category.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Providers</h1>
          <p className="text-[var(--color-text-muted)]">Manage service providers and approvals.</p>
        </div>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search providers..."
            className="border border-[var(--color-border-main)] rounded-2xl px-4 py-3 text-sm outline-none"
          />
          <button className="bg-[var(--color-primary-600)] text-white rounded-2xl px-4 py-3 font-semibold hover:bg-[var(--color-primary-800)] transition-colors">Add Provider</button>
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Jobs Completed</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((provider) => (
              <tr key={provider.id} className="border-t border-[var(--color-border-main)] hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-[var(--color-text-main)]">{provider.name}</td>
                <td className="px-6 py-4">{provider.category}</td>
                <td className="px-6 py-4">{provider.rating.toFixed(1)}</td>
                <td className="px-6 py-4">{provider.jobs}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-[var(--color-primary-600)] hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
