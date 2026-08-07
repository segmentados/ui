import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant, AlertVariant } from './types';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  severity?: ColorVariant;
  onClose?: () => void;
  icon?: ReactNode;
}

const severityClasses: Record<AlertVariant, Record<ColorVariant, string>> = {
  filled: {
    primary: 'bg-[var(--primary)] text-[var(--on-primary)]',
    secondary: 'bg-[var(--secondary)] text-[var(--on-secondary)]',
    success: 'bg-[var(--success)] text-white',
    error: 'bg-[var(--error)] text-white',
    warning: 'bg-[var(--warning)] text-white',
    info: 'bg-[var(--info)] text-white',
    dark: 'bg-[var(--foreground)] text-[var(--background)]',
    gray: 'bg-[var(--muted)] text-[var(--foreground)]',
  },
  outlined: {
    primary: 'border border-[var(--primary)] text-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]',
    secondary: 'border border-[var(--secondary)] text-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_10%,transparent)]',
    success: 'border border-[var(--success)] text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)]',
    error: 'border border-[var(--error)] text-[var(--error)] bg-[color-mix(in_srgb,var(--error)_10%,transparent)]',
    warning: 'border border-[var(--warning)] text-[var(--warning)] bg-[color-mix(in_srgb,var(--warning)_10%,transparent)]',
    info: 'border border-[var(--info)] text-[var(--info)] bg-[color-mix(in_srgb,var(--info)_10%,transparent)]',
    dark: 'border border-[var(--foreground)] text-[var(--foreground)] bg-[var(--muted)]',
    gray: 'border border-[var(--border-strong)] text-[var(--muted-foreground)] bg-[var(--muted)]',
  },
  standard: {
    primary: 'bg-[color-mix(in_srgb,var(--primary)_15%,transparent)] text-[var(--primary)]',
    secondary: 'bg-[color-mix(in_srgb,var(--secondary)_15%,transparent)] text-[var(--secondary)]',
    success: 'bg-[color-mix(in_srgb,var(--success)_15%,transparent)] text-[var(--success)]',
    error: 'bg-[color-mix(in_srgb,var(--error)_15%,transparent)] text-[var(--error)]',
    warning: 'bg-[color-mix(in_srgb,var(--warning)_15%,transparent)] text-[var(--warning)]',
    info: 'bg-[color-mix(in_srgb,var(--info)_15%,transparent)] text-[var(--info)]',
    dark: 'bg-[var(--muted)] text-[var(--foreground)]',
    gray: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
  },
};

const defaultIcons: Partial<Record<ColorVariant, ReactNode>> = {
  success: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'standard', severity = 'info', onClose, icon, className, children, ...props },
  ref,
) {
  const showIcon = icon !== null;
  const displayIcon = icon || defaultIcons[severity] || null;
  return (
    <div ref={ref} role="alert" className={cn('flex items-start gap-3 rounded-lg p-4', severityClasses[variant][severity], className)} {...props}>
      {showIcon && displayIcon && <span className="flex-shrink-0">{displayIcon}</span>}
      <div className="flex-1">{children}</div>
      {onClose && (
        <button type="button" onClick={onClose} className="flex-shrink-0 transition-opacity hover:opacity-70" aria-label="Cerrar">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
});
