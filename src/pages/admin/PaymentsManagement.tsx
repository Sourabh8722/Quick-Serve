export default function PaymentsManagement() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary-800)] mb-6">Payments Management</h1>
      <div className="bg-white rounded-xl shadow-sm border border-[var(--color-border-main)] p-8 text-center">
        <h3 className="text-lg font-medium text-[var(--color-text-main)] mb-2">Transaction History</h3>
        <p className="text-[var(--color-text-muted)]">View all customer payments, provider payouts, and platform commissions here.</p>
      </div>
    </div>
  );
}
