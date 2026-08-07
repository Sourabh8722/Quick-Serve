import { earningsSummary, revenueChartData, topServices } from '../../data/providerDashboard';
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function EarningsPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {earningsSummary.map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm font-medium text-emerald-500">{item.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Revenue</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Monthly Revenue</h2>
              </div>
              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-500">Stable</div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="url(#earnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Service mix</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Top Requested Services</h2>
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
        </div>
      </div>
    </>
  );
}
