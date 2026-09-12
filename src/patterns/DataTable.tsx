import { useMemo, useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { Pagination } from './Pagination';

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  title: ReactNode;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  /** Números de ancho fijo: importes, contadores, porcentajes. */
  numeric?: boolean;
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Clave estable por fila. Sin esto se usa el índice, que rompe el orden al reordenar. */
  rowKey?: (record: T, index: number) => string;
  density?: 'comfortable' | 'compact';
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  emptyText?: ReactNode;
  onRowClick?: (record: T, index: number) => void;
  /** Encabezado pegado al hacer scroll. Necesita que el contenedor tenga alto. */
  stickyHeader?: boolean;

  enableSorting?: boolean;
  initialSortKey?: string;
  initialSortDirection?: 'asc' | 'desc';

  /**
   * Paginación del lado del SERVIDOR: `data` es UNA página que ya vino del backend, así que la tabla
   * no vuelve a cortar y los controles disparan el fetch. Sin esto no pagina: la tabla muestra `data`.
   */
  serverPagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
  };

  className?: string;
}

/**
 * La tabla de datos de Data Cloud.
 *
 * ── Qué trae y qué no ────────────────────────────────────────────────────────────────────────────
 * Trae lo que es puramente visual: columnas, orden, densidad, filas clicables, encabezado pegado,
 * estados de carga y vacío, y paginación server-side.
 *
 * NO trae el filtrado por columna, la búsqueda global ni el agrupado que tiene la tabla del app-kit.
 * Esos tres están construidos sobre hooks de la app (`useTable`, `useFilters`, `useGroupBy`) y traerlos
 * significaría mudar también esos hooks y su modelo de estado. Es trabajo de la ola siguiente, junto
 * con los scaffolds; mientras tanto el consumidor filtra antes de pasar `data`, que es lo que ya hacen
 * casi todas las pantallas.
 *
 * El orden client-side ordena SÓLO lo que recibió. Con `serverPagination` eso es una página, así que
 * ahí el orden lo tiene que resolver el backend: ordenar 25 filas de 4.000 y llamarlo "ordenado" es
 * mentira, y por eso con paginación de servidor el encabezado no ordena solo.
 */
const PAD = {
  comfortable: 'px-4 py-3',
  compact: 'px-3 py-2',
} as const;

const ALIGN = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  density = 'comfortable',
  striped = false,
  hoverable = true,
  loading = false,
  emptyText = 'No hay datos para mostrar.',
  onRowClick,
  stickyHeader = false,
  enableSorting = true,
  initialSortKey,
  initialSortDirection = 'asc',
  serverPagination,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | undefined>(initialSortKey);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(initialSortDirection);

  // Con paginación de servidor el orden es del backend: ver el docblock.
  const ordenLocal = enableSorting && !serverPagination;

  const filas = useMemo(() => {
    if (!ordenLocal || !sortKey) return data;
    const copia = [...data];
    copia.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va === vb) return 0;
      // Los vacíos van siempre al final, ordene como ordene: si no, una columna con huecos
      // arranca con una pila de filas en blanco y parece que no cargó.
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      if (typeof va === 'number' && typeof vb === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      const sa = String(va);
      const sb = String(vb);
      return sortDir === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
    return copia;
  }, [data, ordenLocal, sortKey, sortDir]);

  const alternarOrden = (key: string) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDir('asc');
  };

  return (
    <div className={cn('w-full', className)}>
      {/* El scroll horizontal vive en el contenedor de la tabla y no en la página: una tabla ancha no
          tiene que hacer que se mueva toda la pantalla de costado. */}
      <div className="w-full overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--border)]">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className={cn('bg-[var(--surface-sunken)]', stickyHeader && 'sticky top-0 z-[1]')}>
              {columns.map((c) => {
                const ordenable = ordenLocal && c.sortable;
                const activa = sortKey === c.key;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    style={{ width: c.width }}
                    aria-sort={activa ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                    className={cn(
                      'border-b border-[var(--border)] font-semibold',
                      PAD[density],
                      ALIGN[c.align ?? 'left'],
                    )}
                  >
                    {ordenable ? (
                      <button
                        type="button"
                        onClick={() => alternarOrden(c.key)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-[var(--radius-sm)]',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
                          c.align === 'right' && 'flex-row-reverse',
                        )}
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {c.title}
                        {activa ? (
                          sortDir === 'asc' ? <ChevronUp size={13} aria-hidden /> : <ChevronDown size={13} aria-hidden />
                        ) : (
                          <ChevronsUpDown size={13} aria-hidden className="opacity-40" />
                        )}
                      </button>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>{c.title}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center" style={{ color: 'var(--text-muted)' }}>
                  Cargando…
                </td>
              </tr>
            ) : filas.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center" style={{ color: 'var(--text-muted)' }}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              filas.map((fila, i) => (
                <tr
                  key={rowKey ? rowKey(fila, i) : i}
                  onClick={onRowClick ? () => onRowClick(fila, i) : undefined}
                  className={cn(
                    'border-b border-[var(--border)] last:border-0 bg-[var(--surface-card)]',
                    striped && i % 2 === 1 && 'bg-[var(--surface-raised)]',
                    hoverable && 'hover:bg-[var(--surface-hover)]',
                    onRowClick && 'cursor-pointer',
                  )}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cn(PAD[density], ALIGN[c.align ?? 'left'], c.numeric && 'tabular-nums')}
                    >
                      {c.render ? c.render(fila[c.key], fila, i) : (fila[c.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {serverPagination && (
        <Pagination
          page={serverPagination.page}
          pageSize={serverPagination.pageSize}
          total={serverPagination.total}
          onPageChange={serverPagination.onPageChange}
          onPageSizeChange={serverPagination.onPageSizeChange}
        />
      )}
    </div>
  );
}
