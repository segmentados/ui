import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
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
  { className, invalid, leftIcon, rightIcon, inputSize = 'md', disabled, ...props },
  ref,
) {
  const field = (
    <input
      ref={ref}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full rounded-lg border bg-[var(--surface)] text-[var(--foreground)]',
        'placeholder:text-[var(--muted-foreground)]',
        'transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--ring)]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        invalid ? 'border-[var(--error)]' : 'border-[var(--border-strong)]',
        SIZE[inputSize],
        leftIcon ? 'pl-9' : 'pl-3',
        rightIcon ? 'pr-9' : 'pr-3',
        className,
      )}
      {...props}
    />
  );
  if (!leftIcon && !rightIcon) return field;
  return (
    <div className="relative">
      {leftIcon && (
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
          {leftIcon}
        </span>
      )}
      {field}
      {rightIcon && (
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
          {rightIcon}
        </span>
      )}
    </div>
  );
});
