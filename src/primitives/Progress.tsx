import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant } from './types';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100. Se recorta al rango: un porcentaje calculado sobre un total 0 se va a Infinity. */
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: ColorVariant;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  /** Qué mide, para lectores de pantalla. Sin esto la barra es un dibujo sin nombre. */
  label?: string;
}

const SIZE = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3' } as const;

const RELLENO: Record<ColorVariant, string> = {
  primary: 'bg-[var(--primary)]',
  secondary: 'bg-[var(--secondary)]',
  success: 'bg-[var(--success)]',
  error: 'bg-[var(--error)]',
  warning: 'bg-[var(--warning)]',
  info: 'bg-[var(--info)]',
  dark: 'bg-[var(--foreground)]',
  gray: 'bg-[var(--text-muted)]',
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, variant = 'determinate', color = 'primary', size = 'md', showLabel = false, label, className, ...props },
  ref,
) {
  const pct = Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), 100);
  const indeterminado = variant === 'indeterminate';

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminado ? undefined : Math.round(pct)}
        aria-label={label}
        className={cn('w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]', SIZE[size])}
      >
        <div
          className={cn(
            'h-full rounded-full',
            RELLENO[color],
            indeterminado ? 'w-1/2 animate-pulse' : 'transition-[width] duration-[var(--dur)] ease-[var(--ease-out)]',
          )}
          style={indeterminado ? undefined : { width: `${pct}%` }}
        />
      </div>
      {showLabel && !indeterminado && (
        <span className="mt-1 block text-[11px] tabular-nums text-[var(--text-muted)]">{pct.toFixed(0)}%</span>
      )}
    </div>
  );
});
