import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getPortalHost } from '../theme/portalHost';
import { CheckCircle2, Info, TriangleAlert, XCircle, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useToastStore, type Toast, type ToastTone } from './toastStore';

const ICON: Record<ToastTone, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: XCircle,
};

const ACCENT: Record<ToastTone, string> = {
  info: 'text-[var(--info)]',
  success: 'text-[var(--success)]',
  warning: 'text-[var(--warning)]',
  error: 'text-[var(--error)]',
};

function ToastCard({ toast }: { toast: Toast }) {
  const dismiss = useToastStore((s) => s.dismiss);
  const Icon = ICON[toast.tone];

  useEffect(() => {
    if (toast.duration <= 0) return;
    const t = setTimeout(() => dismiss(toast.id), toast.duration);
    return () => clearTimeout(t);
  }, [toast.id, toast.duration, dismiss]);

  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto flex w-80 items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-card)] p-3 shadow-[var(--shadow-lg)]',
        'animate-[toastIn_.18s_ease-out]',
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', ACCENT[toast.tone])} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--foreground)]">{toast.title}</p>
        {toast.description && <p className="mt-0.5 text-[13px] text-[var(--muted-foreground)]">{toast.description}</p>}
      </div>
      <button
        type="button"
        aria-label="Cerrar notificación"
        onClick={() => dismiss(toast.id)}
        className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--surface-hover)]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Contenedor global de toasts. Montar una vez cerca de la raíz. */
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className="pointer-events-none fixed bottom-4 right-4 z-[1600] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} />
      ))}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:none}}`}</style>
    </div>,
    getPortalHost() ?? document.body,
  );
}
