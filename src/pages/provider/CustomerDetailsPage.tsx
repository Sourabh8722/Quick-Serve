import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Clock3, BadgeCheck } from 'lucide-react';
import ProviderShell from '../../components/provider/ProviderShell';
import { customers } from '../../data/providerDashboard';

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const customer = customers.find((item) => item.id === id);

  if (!customer) {
    return (
      <ProviderShell active="customers">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Customer profile not found.</div>
      </ProviderShell>
    );
  }

  return (
    <ProviderShell active="customers">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/provider/customers" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
            <ArrowLeft size={16} />
            Back to customers
          </Link>
          <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600">Repeat Customer</div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img src={customer.image} alt={customer.name} className="h-24 w-24 rounded-[1.5rem] object-cover" />
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{customer.name}</h2>
                <p className="mt-1 text-sm text-slate-500">Loyal customer with a strong history of repeat bookings.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold text-sky-600">{customer.favoriteService}</span>
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-600">{customer.totalBookings} bookings</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Personal Information</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><BadgeCheck size={14} className="text-emerald-500" /> Preferred service: {customer.favoriteService}</p>
                  <p className="flex items-center gap-2"><Clock3 size={14} /> Last booking: {customer.lastBooking}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Contact Information</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><Phone size={14} /> {customer.phone}</p>
                  <p className="flex items-center gap-2"><Mail size={14} /> {customer.email}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> {customer.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Booking History Timeline</p>
                <button className="rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white">Export</button>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ['Apr 18', 'HVAC Tune-Up', 'Completed'],
                  ['May 22', 'Plumbing Repair', 'Completed'],
                  ['Jun 07', 'Electrical Inspection', 'In Progress'],
                ].map(([date, service, status]) => (
                  <div key={date} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <div>
                      <p className="font-semibold text-slate-900">{service}</p>
                      <p className="text-slate-500">{date}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Summary</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span>Total amount spent</span><span className="font-semibold text-slate-900">{customer.amountSpent}</span></div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span>Favorite service</span><span className="font-semibold text-slate-900">{customer.favoriteService}</span></div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"><span>Repeat client</span><span className="font-semibold text-slate-900">{customer.repeatCustomer ? 'Yes' : 'No'}</span></div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Notes</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Customer appreciates proactive updates, prefers same-day scheduling, and requests clear pricing before work begins.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold text-white">Call</button>
                <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProviderShell>
  );
}
