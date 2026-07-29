import ProviderShell from '../../components/provider/ProviderShell';
import { BriefcaseBusiness, Clock3 } from 'lucide-react';

const services = [
  { title: 'Residential Repairs', description: 'Fast-response home repair for urgent maintenance needs.', duration: '1-3 hrs', price: '$120+', tag: 'Popular' },
  { title: 'Annual Maintenance', description: 'Scheduled checkups and preventive care for recurring clients.', duration: 'Flexible', price: '$180+', tag: 'Best Value' },
  { title: 'Premium Installation', description: 'High-quality installations with guaranteed workmanship.', duration: 'Half day', price: '$240+', tag: 'Priority' },
];

export default function ServicesPage() {
  return (
    <ProviderShell active="services">
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Service catalog</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">My Services</h2>
              <p className="mt-2 text-sm text-slate-500">Curate your offering with polished, professional service packages for new and returning clients.</p>
            </div>
            <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Add New Service</button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600"><BriefcaseBusiness size={18} /></div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">{service.tag}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{service.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span className="flex items-center gap-2"><Clock3 size={14} /> {service.duration}</span>
                  <span className="font-semibold text-slate-900">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProviderShell>
  );
}
