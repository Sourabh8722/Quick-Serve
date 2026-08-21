import { useEffect, useState } from 'react';
import { Bell, Save, ShieldCheck } from 'lucide-react';

const SETTINGS_KEY = 'quickserve_admin_settings';

type AdminSettings = {
  companyName: string;
  supportEmail: string;
  bookingNotifications: boolean;
  providerNotifications: boolean;
};

const defaultSettings: AdminSettings = {
  companyName: 'Quick Service',
  supportEmail: 'support@quickservice.com',
  bookingNotifications: true,
  providerNotifications: true,
};

export default function Settings() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem(SETTINGS_KEY);
    if (storedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) });
    }
  }, []);

  function updateSetting<Key extends keyof AdminSettings>(key: Key, value: AdminSettings[Key]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function saveSettings(event: React.FormEvent) {
    event.preventDefault();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Settings</h1>
        <p className="text-[var(--color-text-muted)]">Manage platform details and administrator notifications.</p>
      </div>

      <form onSubmit={saveSettings} className="space-y-6">
        <section className="bg-white border border-[var(--color-border-main)] rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-blue-50 p-2 text-[var(--color-primary-600)]"><ShieldCheck size={20} /></div>
            <div>
              <h2 className="font-semibold text-lg text-[var(--color-text-main)]">Platform details</h2>
              <p className="text-sm text-[var(--color-text-muted)]">These details are used for administrator support communication.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="text-sm font-semibold text-[var(--color-text-main)]">
              Company name
              <input value={settings.companyName} onChange={(event) => updateSetting('companyName', event.target.value)} className="mt-2 w-full rounded-xl border border-[var(--color-border-main)] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[var(--color-primary-600)]" />
            </label>
            <label className="text-sm font-semibold text-[var(--color-text-main)]">
              Support email
              <input type="email" value={settings.supportEmail} onChange={(event) => updateSetting('supportEmail', event.target.value)} className="mt-2 w-full rounded-xl border border-[var(--color-border-main)] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-[var(--color-primary-600)]" />
            </label>
          </div>
        </section>

        <section className="bg-white border border-[var(--color-border-main)] rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-blue-50 p-2 text-[var(--color-primary-600)]"><Bell size={20} /></div>
            <div>
              <h2 className="font-semibold text-lg text-[var(--color-text-main)]">Notifications</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Choose which updates administrators receive.</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              ['bookingNotifications', 'Booking updates', 'Receive alerts when bookings are created or updated.'],
              ['providerNotifications', 'Provider updates', 'Receive alerts about provider registrations and approvals.'],
            ].map(([key, title, description]) => (
              <label key={key} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 cursor-pointer">
                <span>
                  <span className="block font-semibold text-[var(--color-text-main)]">{title}</span>
                  <span className="block text-sm text-[var(--color-text-muted)] mt-1">{description}</span>
                </span>
                <input type="checkbox" checked={settings[key as keyof AdminSettings] as boolean} onChange={(event) => updateSetting(key as keyof AdminSettings, event.target.checked)} className="h-5 w-5 accent-[var(--color-primary-600)]" />
              </label>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-end gap-4">
          {saved && <span className="text-sm text-emerald-700">Settings saved.</span>}
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary-600)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-700)]">
            <Save size={17} /> Save settings
          </button>
        </div>
      </form>
    </div>
  );
}
