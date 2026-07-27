import { Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const recentBookings = [
    { id: '9823', name: 'Leaking Faucet Repair', date: 'Sep 15, 2023', status: 'Completed', color: 'bg-green-100 text-green-700' },
    { id: '8742', name: 'AC Maintenance', date: 'Aug 02, 2023', status: 'Completed', color: 'bg-green-100 text-green-700' },
    { id: '8123', name: 'Sofa Cleaning', date: 'Jul 10, 2023', status: 'Cancelled', color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-800)] mb-1">Welcome back, {user?.name.split(' ')[0] ?? 'Customer'}!</h1>
        <p className="text-[var(--color-text-muted)]">Manage your bookings, addresses, and profile here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Quick Links & Profile */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-[var(--color-border-main)] p-6">
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

          <div className="bg-white rounded-2xl border border-[var(--color-border-main)] overflow-hidden">
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
            <div className="bg-white rounded-2xl border-2 border-[var(--color-primary-600)] p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 bg-[var(--color-primary-600)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                IN PROGRESS
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <h3 className="font-bold text-lg text-[var(--color-text-main)] mb-1">Deep Kitchen Cleaning</h3>
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> Oct 24, 2023</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> 10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">
                      JS
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-main)]">Jane Smith</span>
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-3 md:items-end">
                  <Link to="/track/1234" className="bg-[var(--color-primary-600)] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-800)] transition-colors text-center shadow-sm">
                    Track Service
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Past Bookings */}
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-4">Recent Bookings</h2>
            <div className="bg-white rounded-2xl border border-[var(--color-border-main)] divide-y divide-[var(--color-border-main)]">
              {recentBookings.map(booking => (
                <div key={booking.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-[var(--color-text-main)]">{booking.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${booking.color}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">Booking #{booking.id} • {booking.date}</p>
                  </div>
                  <button className="text-[var(--color-primary-600)] text-sm font-semibold hover:underline">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
