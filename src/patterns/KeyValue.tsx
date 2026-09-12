import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface KeyValueItem {
  label: ReactNode;
  value: ReactNode;
  /** Ocupa el ancho completo de la grilla (una descripción larga, una URL). */
  wide?: boolean;
}

export interface KeyValueProps {
  items: KeyValueItem[];
  /** Columnas en el breakpoint grande. 1 para el panel lateral de un wizard. */
  cols?: 1 | 2 | 3;
  /** Qué mostrar cuando un valor viene vacío. */
  emptyText?: string;
  className?: string;
}

const COLS: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
};

/** Un valor vacío se muestra como raya y no como hueco: un campo en blanco parece un error de carga. */
function valorOEmpty(value: ReactNode, emptyText: string): ReactNode {
  if (value === null || value === undefined || value === '') return emptyText;
  return value;
}

/**
 * Lista de etiqueta/valor — la ficha de datos de un registro.
 *
 * Es el `FieldGrid` del CRM promovido a la librería: el mismo `<dl>` con label de 12px tenue y valor de
 * 13px estaba reescrito en las fichas de detalle, en los paneles de resumen de los wizards y en los
 * bloques de configuración.
 *
 * Va en `<dl>/<dt>/<dd>` de verdad y no en divs: es una lista de descripciones, y marcarla como tal es
 * lo que permite a un lector de pantalla decir qué valor corresponde a qué etiqueta.
 */
export function KeyValue({ items, cols = 2, emptyText = '—', className }: KeyValueProps) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-3.5', COLS[cols], className)}>
      {items.map((it, i) => (
        <div key={i} className={cn('min-w-0', it.wide && 'sm:col-span-2 lg:col-span-3')}>
          <dt className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
            {it.label}
          </dt>
          <dd className="mt-0.5 text-[13px] font-medium text-[var(--foreground)]">
            {valorOEmpty(it.value, emptyText)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
