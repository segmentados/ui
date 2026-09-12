import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

/**
 * Encabezado de pantalla: migas + título + bajada + acciones.
 *
 * Unifica el `PageHeader` de la suite, el `PlatformPageHeader` del app-kit, el `PageHead` de `MockKit` y
 * el `SetupHeader` del wizard de fuentes — cuatro encabezados con la misma estructura y cuatro tamaños
 * de titulo distintos (22, 24, 26 y 20), que es justo lo que hace que dos pantallas del mismo producto
 * se sientan de productos distintos.
 *
 * El titulo queda en 26px, que es el del CDP: es la medida de la identidad Data Cloud.
 */
export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Botones/acciones a la derecha. */
  actions?: ReactNode;
  /** Migas (ya renderizadas) sobre el título. El DS no arma rutas ni traduce. */
  breadcrumb?: ReactNode;
  /**
   * Deja que el título se corte en varias líneas en vez de truncarlo con puntos suspensivos.
   * Un nombre de recurso largo —el de una fuente, el de un segmento— truncado deja de identificar
   * al recurso, que es lo único que el título tenía que hacer.
   */
  wrapTitle?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  wrapTitle = false,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('mb-4 flex flex-wrap items-start justify-between gap-3', className)}>
      <div className="min-w-0 flex-1">
        {breadcrumb && (
          <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
            {breadcrumb}
          </p>
        )}
        <h1
          className={cn(
            'mt-1 text-[26px] font-semibold leading-tight tracking-[var(--tracking-heading)] text-[var(--foreground)]',
            !wrapTitle && 'truncate',
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
