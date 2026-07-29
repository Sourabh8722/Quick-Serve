import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircleMore,
  MoonStar,
  Settings,
  Sparkles,
  SunMedium,
  UserCircle2,
  Users,
  X,
} from 'lucide-react';

interface ProviderShellProps {
  children: React.ReactNode;
  active: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/provider/dashboard', icon: LayoutDashboard },
  { label: 'Bookings', href: '/provider/bookings', icon: CalendarDays },
  { label: 'Customers', href: '/provider/customers', icon: Users },
  { label: 'My Services', href: '/provider/services', icon: BriefcaseBusiness },
  { label: 'Earnings', href: '/provider/earnings', icon: Sparkles },
  { label: 'Reviews', href: '/provider/reviews', icon: MessageCircleMore },
  { label: 'Availability', href: '/provider/availability', icon: Clock3 },
  { label: 'Notifications', href: '/provider/notifications', icon: BellRing },
  { label: 'Profile', href: '/provider/profile', icon: UserCircle2 },
  { label: 'Settings', href: '/provider/settings', icon: Settings },
];

export default function ProviderShell({ children, active }: ProviderShellProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeLabel = navItems.find((item) => item.href === active || active.startsWith(`${item.href}/`))?.label ?? 'Dashboard';

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <div className={isDarkMode ? 'min-h-screen bg-slate-950 text-slate-50' : 'min-h-screen bg-slate-50 text-slate-900'}>
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <aside
          className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-white/90 p-6 shadow-2xl backdrop-blur-xl transition-transform lg:static lg:translate-x-0 lg:rounded-r-[2rem] ${isDarkMode ? 'bg-slate-900/95 text-slate-50' : 'bg-white/90 text-slate-900'}`}
        >
          <div className="flex items-center justify-between lg:justify-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">QuickServe</p>
              <h2 className="mt-1 text-xl font-semibold">Provider Hub</h2>
            </div>
            <button className="rounded-full p-2 lg:hidden" onClick={() => setMobileOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="mt-8 rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 font-semibold text-white">
                MC
              </div>
              <div>
                <p className="font-semibold">Maya Chen</p>
                <p className="text-sm text-slate-500">Premium Provider</p>
              </div>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const activeItem = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    activeItem
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                      : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/60">
            <p className="text-sm font-semibold">Availability</p>
            <p className="mt-2 text-sm text-slate-500">You are currently online and ready for new requests.</p>
            <button className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">Online</button>
          </div>
        </aside>

        {mobileOpen && <div className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

        <div className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <header className={`rounded-[2rem] border p-4 shadow-sm sm:p-6 ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/80'}`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <button className="rounded-2xl border border-slate-200 p-2 lg:hidden" onClick={() => setMobileOpen(true)}>
                  <Menu size={18} />
                </button>
                <div>
                  <p className="text-sm text-slate-500">Welcome back</p>
                  <h1 className="text-2xl font-semibold">Welcome, Maya Chen</h1>
                  <p className="text-sm text-sky-500">{activeLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative rounded-2xl border border-slate-200 p-2.5">
                  <BellRing size={18} />
                  <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
                </button>
                <button
                  onClick={() => setIsDarkMode((prev) => !prev)}
                  className="rounded-2xl border border-slate-200 p-2.5"
                >
                  {isDarkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
                </button>
                <button className="rounded-2xl border border-slate-200 p-2.5">
                  <Settings size={18} />
                </button>
                <Link to="/login" className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white">
                  <LogOut size={16} />
                  Logout
                </Link>
              </div>
            </div>
          </header>

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
