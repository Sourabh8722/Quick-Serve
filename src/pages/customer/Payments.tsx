export default function Payments() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary-800)] mb-6">Payments</h1>
      <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-main)] flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/-2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">Payment History</h3>
        <p className="text-[var(--color-text-muted)] text-center max-w-md">You have no recent payment transactions. Your previous service payments will appear here.</p>
      </div>
    </div>
  );
}
