const mockUsers = [
  { id: 1, name: 'Customer User', email: 'user@quickservice.com', status: 'Active' },
  { id: 2, name: 'Admin User', email: 'admin@quickservice.com', status: 'Active' },
  { id: 3, name: 'New Customer', email: 'new@quickservice.com', status: 'Pending' },
];

export default function UsersManagement() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Users</h1>
          <p className="text-[var(--color-text-muted)]">Manage customer accounts and activity.</p>
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-t border-[var(--color-border-main)] hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-[var(--color-text-main)]">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-[var(--color-primary-600)] hover:underline">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
