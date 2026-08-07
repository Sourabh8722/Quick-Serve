export default function UpcomingJobsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Upcoming Jobs</h1>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <h3 className="text-lg font-medium text-slate-900 mb-2">Schedule Clear</h3>
        <p className="text-slate-500">You have no upcoming jobs scheduled for the next 7 days.</p>
      </div>
    </div>
  );
}
