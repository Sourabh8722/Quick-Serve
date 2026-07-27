import { useMemo, useState } from 'react';

const mockBookings = [
  { id: 'B-1023', customer: 'Jane Smith', service: 'Deep Kitchen Cleaning', date: 'Jul 19, 2026', status: 'Confirmed' },
  { id: 'B-1034', customer: 'Mark Anderson', service: 'Leaking Faucet Repair', date: 'Jul 17, 2026', status: 'Completed' },
  { id: 'B-1045', customer: 'Emily Loft', service: 'AC Maintenance', date: 'Jul 15, 2026', status: 'In Progress' },
];

export default function BookingsManagement() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => mockBookings.filter(booking => booking.customer.toLowerCase().includes(search.toLowerCase()) || booking.service.toLowerCase().includes(search.toLowerCase()) || booking.id.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Bookings</h1>
          <p className="text-[var(--color-text-muted)]">Review and manage service bookings.</p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bookings..."
          className="border border-[var(--color-border-main)] rounded-2xl px-4 py-3 text-sm outline-none"
        />
      </div>

      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Booking ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr key={booking.id} className="border-t border-[var(--color-border-main)] hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-[var(--color-text-main)]">{booking.id}</td>
                <td className="px-6 py-4">{booking.customer}</td>
                <td className="px-6 py-4">{booking.service}</td>
                <td className="px-6 py-4">{booking.date}</td>
                <td className="px-6 py-4">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
