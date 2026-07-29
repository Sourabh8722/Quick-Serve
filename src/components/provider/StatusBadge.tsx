import type { BookingStatus } from '../../data/providerDashboard';

interface StatusBadgeProps {
  status: BookingStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<BookingStatus, string> = {
    Pending: 'bg-amber-500/10 text-amber-600',
    Accepted: 'bg-sky-500/10 text-sky-600',
    'In Progress': 'bg-violet-500/10 text-violet-600',
    Completed: 'bg-emerald-500/10 text-emerald-600',
    Cancelled: 'bg-rose-500/10 text-rose-600',
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}
