import { useState } from 'react';
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
  LogOut,
  LayoutDashboard,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CustomerShell() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Find Services', path: '/services', icon: Search },
    { name: 'Quick Service Now', path: '/dashboard/quick', icon: Zap },
    { name: 'My Bookings', path: '/bookings', icon: Clock },
    { name: 'Track Service', path: '/track', icon: MapPin },
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
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-[var(--color-text-main)] p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Navigation Drawer Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-8 h-8 bg-[var(--color-primary-600)] text-white rounded-md flex items-center justify-center font-bold text-xl">Q</div>
            <span className="font-bold text-xl text-[var(--color-primary-800)]">Quick Service</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
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

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname.startsWith('/dashboard') && item.path.includes(location.pathname.split('/')[2]));
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
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

        <div className="pt-4 border-t border-[var(--color-border-main)]">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              logout();
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

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
