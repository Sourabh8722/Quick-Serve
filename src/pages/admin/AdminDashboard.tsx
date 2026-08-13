import { StatCard } from '../../components/ui/StatCard';
import { DollarSign, Calendar, Users, Star, Download, Plus, Settings } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'WK 1', bookings: 400 },
  { name: 'WK 2', bookings: 300 },
  { name: 'WK 3', bookings: 500 },
  { name: 'WK 4', bookings: 280 },
  { name: 'WK 5', bookings: 590 },
];

const recentBookings = [
  { id: 1, clientInitials: 'JS', clientName: 'Jane Smith', service: 'Deep Kitchen Cleaning', date: 'Oct 24, 2023', avatarBg: 'bg-blue-100 text-blue-700' },
  { id: 2, clientInitials: 'MA', clientName: 'Mark Anderson', service: 'Leaking Faucet Repair', date: 'Oct 24, 2023', avatarBg: 'bg-indigo-100 text-indigo-700' },
  { id: 3, clientInitials: 'RW', clientName: 'Robert Wilson', service: 'Full House Painting', date: 'Oct 25, 2023', avatarBg: 'bg-purple-100 text-purple-700' },
  { id: 4, clientInitials: 'EL', clientName: 'Emily Loft', service: 'AC Maintenance', date: 'Oct 25, 2023', avatarBg: 'bg-blue-50 text-blue-600' },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)] mb-1">Dashboard Overview</h1>
          <p className="text-[var(--color-text-muted)]">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-50 text-[var(--color-primary-600)] rounded-full text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Data
          </button>
          <button className="px-4 py-2 bg-[var(--color-primary-800)] text-white rounded-full text-sm font-medium hover:bg-blue-900 transition-colors flex items-center gap-2">
            <Plus size={16} />
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="TOTAL REVENUE" 
          value="₹128,430.00" 
          trend={12} 
          icon={<DollarSign size={20} />} 
        />
        <StatCard 
          title="ACTIVE BOOKINGS" 
          value="1,248" 
          trend={8} 
          icon={<Calendar size={20} />} 
        />
        <StatCard 
          title="NEW PROVIDERS" 
          value="42" 
          trend={0} 
          icon={<Users size={20} />} 
        />
        <StatCard 
          title="AVG. RATING" 
          value="4.82" 
          trend={4} 
          icon={<Star size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Platform Health Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[var(--color-border-main)]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-1">Platform Health</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Monthly booking volume & service completion</p>
            </div>
            <select className="bg-blue-50 text-sm font-medium text-[var(--color-primary-600)] rounded-full px-4 py-2 border-none outline-none appearance-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary-600)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--color-primary-600)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stroke="var(--color-primary-600)" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Insights */}
        <div className="bg-white p-6 rounded-2xl border border-[var(--color-border-main)]">
          <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-6">Service Insights</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-[var(--color-primary-800)]"><Calendar size={20} /></div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--color-text-main)]">Deep Cleaning</h4>
                  <p className="text-xs text-[var(--color-text-muted)]">Popular this week</p>
                </div>
              </div>
              <span className="font-bold text-[var(--color-primary-800)]">42%</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-[var(--color-primary-800)]"><Settings size={20} /></div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--color-text-main)]">Plumbing Fix</h4>
                  <p className="text-xs text-[var(--color-text-muted)]">Steady demand</p>
                </div>
              </div>
              <span className="font-bold text-[var(--color-primary-800)]">28%</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-[var(--color-primary-800)]"><Star size={20} /></div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--color-text-main)]">Electrical</h4>
                  <p className="text-xs text-[var(--color-text-muted)]">Needs providers</p>
                </div>
              </div>
              <span className="font-bold text-[var(--color-error-600)]">12%</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[var(--color-text-muted)] mb-3">Active Providers Distribution</h4>
            <div className="flex h-3 w-full rounded-full overflow-hidden">
              <div className="bg-[var(--color-primary-800)] w-[40%]" title="Tier 1"></div>
              <div className="bg-[var(--color-primary-600)] w-[30%]" title="Tier 2"></div>
              <div className="bg-blue-300 w-[30%]" title="Tier 3"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-muted)] uppercase">
              <span>Tier 1</span>
              <span>Tier 2</span>
              <span>Tier 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 rounded-2xl border border-[var(--color-border-main)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[var(--color-text-main)]">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-sm font-semibold text-[var(--color-primary-600)] hover:underline">View All</a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Client</th>
                <th className="pb-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Service</th>
                <th className="pb-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-t border-[var(--color-border-main)]">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${booking.avatarBg}`}>
                        {booking.clientInitials}
                      </div>
                      <span className="font-semibold text-sm text-[var(--color-text-main)]">{booking.clientName}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-[var(--color-text-muted)]">{booking.service}</td>
                  <td className="py-4 text-sm text-[var(--color-text-muted)]">{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
