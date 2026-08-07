import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  CalendarCheck, 
  Zap, 
  Clock, 
  MapPin, 
  CreditCard, 
  Star, 
  MessageSquare, 
  User,
  Menu,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CustomerShell() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Find Services', path: '/services', icon: Search },
    { name: 'Book Service', path: '/services', icon: CalendarCheck }, // Alternatively can point to a specific "book" listing
    { name: 'Quick Service Now', path: '/dashboard/quick', icon: Zap },
    { name: 'My Bookings', path: '/bookings', icon: Clock },
    { name: 'Track Service', path: '/track', icon: MapPin }, // Assuming this needs an ID or leads to a list of active trackings
    { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
    { name: 'Reviews', path: '/dashboard/reviews', icon: Star },
    { name: 'Chat', path: '/dashboard/chat', icon: MessageSquare },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-[var(--color-border-main)] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-primary-600)] text-white rounded-md flex items-center justify-center font-bold text-xl">Q</div>
          <span className="font-bold text-xl text-[var(--color-primary-800)]">Customer</span>
        </div>
        <button className="text-[var(--color-text-main)]">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-[var(--color-border-main)] fixed inset-y-0 z-10">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-primary-600)] text-white rounded-md flex items-center justify-center font-bold text-xl">Q</div>
            <span className="font-bold text-xl text-[var(--color-primary-800)]">Quick Service</span>
          </Link>
        </div>

        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-primary-100)] text-[var(--color-primary-800)] rounded-full flex items-center justify-center font-bold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-sm text-[var(--color-text-main)]">{user?.name}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Customer</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname.startsWith('/dashboard') && item.path.includes(location.pathname.split('/')[2]));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)]'
                    : 'text-[var(--color-text-muted)] hover:bg-gray-50 hover:text-[var(--color-text-main)]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[var(--color-primary-600)]' : 'text-gray-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--color-border-main)]">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8">
        <div className="max-w-[1000px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
