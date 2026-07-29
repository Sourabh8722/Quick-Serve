import ProviderShell from '../../components/provider/ProviderShell';
import { Camera } from 'lucide-react';

export default function SettingsPage() {
  return (
    <ProviderShell active="settings">
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Preferences</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Profile Settings</h2>
              <p className="mt-2 text-sm text-slate-500">Adjust your public profile, contact details, and business information with a polished experience.</p>
            </div>
            <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-sky-500/10 text-sky-600">
                <Camera size={24} />
              </div>
              <p className="mt-4 font-semibold text-slate-900">Update profile photo</p>
              <p className="mt-2 text-sm text-slate-500">A clear business photo helps customers trust your service.</p>
              <button className="mt-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Upload</button>
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-600">
                  <span className="mb-2 block font-semibold text-slate-900">Business Name</span>
                  <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="Maya Chen Home Services" />
                </label>
                <label className="text-sm text-slate-600">
                  <span className="mb-2 block font-semibold text-slate-900">Owner Name</span>
                  <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="Maya Chen" />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-600">
                  <span className="mb-2 block font-semibold text-slate-900">Phone</span>
                  <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="(555) 204-1183" />
                </label>
                <label className="text-sm text-slate-600">
                  <span className="mb-2 block font-semibold text-slate-900">Email</span>
                  <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="maya@quickserve.com" />
                </label>
              </div>
              <label className="text-sm text-slate-600">
                <span className="mb-2 block font-semibold text-slate-900">Address</span>
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="452 River Street, Brooklyn, NY" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-600">
                  <span className="mb-2 block font-semibold text-slate-900">Experience</span>
                  <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="8 years" />
                </label>
                <label className="text-sm text-slate-600">
                  <span className="mb-2 block font-semibold text-slate-900">Skills</span>
                  <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="HVAC, Plumbing, Electrical" />
                </label>
              </div>
              <label className="text-sm text-slate-600">
                <span className="mb-2 block font-semibold text-slate-900">Business Description</span>
                <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none" defaultValue="Trusted local professional delivering dependable, high-quality work with friendly service." />
              </label>
            </div>
          </div>
        </div>
      </div>
    </ProviderShell>
  );
}
