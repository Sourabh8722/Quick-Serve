import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CalendarCheck, 
  BarChart3, 
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Providers', path: '/admin/providers', icon: <Briefcase size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-[var(--color-border-main)] flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border-main)]">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-primary-600)] text-white rounded-md flex items-center justify-center font-bold text-xl">Q</div>
          <span className="font-bold text-xl text-[var(--color-primary-800)] leading-none">
            QuickServe<br/><span className="text-[10px] text-[var(--color-text-muted)] font-normal uppercase tracking-wider">Admin Panel</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-[var(--color-primary-600)]' 
                      : 'text-[var(--color-text-muted)] hover:bg-gray-50 hover:text-[var(--color-text-main)]'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-[var(--color-border-main)]">
        <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-medium text-[var(--color-text-muted)] hover:bg-gray-50 hover:text-red-600 transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-[var(--color-border-main)] flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error-600)] rounded-full"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-[var(--color-primary-600)] text-white flex items-center justify-center font-semibold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
};

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-[var(--color-background)]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
