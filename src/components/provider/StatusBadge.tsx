interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Pending: 'bg-amber-500/10 text-amber-600',
    Accepted: 'bg-sky-500/10 text-sky-600',
    'Provider Assigned': 'bg-sky-500/10 text-sky-600',
    'Booking Confirmed': 'bg-blue-500/10 text-blue-600',
    'In Progress': 'bg-violet-500/10 text-violet-600',
    'On the Way': 'bg-violet-500/10 text-violet-600',
    'Arrived': 'bg-indigo-500/10 text-indigo-600',
    'Service Started': 'bg-violet-500/10 text-violet-600',
    Completed: 'bg-emerald-500/10 text-emerald-600',
    Cancelled: 'bg-rose-500/10 text-rose-600',
  };

  const badgeStyle = styles[status] || 'bg-gray-500/10 text-gray-600';

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle}`}>{status}</span>;
}
