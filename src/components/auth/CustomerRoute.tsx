import type { ReactNode } from 'react';
import RequireAuth from './RequireAuth';

export default function CustomerRoute({ children }: { children: ReactNode }) {
  return <RequireAuth role="CUSTOMER">{children}</RequireAuth>;
}
