import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[var(--color-border-main)] flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-[var(--color-primary-600)] flex items-center justify-center">
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            trend >= 0 ? 'bg-green-50 text-[var(--color-success-800)]' : 'bg-red-50 text-[var(--color-error-600)]'
          }`}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{title}</h3>
        <div className="text-2xl font-bold text-[var(--color-text-main)]">{value}</div>
      </div>
    </div>
  );
};
