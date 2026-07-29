import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  hint: string;
  icon: LucideIcon;
  accent: string;
  darkMode: boolean;
}

export default function StatCard({ title, value, trend, hint, icon: Icon, accent, darkMode }: StatCardProps) {
  return (
    <div className={`rounded-[1.5rem] border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
          <p className={`mt-3 text-2xl font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${accent} p-3 text-white`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-emerald-500">{trend}</p>
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{hint}</p>
      </div>
    </div>
  );
}
