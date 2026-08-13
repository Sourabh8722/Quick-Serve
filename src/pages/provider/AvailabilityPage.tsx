import { availabilityDays, weeklyHours, certificates, galleryImages } from '../../data/providerDashboard';
import { Clock3, CalendarDays, ShieldCheck, Camera } from 'lucide-react';

export default function AvailabilityPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600"><CalendarDays size={18} /></div>
              <div>
                <p className="text-sm text-slate-500">Scheduling</p>
                <h2 className="text-xl font-semibold text-slate-900">Working Days & Hours</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Working Days</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {availabilityDays.map((day) => (
                    <span key={day} className="rounded-full bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">{day}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Working Hours</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  {weeklyHours.map((hour) => (
                    <div key={hour} className="flex items-center gap-2"><Clock3 size={14} /> {hour}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-600"><ShieldCheck size={18} /></div>
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <h2 className="text-xl font-semibold text-slate-900">Availability Controls</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.25rem] border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Holiday Mode</p>
                    <p className="text-sm text-slate-500">Automatically pause bookings for planned vacations.</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-sky-500 peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Emergency Leave</p>
                    <p className="text-sm text-slate-500">Pause bookings temporarily for unexpected events.</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-rose-500 peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600"><Camera size={18} /></div>
            <div>
              <p className="text-sm text-slate-500">Portfolio</p>
              <h2 className="text-xl font-semibold text-slate-900">Certificates & Gallery</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Certificates</p>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {certificates.map((certificate) => (
                  <div key={certificate} className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> {certificate}</div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {galleryImages.map((image) => (
                <img key={image} src={image} alt="Gallery" className="h-28 w-full rounded-[1.25rem] object-cover" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
