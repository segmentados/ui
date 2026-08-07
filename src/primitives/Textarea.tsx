import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  /** Permitir redimensionar verticalmente (default true). */
  resize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error = false, helperText, resize = true, className, disabled, ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-foreground)]">{label}</label>}
      <textarea
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={cn(
          'w-full rounded-lg border bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]',
          'placeholder:text-[var(--muted-foreground)]',
          'transition-shadow outline-none focus:ring-2 focus:ring-[var(--ring)]',
          'disabled:cursor-not-allowed disabled:opacity-60',
          error ? 'border-[var(--error)]' : 'border-[var(--border-strong)]',
          !resize && 'resize-none',
          className,
        )}
        {...props}
      />
      {helperText && <span className={cn('text-xs', error ? 'text-[var(--error)]' : 'text-[var(--muted-foreground)]')}>{helperText}</span>}
    </div>
  );
});
