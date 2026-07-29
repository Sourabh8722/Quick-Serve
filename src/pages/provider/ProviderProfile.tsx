import ProviderShell from '../../components/provider/ProviderShell';
import { Camera, Mail, Phone, MapPin, BriefcaseBusiness, BadgeCheck } from 'lucide-react';

export default function ProviderProfile() {
  return (
    <ProviderShell active="profile">
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Business Profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Provider Profile</h2>
              <p className="mt-2 text-sm text-slate-500">Present a polished, trustworthy business profile to every customer.</p>
            </div>
            <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Save Profile</button>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-sky-500/10 text-sky-600">
                <Camera size={24} />
              </div>
              <p className="mt-4 font-semibold text-slate-900">Maya Chen</p>
              <p className="mt-2 text-sm text-slate-500">Trusted local service provider</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600">Verified</span>
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-semibold text-violet-600">8 years</span>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Business Name</p>
                  <p className="mt-2 text-sm text-slate-600">Maya Chen Home Services</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Owner Name</p>
                  <p className="mt-2 text-sm text-slate-600">Maya Chen</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Phone</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Phone size={14} /> (555) 204-1183</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Email</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Mail size={14} /> maya@quickserve.com</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Address</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><MapPin size={14} /> 452 River Street, Brooklyn, NY</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Experience</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><BadgeCheck size={14} className="text-emerald-500" /> 8 years</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Skills</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><BriefcaseBusiness size={14} /> HVAC, Plumbing, Electrical</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProviderShell>
  );
}
