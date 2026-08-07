export default function RequestsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Booking Requests</h1>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No New Requests</h3>
        <p className="text-slate-500">You currently have no pending booking requests from customers. When a customer requests your service, it will appear here for you to accept or decline.</p>
      </div>
    </div>
  );
}
