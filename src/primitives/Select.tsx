import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Opciones declarativas. Alternativamente se pueden pasar `<option>` como children. */
  options?: SelectOption[];
  invalid?: boolean;
  /** Alias de `invalid` (compat form-field del prototipo). */
  error?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  placeholder?: string;
  selectSize?: 'sm' | 'md' | 'lg';
}

const SIZE = { sm: 'h-8 text-[13px]', md: 'h-9 text-sm', lg: 'h-11 text-[15px]' } as const;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, invalid, error, label, helperText, placeholder, selectSize = 'md', className, disabled, id, children, ...props },
  ref,
) {
  const isInvalid = invalid || error;
  const control = (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        disabled={disabled}
        aria-invalid={isInvalid || undefined}
        className={cn(
          'w-full appearance-none rounded-lg border bg-[var(--surface)] pl-3 pr-9 text-[var(--foreground)]',
          'transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--ring)]',
          'disabled:cursor-not-allowed disabled:opacity-60',
          isInvalid ? 'border-[var(--error)]' : 'border-[var(--border-strong)]',
          SIZE[selectSize],
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
    </div>
  );

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
