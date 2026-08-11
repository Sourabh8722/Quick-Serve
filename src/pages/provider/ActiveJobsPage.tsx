import { useEffect, useState } from 'react';
import bookingsApi from '../../api/bookingsApi';
import type { Booking } from '../../api/bookingsApi';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/provider/StatusBadge';

export default function ActiveJobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      loadJobs();
    }
  }, [user]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await bookingsApi.fetchProviderBookings(user!.email);
      setJobs(data.jobs);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await bookingsApi.updateBooking(id, { status: 'Completed' });
      // Update local status
      setJobs((current) =>
        current.map((job) => (job.id === id ? { ...job, status: 'Completed' } : job))
      );
    } catch (error) {
      console.error('Failed to complete job', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Active Jobs</h1>
          <p className="text-slate-500">Manage your assigned and ongoing jobs.</p>
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
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading active jobs...</td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Jobs</h3>
                  <p>You are not currently working on any active service jobs right now.</p>
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors align-middle">
                  <td className="px-6 py-4 font-semibold text-slate-900">{job.customerName}</td>
                  <td className="px-6 py-4 text-slate-600">{job.address}, {job.city}</td>
                  <td className="px-6 py-4 font-medium text-[var(--color-primary-700)]">{job.serviceName}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div>{job.date}</div>
                    <div className="text-xs text-slate-400">{job.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4">
                    {job.status !== 'Completed' ? (
                      <button
                        onClick={() => handleComplete(job.id)}
                        className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-sm"
                      >
                        Mark Completed
                      </button>
                    ) : (
                      <span className="text-slate-400 text-sm font-medium">Done</span>
                    )}
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
