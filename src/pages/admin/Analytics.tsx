import { useMemo } from 'react';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

const stats = [
  { label: 'Weekly Bookings', value: '590', icon: <TrendingUp size={18} /> },
  { label: 'Active Providers', value: '142', icon: <Users size={18} /> },
  { label: 'Average Rating', value: '4.82', icon: <BarChart3 size={18} /> },
  { label: 'Response Time', value: '12 min', icon: <Clock size={18} /> },
];

const graph = [
  { tier: 'Cleaning', value: 240 },
  { tier: 'Plumbing', value: 180 },
  { tier: 'AC Repair', value: 110 },
  { tier: 'Electrical', value: 60 },
];

export default function Analytics() {
  const total = useMemo(() => graph.reduce((sum, item) => sum + item.value, 0), []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Analytics</h1>
        <p className="text-[var(--color-text-muted)]">High-level performance metrics for Quick Service.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-[var(--color-border-main)] rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-primary-600)] flex items-center justify-center">{stat.icon}</div>
            <div>
              <div className="text-xs tracking-wider text-[var(--color-text-muted)] uppercase">{stat.label}</div>
              <div className="font-bold text-xl text-[var(--color-text-main)]">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl p-6">
        <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-6">Category Bookings</h2>
        <div className="space-y-4">
          {graph.map((row) => (
            <div key={row.tier} className="space-y-2">
              <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
                <span>{row.tier}</span>
                <span>{row.value}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-primary-600)] rounded-full" style={{ width: `${(row.value / total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
