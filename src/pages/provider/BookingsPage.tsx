import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, Sparkles } from 'lucide-react';
import ProviderShell from '../../components/provider/ProviderShell';
import StatusBadge from '../../components/provider/StatusBadge';
import { bookings as bookingSeed } from '../../data/providerDashboard';

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [periodFilter, setPeriodFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredBookings = useMemo(() => {
    return bookingSeed.filter((booking) => {
      const matchesSearch = [booking.customerName, booking.serviceName, booking.address]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
      const matchesPeriod = periodFilter === 'All' || booking.period === periodFilter;
      return matchesSearch && matchesStatus && matchesPeriod;
    });
  }, [search, statusFilter, periodFilter]);

  return (
    <ProviderShell active="bookings">
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Operations</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Booking Management</h2>
              <p className="mt-2 text-sm text-slate-500">Track requests, handle confirmations, and keep every appointment moving forward.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-36 bg-transparent text-sm outline-none"
                  placeholder="Search"
                />
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <Filter size={16} className="text-slate-400" />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent outline-none">
                  <option>All</option>
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <Sparkles size={16} className="text-slate-400" />
                <select value={periodFilter} onChange={(event) => setPeriodFilter(event.target.value)} className="bg-transparent outline-none">
                  <option>All</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-16 animate-pulse rounded-2xl bg-slate-100" />
                ))}
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
                No bookings match your filters yet.
              </div>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-3 py-3 font-medium">Booking ID</th>
                    <th className="px-3 py-3 font-medium">Customer</th>
                    <th className="px-3 py-3 font-medium">Phone</th>
                    <th className="px-3 py-3 font-medium">Address</th>
                    <th className="px-3 py-3 font-medium">Service</th>
                    <th className="px-3 py-3 font-medium">Date</th>
                    <th className="px-3 py-3 font-medium">Time</th>
                    <th className="px-3 py-3 font-medium">Amount</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-100 align-middle">
                      <td className="px-3 py-4 font-semibold text-slate-900">{booking.id}</td>
                      <td className="px-3 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{booking.customerName}</p>
                          <p className="text-xs text-slate-500">{booking.period}</p>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-slate-600">{booking.phone}</td>
                      <td className="px-3 py-4 text-slate-600">{booking.address}</td>
                      <td className="px-3 py-4 text-slate-600">{booking.serviceName}</td>
                      <td className="px-3 py-4 text-slate-600">{booking.bookingDate}</td>
                      <td className="px-3 py-4 text-slate-600">{booking.preferredTime}</td>
                      <td className="px-3 py-4 font-semibold text-slate-900">{booking.amount}</td>
                      <td className="px-3 py-4"><StatusBadge status={booking.status} /></td>
                      <td className="px-3 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">View</button>
                          <button className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">Accept</button>
                          <button className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </ProviderShell>
  );
}
