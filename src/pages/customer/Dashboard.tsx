import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import bookingsApi, { type Booking } from '../../api/bookingsApi';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    bookingsApi.fetchBookings(user.email)
      .then((result) => {
        setBookings(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load bookings in customer dashboard:', err);
        setLoading(false);
      });
  }, [user]);

  // Active booking: the first booking that is not 'Completed' or 'Cancelled'
  const activeBooking = bookings.find(b => b.status !== 'Completed' && b.status !== 'Cancelled');

  // Recent bookings: other bookings, or up to 3 recent bookings
  const recentBookings = bookings.filter(b => b.id !== activeBooking?.id).slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Completed':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-800)] mb-1">Welcome back, {user?.name.split(' ')[0] ?? 'Customer'}!</h1>
        <p className="text-[var(--color-text-muted)]">Manage your bookings, addresses, and profile here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Quick Links & Profile */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-[var(--color-border-main)] p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-2xl">
                {user?.name.charAt(0).toUpperCase() ?? 'U'}
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--color-text-main)]">{user?.name ?? 'Customer'}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{user?.email ?? 'No email available'}</p>
              </div>
            </div>
            
            <Link to="/profile" className="w-full py-2 bg-gray-50 border border-[var(--color-border-main)] rounded-xl flex justify-center items-center gap-2 text-sm font-semibold text-[var(--color-text-main)] hover:bg-gray-100 transition-colors">
              <User size={16} /> Edit Profile
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-[var(--color-border-main)] overflow-hidden shadow-sm">
            <h3 className="font-bold text-lg p-6 pb-2 text-[var(--color-text-main)]">Quick Links</h3>
            <ul className="flex flex-col">
              <li>
                <Link to="/bookings" className="flex items-center justify-between p-4 px-6 hover:bg-gray-50 border-t border-[var(--color-border-main)] transition-colors">
                  <span className="flex items-center gap-3 text-sm font-medium text-[var(--color-text-main)]"><Calendar size={18} className="text-[var(--color-primary-600)]" /> My Bookings</span>
                  <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center justify-between p-4 px-6 hover:bg-gray-50 border-t border-[var(--color-border-main)] transition-colors">
                  <span className="flex items-center gap-3 text-sm font-medium text-[var(--color-text-main)]"><MapPin size={18} className="text-[var(--color-primary-600)]" /> Saved Addresses</span>
                  <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Active & Recent Bookings */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Active Booking */}
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-4">Active Booking</h2>
            {loading ? (
              <div className="bg-white rounded-3xl border border-[var(--color-border-main)] p-6 animate-pulse h-32 flex items-center justify-center text-slate-400">
                Loading active booking details...
              </div>
            ) : activeBooking ? (
              <div className="bg-white rounded-3xl border-2 border-[var(--color-primary-600)] p-6 relative overflow-hidden shadow-sm hover:shadow-hover transition-all duration-300">
                <div className="absolute top-0 right-0 bg-[var(--color-primary-600)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {activeBooking.status.toUpperCase()}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h3 className="font-bold text-lg text-[var(--color-text-main)] mb-1">{activeBooking.serviceName}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {activeBooking.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {activeBooking.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {activeBooking.city}</span>
                    </div>
                    {activeBooking.provider && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">
                          {activeBooking.provider.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-[var(--color-text-main)]">{activeBooking.provider}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-end gap-3 md:items-end">
                    <Link to={`/track/${activeBooking.id}`} className="bg-[var(--color-primary-600)] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-primary-800)] hover:shadow-md transition-all text-center shadow-sm">
                      Track Service
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[var(--color-border-main)] p-8 text-center flex flex-col items-center justify-center shadow-sm">
                <p className="text-[var(--color-text-muted)] mb-4">You have no active service bookings currently.</p>
                <Link to="/services" className="px-5 py-2.5 bg-blue-50 text-[var(--color-primary-600)] rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
                  Explore Services
                </Link>
              </div>
            )}
          </div>

          {/* Past Bookings */}
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-4">Recent Bookings</h2>
            {loading ? (
              <div className="bg-white rounded-3xl border border-[var(--color-border-main)] p-6 animate-pulse h-32" />
            ) : recentBookings.length > 0 ? (
              <div className="bg-white rounded-3xl border border-[var(--color-border-main)] divide-y divide-[var(--color-border-main)] shadow-sm">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-[var(--color-text-main)]">{booking.serviceName}</h4>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)]">Booking #{booking.id.slice(0, 8)} • {booking.date} at {booking.time}</p>
                    </div>
                    <Link to={`/track/${booking.id}`} className="text-[var(--color-primary-600)] text-sm font-semibold hover:underline flex items-center gap-0.5 hover:gap-1 transition-all">
                      View Details <ChevronRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[var(--color-border-main)] p-8 text-center text-slate-400 shadow-sm">
                No past bookings found.
              </div>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
}
