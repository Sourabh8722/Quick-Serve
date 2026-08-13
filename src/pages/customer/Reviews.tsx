export default function Reviews() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary-800)] mb-6">My Reviews</h1>
      <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-main)] flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-yellow-400 mb-4">
          <svg xmlns="http://www.w3.org/-2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">No Reviews Yet</h3>
        <p className="text-[var(--color-text-muted)] text-center max-w-md">Once you complete a service and leave a rating for the provider, it will show up here.</p>
      </div>
    </div>
  );
}
