import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'info';

type ToastItem = {
  id: number;
  variant: ToastVariant;
  message: string;
};

type ToastContextValue = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((variant: ToastVariant, message: string) => {
    const id = Date.now();
    setToasts(current => [...current, { id, variant, message }]);
    window.setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  const value = useMemo(() => ({
    success: (message: string) => addToast('success', message),
    error: (message: string) => addToast('error', message),
    info: (message: string) => addToast('info', message),
  }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="fixed right-4 top-4 z-50 flex flex-col gap-3">
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`min-w-[260px] max-w-sm rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md transition-all ${
                toast.variant === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : toast.variant === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {toast.variant === 'success' ? <CheckCircle2 className="h-5 w-5" /> : toast.variant === 'error' ? <AlertCircle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                </div>
                <div className="text-sm leading-6">{toast.message}</div>
              </div>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
