import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, Users, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import bookingsApi, { type Booking } from '../../api/bookingsApi';

const statusLabel = (status: Booking['status']) => {
  if (status === 'Pending') return 'Pending';
  if (status === 'Confirmed') return 'Confirmed';
  if (status === 'In Progress') return 'In Progress';
  if (status === 'Completed') return 'Completed';
  return status;
};

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Booking[]>([]);
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);

  const providerName = user?.name ?? '';

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    const result = await bookingsApi.fetchProviderBookings(user.email);
    setRequests(result.requests);
    setJobs(result.jobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleRequestAction = async (bookingId: string, approve: boolean) => {
    if (!user) return;
    const updates = approve
      ? { status: 'Confirmed' as const, providerEmail: user.email, providerName }
      : { status: 'Cancelled' as const };
    await bookingsApi.updateBooking(bookingId, updates);
    fetchBookings();
  };

  const newLeads = useMemo(() => Math.max(0, requests.length - jobs.length), [requests.length, jobs.length]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Provider Dashboard</h1>
          <p className="text-[var(--color-text-muted)]">Manage booking requests, update availability, and grow your business.</p>
        </div>
        <Link to="/provider/profile" className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-primary-600)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-800)] transition-colors">
          <Briefcase size={16} />
          View profile
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mb-8">
        <div className="rounded-3xl border border-[var(--color-border-main)] bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.16em]">Open requests</h2>
              <p className="mt-2 text-3xl font-bold text-[var(--color-primary-800)]">{requests.length}</p>
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
              <p className="mt-2 text-3xl font-bold text-[var(--color-primary-800)]">{jobs.length}</p>
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
              <p className="mt-2 text-3xl font-bold text-[var(--color-primary-800)]">{newLeads}</p>
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
          <button
            onClick={() => setAvailable((current) => !current)}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition-colors ${
              available ? 'bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-800)]' : 'bg-gray-400 hover:bg-gray-500'
            }`}
          >
            {available ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
            {available ? 'Mark unavailable' : 'Mark available'}
          </button>
        </div>

        {user?.providerStatus !== 'APPROVED' ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <h3 className="text-lg font-semibold">Provider account status</h3>
            <p className="mt-2 text-sm">
              {user?.providerStatus === 'PENDING'
                ? 'Your provider application is pending approval. Booking requests will appear once your account is approved.'
                : 'Your provider account has been rejected. Please reach out to support to continue offering services.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Customer</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Service</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Time</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="bg-[var(--color-background)] rounded-3xl border border-[var(--color-border-main)]">
                    <td colSpan={5} className="px-5 py-12 text-center text-[var(--color-text-muted)]">Loading bookings…</td>
                  </tr>
                ) : requests.length === 0 && jobs.length === 0 ? (
                  <tr className="bg-[var(--color-background)] rounded-3xl border border-[var(--color-border-main)]">
                    <td colSpan={5} className="px-5 py-12 text-center text-[var(--color-text-muted)]">No requests or active jobs yet.</td>
                  </tr>
                ) : (
                  [...requests, ...jobs].map((booking) => (
                    <tr key={booking.id} className="bg-[var(--color-background)] rounded-3xl border border-[var(--color-border-main)]">
                      <td className="px-5 py-4 font-medium text-[var(--color-text-main)]">{booking.customerName}</td>
                      <td className="px-5 py-4 text-[var(--color-text-muted)]">{booking.serviceName}</td>
                      <td className="px-5 py-4 text-[var(--color-text-muted)]">{booking.time}</td>
                      <td className="px-5 py-4 text-[var(--color-primary-600)] font-semibold">{statusLabel(booking.status)}</td>
                      <td className="px-5 py-4 space-x-2">
                        {booking.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleRequestAction(booking.id, true)}
                              className="rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700 transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRequestAction(booking.id, false)}
                              className="rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-sm text-[var(--color-text-muted)]">No action</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
