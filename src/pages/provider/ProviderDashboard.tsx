import ProviderShell from '../../components/provider/ProviderShell';
import StatCard from '../../components/provider/StatCard';
import { overviewStats, completionChartData, revenueChartData, topServices } from '../../data/providerDashboard';
import { AreaChart, Area, BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUpRight, CircleDollarSign, TrendingUp } from 'lucide-react';

export default function ProviderDashboard() {
  return (
    <ProviderShell active="dashboard">
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewStats.slice(0, 4).map((stat) => (
            <StatCard key={stat.title} {...stat} darkMode={false} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Revenue Performance</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Monthly Revenue</h2>
              </div>
              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-500">+12.8%</div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fillOpacity={1} fill="url(#revenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Demand Overview</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Services Completed</h2>
              </div>
              <div className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold text-sky-500">+18%</div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="jobs" radius={[8, 8, 0, 0]} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Recent Momentum</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Top Requested Services</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
                <ArrowUpRight size={16} />
                View report
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {topServices.map((service) => (
                <div key={service.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-700">{service.name}</span>
                    <span className="font-semibold text-slate-500">{service.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-2 rounded-full ${service.color}`} style={{ width: `${service.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">This Month</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Performance Snapshot</h2>
              </div>
              <div className="rounded-full bg-slate-100 p-2">
                <TrendingUp size={18} className="text-sky-500" />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-sky-500/10 to-violet-500/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Average booking value</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">$185</p>
                  </div>
                  <div className="rounded-2xl bg-white/70 p-3 text-sky-500">
                    <CircleDollarSign size={20} />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Response time</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">12 mins</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Customer satisfaction</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">97%</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProviderShell>
  );
}
