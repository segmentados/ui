import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  invalid?: boolean;
  placeholder?: string;
  selectSize?: 'sm' | 'md' | 'lg';
}

const SIZE = { sm: 'h-8 text-[13px]', md: 'h-9 text-sm', lg: 'h-11 text-[15px]' } as const;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, invalid, placeholder, selectSize = 'md', className, disabled, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full appearance-none rounded-lg border bg-[var(--surface)] pl-3 pr-9 text-[var(--foreground)]',
          'transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--ring)]',
          'disabled:cursor-not-allowed disabled:opacity-60',
          invalid ? 'border-[var(--error)]' : 'border-[var(--border-strong)]',
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
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
    </div>
  );
});
