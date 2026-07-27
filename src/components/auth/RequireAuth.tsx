import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, type UserRole } from '../../context/AuthContext';
import type { ReactNode } from 'react';

type RequireAuthProps = {
  children: ReactNode;
  role?: UserRole;
};

export default function RequireAuth({ children, role }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (role && user.role !== role) {
    const fallbackRoute =
      user.role === 'ADMIN'
        ? '/admin'
        : user.role === 'SERVICE_PROVIDER'
        ? '/provider/dashboard'
        : '/dashboard';

    return <Navigate to={fallbackRoute} replace />;
  }

  return children;
}
