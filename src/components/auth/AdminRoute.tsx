import type { ReactNode } from 'react';
import RequireAuth from './RequireAuth';

export default function AdminRoute({ children }: { children: ReactNode }) {
  return <RequireAuth role="ADMIN">{children}</RequireAuth>;
}
