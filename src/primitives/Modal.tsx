import { useEffect, useRef, type ReactNode, type HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

const WIDTH = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  '2xl': 'max-w-5xl',
  '3xl': 'max-w-6xl',
  '4xl': 'max-w-7xl',
  full: 'max-w-[95vw]',
} as const;

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: keyof typeof WIDTH;
  /** Oculta la X y el cierre por overlay/Escape (para flujos que exigen una acción). */
  dismissible?: boolean;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
}

/**
 * Dos modos: **props** (title/footer → chrome header/body/footer, estilo BI) y **composición**
 * (sin title/footer → panel "pelado" + X flotante; el contenido usa ModalHeader/ModalBody/ModalFooter).
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  dismissible = true,
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible && closeOnEscape) onCloseRef.current?.();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismissible, closeOnEscape]);

  if (!open || typeof document === 'undefined') return null;

  const chrome = title != null || footer != null;
  const canClose = dismissible && !!onClose;
  const closeButton = canClose && showCloseButton;

  return createPortal(
    <div className="fixed inset-0 z-[1500] flex items-start justify-center overflow-y-auto p-4 sm:items-center" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[var(--overlay)] backdrop-blur-[1px]" onClick={canClose && closeOnBackdrop ? onClose : undefined} aria-hidden />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'relative z-10 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl outline-none',
          'animate-[modalIn_.16s_ease-out]',
          WIDTH[size],
          className,
        )}
      >
        {chrome ? (
          <>
            {(title || closeButton) && (
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
                <div className="min-w-0">
                  {title && <h2 className="truncate text-base font-semibold text-[var(--foreground)]">{title}</h2>}
                  {description && <p className="mt-0.5 text-[13px] text-[var(--muted-foreground)]">{description}</p>}
                </div>
                {closeButton && (
                  <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-md p-1 text-[var(--muted-foreground)] hover:bg-[var(--surface-hover)]">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            <div className="px-5 py-4">{children}</div>
            {footer && <div className="flex justify-end gap-2 border-t border-[var(--border)] px-5 py-3">{footer}</div>}
          </>
        ) : (
          <>
            {closeButton && (
              <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 z-10 rounded-md p-1 text-[var(--muted-foreground)] hover:bg-[var(--surface-hover)]">
                <X className="h-4 w-4" />
              </button>
            )}
            {children}
          </>
        )}
      </div>
      <style>{`@keyframes modalIn{from{opacity:.4;transform:translateY(6px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </div>,
    document.body,
  );
}

// Subcomponentes para el modo composición (mismo chrome que el modo props).
export function ModalHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-b border-[var(--border)] px-5 py-4', className)} {...props} />;
}
export function ModalBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-4', className)} {...props} />;
}
export function ModalFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex justify-end gap-2 border-t border-[var(--border)] px-5 py-3', className)} {...props} />;
}
