import { Outlet, Link } from 'react-router-dom';
import { User, Menu, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthNav = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-600)] text-white rounded-full text-sm font-medium hover:bg-[var(--color-primary-800)] transition-colors">
        <LogIn size={16} />
        <span className="hidden sm:inline">Sign in</span>
      </Link>
    );
  }

  return (
    <>
      <Link to="/profile" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-600)] text-white rounded-full text-sm font-medium hover:bg-[var(--color-primary-800)] transition-colors">
        <User size={16} />
        <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
      </Link>
      <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border-main)] rounded-full text-sm font-medium text-[var(--color-text-main)] hover:bg-gray-50 transition-colors">
        <LogOut size={16} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-[var(--color-border-main)] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-primary-600)] text-white rounded-md flex items-center justify-center font-bold text-xl">Q</div>
          <span className="font-bold text-xl text-[var(--color-primary-800)]">Quick Service</span>
        </Link>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          <Link to="/services" className="hidden sm:block text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-primary-600)]">
            Services
          </Link>
          <AuthNav />
          <button className="md:hidden text-[var(--color-text-main)]">
            <Menu size={24} />
          </button>
        </div>

      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[var(--color-border-main)] mt-auto py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--color-primary-600)] text-white rounded-md flex items-center justify-center font-bold text-xl">Q</div>
              <span className="font-bold text-xl text-[var(--color-primary-800)]">Quick Service</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              The unified home-services marketplace. Book trusted professionals for all your home needs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text-main)]">Customers</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link to="/services" className="hover:text-[var(--color-primary-600)]">Book a Service</Link></li>
              <li><Link to="/dashboard" className="hover:text-[var(--color-primary-600)]">My Dashboard</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-primary-600)]">How it Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text-main)]">Providers</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link to="/admin" className="hover:text-[var(--color-primary-600)]">Join as Provider</Link></li>
              <li><Link to="/admin" className="hover:text-[var(--color-primary-600)]">Provider Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text-main)]">Legal</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--color-border-main)] mt-8 pt-8 text-center text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Quick Service. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
