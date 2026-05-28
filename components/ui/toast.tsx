'use client';

import * as React from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ────────────────────────────────────────────────────────────────────

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastContextValue {
  toast: (message: string, type?: Toast['type']) => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const ToastContext = React.createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return React.useContext(ToastContext);
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full pr-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium pointer-events-auto',
              'animate-in slide-in-from-bottom-3 fade-in duration-300',
              t.type === 'success' && 'bg-green-950/80 dark:bg-[#0d1f15] border-green-700/50 text-green-900 dark:text-green-100',
              t.type === 'warning' && 'bg-amber-50 dark:bg-[#1f1500] border-amber-700/50 text-amber-900 dark:text-amber-100',
              t.type === 'info' && 'bg-card border-border text-foreground',
            )}
          >
            {t.type === 'success' && <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />}
            {t.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />}
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="text-muted-foreground hover:text-foreground transition-colors ml-1 mt-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
