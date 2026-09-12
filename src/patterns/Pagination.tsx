import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  /** Etiquetas. El paquete no tiene i18n: las traduce el consumidor. */
  labels?: {
    previous?: string;
    next?: string;
    of?: string;
    perPage?: string;
    showing?: (desde: number, hasta: number, total: number) => string;
  };
  className?: string;
}

/**
 * Ventana de páginas alrededor de la actual, con elipsis.
 *
 * Se calcula en vez de pintar todas porque con 400 páginas la barra se vuelve más alta que la tabla.
 * Siempre se muestran la primera y la última: son las dos a las que la gente salta a mano.
 */
function ventana(page: number, totalPages: number): (number | 'gap')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginas: (number | 'gap')[] = [1];
  const desde = Math.max(2, page - 1);
  const hasta = Math.min(totalPages - 1, page + 1);

  if (desde > 2) paginas.push('gap');
  for (let p = desde; p <= hasta; p += 1) paginas.push(p);
  if (hasta < totalPages - 1) paginas.push('gap');

  paginas.push(totalPages);
  return paginas;
}

const BOTON =
  'inline-flex h-8 min-w-8 items-center justify-center rounded-[var(--radius-md)] px-2 text-[12px] font-medium ' +
  'transition-[background,color,border-color] duration-[var(--dur-fast)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

/**
 * Paginador.
 *
 * La versión del app-kit marcaba la página activa con una sombra violeta fija
 * (`rgba(89,46,242,.25)`), que venía del tema viejo y no cambiaba con la paleta: sobre el verde de Data
 * Cloud quedaba un halo de otro color. Acá la activa es relleno primario y nada más.
 */
export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  labels,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(pageSize, 1)));
  const actual = Math.min(Math.max(page, 1), totalPages);
  const desde = total === 0 ? 0 : (actual - 1) * pageSize + 1;
  const hasta = Math.min(actual * pageSize, total);

  const texto =
    labels?.showing?.(desde, hasta, total) ?? `${desde}–${hasta} de ${total}`;

  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3 pt-3', className)}>
      <p className="text-[12px] tabular-nums" style={{ color: 'var(--text-muted)' }}>
        {texto}
      </p>

      <div className="flex items-center gap-3">
        {onPageSizeChange && (
          <label className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-muted)' }}>
            {labels?.perPage ?? 'Por página'}
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-input)] px-2 text-[12px] text-[var(--foreground)]"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        )}

        <nav className="flex items-center gap-1" aria-label="Paginación">
          <button
            type="button"
            onClick={() => onPageChange(actual - 1)}
            disabled={actual <= 1}
            aria-label={labels?.previous ?? 'Anterior'}
            className={cn(BOTON, 'border border-[var(--border)] hover:bg-[var(--surface-hover)]')}
          >
            <ChevronLeft size={15} aria-hidden />
          </button>

          {ventana(actual, totalPages).map((p, i) =>
            p === 'gap' ? (
              <span key={`gap-${i}`} className="px-1 text-[12px]" style={{ color: 'var(--text-muted)' }} aria-hidden>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === actual ? 'page' : undefined}
                className={cn(
                  BOTON,
                  'tabular-nums',
                  p === actual
                    ? 'bg-[var(--primary)] text-[var(--on-primary)]'
                    : 'border border-[var(--border)] hover:bg-[var(--surface-hover)]',
                )}
              >
                {p}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(actual + 1)}
            disabled={actual >= totalPages}
            aria-label={labels?.next ?? 'Siguiente'}
            className={cn(BOTON, 'border border-[var(--border)] hover:bg-[var(--surface-hover)]')}
          >
            <ChevronRight size={15} aria-hidden />
          </button>
        </nav>
      </div>
    </div>
  );
}
