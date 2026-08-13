export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <h1 className="text-2xl font-semibold mb-6 shrink-0">Customer Chat</h1>
      
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 flex overflow-hidden">
        <div className="w-1/3 border-r border-slate-200 bg-slate-50 flex flex-col items-center justify-center">
          <p className="text-slate-500 text-sm px-4 text-center">No active conversations</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
          <h3 className="text-lg font-medium text-slate-900">Select a conversation</h3>
          <p className="text-slate-500 mt-1">Or start a new chat with a customer</p>
        </div>
      </div>
    </div>
  );
}
