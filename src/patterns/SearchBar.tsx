import { Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Etiqueta accesible del campo. Cae en el placeholder cuando no se pasa. */
  label?: string;
  /** Controles extra a la derecha (selects de filtro, botones). */
  children?: ReactNode;
  className?: string;
}

/**
 * Campo de búsqueda con la lupa adentro.
 *
 * Estaba escrito a mano en trece pantallas del CDP —siempre el mismo `<label>` con un `<Search/>`
 * absoluto y un `<input type="search">`— y cada copia tenía su propio alto, su propio padding y, en la
 * mitad, ningún nombre accesible.
 *
 * `type="search"` es a propósito: en la mayoría de los navegadores agrega la cruz para limpiar y hace
 * que Escape vacíe el campo, que es lo que la gente ya espera de una búsqueda.
 */
export function SearchBar({ value, onChange, placeholder = 'Buscar…', label, children, className }: SearchBarProps) {
  const campo = (
    <label className="relative block min-w-0 flex-1">
      <Search
        size={15}
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--text-muted)' }}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        className={cn(
          'h-10 w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-input)]',
          'pl-9 pr-3 text-[13px] text-[var(--foreground)]',
          'focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:shadow-[var(--shadow-focus)]',
        )}
      />
    </label>
  );

  if (!children) return <div className={className}>{campo}</div>;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {campo}
      {children}
    </div>
  );
}

export interface FilterBarProps {
  children: ReactNode;
  /** Dentro de una tarjeta (por defecto) o suelto sobre el fondo. */
  card?: boolean;
  className?: string;
}

/**
 * La fila de filtros sobre un listado.
 *
 * `items-end` y no `items-center`: los controles de filtro tienen etiqueta arriba y otros no, así que
 * alinearlos por el centro deja los campos a distinta altura.
 */
export function FilterBar({ children, card = true, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        'mb-4 flex flex-wrap items-end gap-3',
        card && 'rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-card)] p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
