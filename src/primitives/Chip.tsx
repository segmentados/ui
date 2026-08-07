import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant, SizeVariant } from './types';

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  color?: ColorVariant;
  size?: SizeVariant;
  /** `soft` = fondo tintado al 10% + texto en el color pleno; `filled` = relleno sólido. */
  variant?: 'filled' | 'outlined' | 'soft';
  onDelete?: () => void;
  icon?: ReactNode;
  deleteIcon?: ReactNode;
  clickable?: boolean;
}

const sizeClasses: Record<SizeVariant, string> = {
  xs: 'h-5 px-2 text-[10px]',
  sm: 'h-6 px-2.5 text-[11px]',
  md: 'h-7 px-3 text-[12px]',
  lg: 'h-9 px-4 text-sm',
  xl: 'h-11 px-5 text-base',
};

const colorClasses: Record<'filled' | 'outlined' | 'soft', Record<ColorVariant, string>> = {
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
    primary: 'border border-[var(--primary)] text-[var(--primary)] bg-transparent',
    secondary: 'border border-[var(--secondary)] text-[var(--secondary)] bg-transparent',
    success: 'border border-[var(--success)] text-[var(--success)] bg-transparent',
    error: 'border border-[var(--error)] text-[var(--error)] bg-transparent',
    warning: 'border border-[var(--warning)] text-[var(--warning)] bg-transparent',
    info: 'border border-[var(--info)] text-[var(--info)] bg-transparent',
    dark: 'border border-[var(--foreground)] text-[var(--foreground)] bg-transparent',
    gray: 'border border-[var(--border-strong)] text-[var(--muted-foreground)] bg-transparent',
  },
  soft: {
    primary: 'bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]',
    secondary: 'bg-[color-mix(in_srgb,var(--secondary)_12%,transparent)] text-[var(--secondary)]',
    success: 'bg-[color-mix(in_srgb,var(--success)_15%,transparent)] text-[var(--success)]',
    error: 'bg-[color-mix(in_srgb,var(--error)_15%,transparent)] text-[var(--error)]',
    warning: 'bg-[color-mix(in_srgb,var(--warning)_15%,transparent)] text-[var(--warning)]',
    info: 'bg-[color-mix(in_srgb,var(--info)_15%,transparent)] text-[var(--info)]',
    dark: 'bg-[var(--muted)] text-[var(--foreground)]',
    gray: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
  },
};

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { color = 'primary', size = 'md', variant = 'filled', onDelete, icon, deleteIcon, clickable = false, children, className, onClick, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      onClick={clickable ? onClick : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-150',
        sizeClasses[size],
        colorClasses[variant][color],
        clickable && 'cursor-pointer hover:opacity-80',
        className,
      )}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center hover:opacity-70 transition-opacity"
          aria-label="Quitar"
        >
          {deleteIcon || (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});
