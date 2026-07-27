import type { ReactNode } from 'react';
import RequireAuth from './RequireAuth';

export default function ProviderRoute({ children }: { children: ReactNode }) {
  return <RequireAuth role="SERVICE_PROVIDER">{children}</RequireAuth>;
}
