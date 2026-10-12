import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

/**
 * Wrapper de campo de formulario: label en bloque (arriba del control) + `*` si es requerido + hint/error
 * opcional + cualquier `children` (input nativo, Select, radios, Combobox, etc.).
 *
 * NO reemplaza a `Input`/`Select` (que ya traen su label): esto envuelve controles arbitrarios. Extraído de
 * ~18 reimplementaciones inline en las apps (cada wizard/form definía su propio `function Field`).
 *
 * Variantes de label: `default` (12.5px semibold) y `caps` (chico en mayúsculas con tracking, para paneles
 * de propiedades).
 */
export interface FieldProps {
  label: ReactNode;
  required?: boolean;
  /** Texto de ayuda bajo el control. */
  hint?: ReactNode;
  /** Mensaje de error (reemplaza al hint, en color de error). */
  error?: ReactNode;
  htmlFor?: string;
  /** Ocupa toda la fila dentro de un grid (`grid-column: 1 / -1`). */
  span2?: boolean;
  variant?: 'default' | 'caps';
  className?: string;
  children: ReactNode;
}

export function Field({ label, required, hint, error, htmlFor, span2, variant = 'default', className, children }: FieldProps) {
  const caps = variant === 'caps';
  return (
    <div className={cn('flex flex-col', caps ? 'gap-1' : 'gap-1.5', span2 && 'col-[1_/_-1]', className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          caps
            ? 'text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-subtle)]'
            : 'text-[12.5px] font-semibold text-[var(--foreground)]',
        )}
      >
        {label}
        {required && <span className="text-[var(--error)]"> *</span>}
      </label>
      {children}
      {error ? (
        <span className="text-[11.5px] text-[var(--error)]">{error}</span>
      ) : hint ? (
        <span className="text-[11.5px] text-[var(--text-muted)]">{hint}</span>
      ) : null}
    </div>
  );
}
