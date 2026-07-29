import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Phone, Mail, MapPin, MessageCircleMore } from 'lucide-react';
import ProviderShell from '../../components/provider/ProviderShell';
import { customers as customerSeed } from '../../data/providerDashboard';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredCustomers = useMemo(() => {
    return customerSeed.filter((customer) => {
      const matchesSearch = [customer.name, customer.email, customer.location, customer.favoriteService]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || (filter === 'Repeat' ? customer.repeatCustomer : !customer.repeatCustomer);
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <ProviderShell active="customers">
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Client relationships</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Customer Directory</h2>
              <p className="mt-2 text-sm text-slate-500">Maintain a polished view of your most valuable repeat clients and new leads.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-40 bg-transparent text-sm outline-none" placeholder="Search" />
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <Filter size={16} className="text-slate-400" />
                <select value={filter} onChange={(event) => setFilter(event.target.value)} className="bg-transparent outline-none">
                  <option>All</option>
                  <option>Repeat</option>
                  <option>New</option>
                </select>
              </label>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-48 animate-pulse rounded-[1.5rem] bg-slate-100" />
              ))}
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">No customers match your search.</div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <img src={customer.image} alt={customer.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{customer.name}</h3>
                        {customer.repeatCustomer && <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase text-emerald-600">Repeat</span>}
                      </div>
                      <p className="text-sm text-slate-500">{customer.totalBookings} bookings</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2"><Phone size={14} /> {customer.phone}</p>
                    <p className="flex items-center gap-2"><Mail size={14} /> {customer.email}</p>
                    <p className="flex items-center gap-2"><MapPin size={14} /> {customer.location}</p>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white p-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between"><span>Favorite service</span><span className="font-semibold text-slate-900">{customer.favoriteService}</span></div>
                    <div className="mt-2 flex items-center justify-between"><span>Amount spent</span><span className="font-semibold text-slate-900">{customer.amountSpent}</span></div>
                    <div className="mt-2 flex items-center justify-between"><span>Last booking</span><span className="font-semibold text-slate-900">{customer.lastBooking}</span></div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link to={`/provider/customers/${customer.id}`} className="rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold text-white">View Profile</Link>
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">Booking History</button>
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"><MessageCircleMore size={14} className="inline" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProviderShell>
  );
}
