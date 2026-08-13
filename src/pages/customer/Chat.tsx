export default function Chat() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <h1 className="text-2xl font-bold text-[var(--color-primary-800)] mb-6 shrink-0">Chat Support</h1>
      
      <div className="flex-1 bg-white rounded-2xl border border-[var(--color-border-main)] flex overflow-hidden">
        {/* Chat List (Sidebar) */}
        <div className="w-1/3 border-r border-[var(--color-border-main)] bg-gray-50 flex flex-col items-center justify-center">
          <p className="text-[var(--color-text-muted)] text-sm px-4 text-center">No active conversations</p>
        </div>
        
        {/* Chat Window */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
          <div className="text-gray-300 mb-4">
            <svg xmlns="http://www.w3.org/-2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3 className="text-lg font-medium text-[var(--color-text-main)]">Select a conversation</h3>
          <p className="text-[var(--color-text-muted)] mt-1">Or start a new chat with a service provider</p>
        </div>
      </div>
    </div>
  );
}
