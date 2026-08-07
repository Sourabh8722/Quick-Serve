export default function QuickServiceNow() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary-800)] mb-6">Quick Service Now</h1>
      <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-main)] text-center">
        <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">Emergency Service Required?</h3>
        <p className="text-[var(--color-text-muted)] mb-6">Request an immediate service provider dispatch to your location within 30 minutes.</p>
        <button className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm">
          Request Emergency Service
        </button>
      </div>
    </div>
  );
}
