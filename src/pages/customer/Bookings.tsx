import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import bookingsApi, { type Booking } from '../../api/bookingsApi';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    bookingsApi.fetchBookings(user.email).then((result) => {
      setBookings(result);
      setLoading(false);
    });
  }, [user]);

  const bookingsList = bookings.length > 0 ? bookings : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">My Bookings</h1>
            <p className="text-[var(--color-text-muted)]">Booking history for {user?.name ?? 'your account'}.</p>
          </div>
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-[var(--color-primary-600)] hover:underline text-sm font-semibold">
            <ChevronRight size={16} /> Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium">Loading your bookings…</p>
          </div>
        ) : bookingsList.length === 0 ? (
          <div className="text-center py-20 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium">No bookings found yet.</p>
            <p className="mt-2">Browse services to book your first home service.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookingsList.map((booking) => (
              <div key={booking.id} className="rounded-3xl border border-[var(--color-border-main)] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] mb-2">
                    <span className="font-semibold text-[var(--color-text-main)]">{booking.id}</span>
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-[var(--color-text-muted)]">{booking.status}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--color-text-main)]">{booking.serviceName}</h2>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">{booking.date}</p>
                </div>
                <Link to={`/track/${booking.id}`} className="inline-flex items-center gap-2 text-[var(--color-primary-600)] hover:underline text-sm font-semibold">
                  Track booking
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
