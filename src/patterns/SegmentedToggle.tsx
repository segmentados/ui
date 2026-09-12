import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedToggleProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  /** Qué elige el grupo, para lectores de pantalla ("Modo de vista", "Rango"). */
  label?: string;
  className?: string;
}

const SIZE = {
  sm: 'h-7 px-2.5 text-[11px]',
  md: 'h-8 px-3 text-[12px]',
} as const;

/**
 * Selector de pocas opciones excluyentes: vista tabla/tarjetas, rango 7/30/90 días, día/semana/mes.
 *
 * Es un `radiogroup` y no una fila de botones sueltos. La diferencia se nota con teclado: en un grupo
 * de radios las flechas mueven la selección y Tab salta el grupo entero, mientras que con botones hay
 * que tabular por cada opción. Con tres o cuatro opciones da igual; con las ocho de un rango de fechas,
 * no.
 */
export function SegmentedToggle<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  label,
  className,
}: SegmentedToggleProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-sunken)] p-0.5',
        fullWidth && 'flex w-full',
        className,
      )}
    >
      {options.map((o) => {
        const activo = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={activo}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] font-medium',
              'transition-[background,color] duration-[var(--dur-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              SIZE[size],
              fullWidth && 'flex-1',
              activo
                ? 'bg-[var(--surface-card)] text-[var(--foreground)] shadow-[var(--shadow-xs)]'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]',
            )}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
