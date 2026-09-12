import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  /** Alias de `invalid` (compat con el form-field del prototipo). */
  error?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

const SIZE = {
  sm: 'h-8 text-[13px]',
  md: 'h-9 text-sm',
  lg: 'h-11 text-[15px]',
} as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, error, label, helperText, leftIcon, rightIcon, inputSize = 'md', disabled, id, ...props },
  ref,
) {
  const isInvalid = invalid || error;
  const field = (
    <input
      ref={ref}
      id={id}
      disabled={disabled}
      aria-invalid={isInvalid || undefined}
      className={cn(
        'w-full rounded-[var(--radius-lg)] border bg-[var(--surface-input)] text-[var(--foreground)]',
        // Hueco: el campo se lee como algo que se LLENA, no como una superficie más. Es la contracara del
        // relieve de los botones — sin algo hundido, nada parece sobresalir.
        'shadow-[var(--shadow-well)]',
        'placeholder:text-[var(--muted-foreground)]',
        'transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--ring)]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        isInvalid ? 'border-[var(--error)]' : 'border-[var(--border-strong)]',
        SIZE[inputSize],
        leftIcon ? 'pl-9' : 'pl-3',
        rightIcon ? 'pr-9' : 'pr-3',
        className,
      )}
      {...props}
    />
  );

  const control =
    !leftIcon && !rightIcon ? (
      field
    ) : (
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{leftIcon}</span>
        )}
        {field}
        {rightIcon && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{rightIcon}</span>}
      </div>
    );

  // Sin label ni helper: comportamiento "pelado" (idéntico al anterior, no cambia consumidores existentes).
  if (label == null && helperText == null) return control;

  return (
    <div className="flex flex-col gap-1.5">
      {label != null && (
        <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--muted-foreground)]">
          {label}
        </label>
      )}
      {control}
      {helperText != null && <span className={cn('text-xs', isInvalid ? 'text-[var(--error)]' : 'text-[var(--muted-foreground)]')}>{helperText}</span>}
    </div>
  );
});
