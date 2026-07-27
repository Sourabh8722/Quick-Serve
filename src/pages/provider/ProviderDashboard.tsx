import { Link } from 'react-router-dom';
import { Briefcase, Clock, Users, CheckCircle } from 'lucide-react';

export default function ProviderDashboard() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Provider Dashboard</h1>
          <p className="text-[var(--color-text-muted)]">Manage bookings, confirm availability, and grow your business.</p>
        </div>
        <Link to="/profile" className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary-600)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-800)] transition-colors">
          <Briefcase size={16} />
          View profile
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mb-8">
        <div className="rounded-3xl border border-[var(--color-border-main)] bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.16em]">Open requests</h2>
              <p className="mt-2 text-3xl font-bold text-[var(--color-primary-800)]">18</p>
            </div>
            <span className="rounded-2xl bg-blue-50 p-3 text-blue-700">
              <Clock size={20} />
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">Accept new work from customers waiting nearby.</p>
        </div>

        <div className="rounded-3xl border border-[var(--color-border-main)] bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.16em]">Active jobs</h2>
              <p className="mt-2 text-3xl font-bold text-[var(--color-primary-800)]">5</p>
            </div>
            <span className="rounded-2xl bg-green-50 p-3 text-green-700">
              <CheckCircle size={20} />
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">Track your confirmed bookings and upcoming visits.</p>
        </div>

        <div className="rounded-3xl border border-[var(--color-border-main)] bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.16em]">New leads</h2>
              <p className="mt-2 text-3xl font-bold text-[var(--color-primary-800)]">9</p>
            </div>
            <span className="rounded-2xl bg-purple-50 p-3 text-purple-700">
              <Users size={20} />
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">Respond quickly to maintain high ratings and service requests.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--color-border-main)] bg-white p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-main)]">Appointments today</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Review your schedule and confirm the next job.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary-600)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-800)] transition-colors">
            <CheckCircle size={16} />
            Update availability
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Customer</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Service</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Time</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[var(--color-background)] rounded-3xl border border-[var(--color-border-main)]">
                <td className="px-5 py-4 font-medium text-[var(--color-text-main)]">James Wilson</td>
                <td className="px-5 py-4 text-[var(--color-text-muted)]">AC Maintenance</td>
                <td className="px-5 py-4 text-[var(--color-text-muted)]">1:30 PM</td>
                <td className="px-5 py-4 text-[var(--color-primary-600)] font-semibold">Confirmed</td>
              </tr>
              <tr className="bg-[var(--color-background)] rounded-3xl border border-[var(--color-border-main)]">
                <td className="px-5 py-4 font-medium text-[var(--color-text-main)]">Emily Patel</td>
                <td className="px-5 py-4 text-[var(--color-text-muted)]">Leaking Faucet Repair</td>
                <td className="px-5 py-4 text-[var(--color-text-muted)]">3:00 PM</td>
                <td className="px-5 py-4 text-[var(--color-primary-600)] font-semibold">Assigned</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
