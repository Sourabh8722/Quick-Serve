import { useEffect, useState } from 'react';
import bookingsApi from '../../api/bookingsApi';
import type { Booking } from '../../api/bookingsApi';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const allBookings = await bookingsApi.fetchAllBookings();
        setBookings(allBookings);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Bookings</h1>
          <p className="text-[var(--color-text-muted)]">Review and manage service bookings.</p>
        </div>
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-muted)]">Loading bookings…</td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-muted)]">No bookings found.</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-[var(--color-border-main)] hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-[var(--color-text-main)]">{booking.id.slice(0, 8)}</td>
                  <td className="px-6 py-4">{booking.customerName}</td>
                  <td className="px-6 py-4">{booking.serviceName}</td>
                  <td className="px-6 py-4">{booking.date}</td>
                  <td className="px-6 py-4">{booking.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
