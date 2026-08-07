export default function ActiveJobsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Active Jobs</h1>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Jobs</h3>
        <p className="text-slate-500">You are not currently working on any active service jobs right now.</p>
      </div>
    </div>
  );
}
