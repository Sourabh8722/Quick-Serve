import { useEffect, useState } from 'react';
import bookingsApi from '../../api/bookingsApi';
import type { Booking } from '../../api/bookingsApi';
import { useAuth } from '../../context/AuthContext';

export default function RequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      loadRequests();
    }
  }, [user]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await bookingsApi.fetchProviderBookings(user!.email);
      setRequests(data.requests);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      await bookingsApi.updateBooking(id, {
        status: 'Provider Assigned',
        providerEmail: user!.email,
        providerName: user!.name,
      });
      // Remove from list after accepting
      setRequests((current) => current.filter((req) => req.id !== id));
    } catch (error) {
      console.error('Failed to accept booking', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Booking Requests</h1>
          <p className="text-slate-500">Review and accept new service requests from customers.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading requests...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No New Requests</h3>
                  <p>You currently have no pending booking requests from customers.</p>
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors align-middle">
                  <td className="px-6 py-4 font-semibold text-slate-900">{request.customerName}</td>
                  <td className="px-6 py-4 text-slate-600">{request.address}, {request.city}</td>
                  <td className="px-6 py-4 font-medium text-[var(--color-primary-700)]">{request.serviceName}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div>{request.date}</div>
                    <div className="text-xs text-slate-400">{request.time}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">₹{request.price}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition shadow-sm"
                    >
                      Accept Job
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
