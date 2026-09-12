import type { ReactNode } from 'react';
import { cn } from '../utils/cn';
import { KeyValue, type KeyValueItem } from './KeyValue';

export interface WizardSummarySidebarProps {
  title?: ReactNode;
  items: KeyValueItem[];
  /** Nota al pie, dentro de la tarjeta: qué va a pasar, qué falta, qué se puede cambiar después. */
  footnote?: ReactNode;
  /** Los botones del paso (Volver / Continuar). Van FUERA de la tarjeta, al pie de la columna. */
  actions?: ReactNode;
  /** Contenido extra dentro de la tarjeta, bajo la lista (pastillas de lo elegido, avisos). */
  children?: ReactNode;
  className?: string;
}

/**
 * La columna derecha de un paso de asistente: qué llevo elegido hasta acá, y cómo sigo.
 *
 * El bloque estaba copiado en los seis pasos del alta de una fuente, siempre igual: una tarjeta con un
 * `<dl>` de etiqueta/valor, una nota tenue al pie y, debajo, los dos botones. Al copiarlo, cada paso se
 * fue quedando con su propio ancho y su propio espaciado.
 *
 * Los botones van fuera de la tarjeta a propósito: son la acción del PASO, no un dato del resumen, y
 * meterlos adentro los hacía leer como parte de lo elegido.
 */
export function WizardSummarySidebar({
  title = 'Resumen',
  items,
  footnote,
  actions,
  children,
  className,
}: WizardSummarySidebarProps) {
  return (
    <aside className={cn('flex flex-col gap-4', className)}>
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-card)] p-5">
        <h2 className="mb-3 text-[15px] font-semibold text-[var(--foreground)]">{title}</h2>

        <KeyValue items={items} cols={1} />

        {children && <div className="mt-3">{children}</div>}

        {footnote && (
          <p className="mt-4 text-[12px]" style={{ color: 'var(--text-muted)' }}>
            {footnote}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center justify-end gap-2">{actions}</div>}
    </aside>
  );
}
