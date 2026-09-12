import type { ReactNode } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant } from '../primitives/types';

export type StatSize = 'sm' | 'md' | 'lg';

export interface StatCardProps {
  label: string;
  value: ReactNode;
  /** Texto chico bajo el valor. */
  hint?: string;
  icon?: ReactNode;
  tone?: ColorVariant;
  /** Variación ya formateada ("+12,1%"). Se pinta en verde o rojo según `deltaPositive`. */
  delta?: string;
  deltaPositive?: boolean;
  size?: StatSize;
  className?: string;
}

/**
 * La tarjeta de KPI de Data Cloud.
 *
 * Había tres variantes dando vueltas: la de `MockKit` (ícono redondo a la izquierda, valor a la
 * derecha), la de `SourceWizardShell` (ícono cuadrado, más compacta) y la del app-kit (label arriba,
 * punto de color, valor grande). Son la misma tarjeta con tres densidades, así que acá es UNA con
 * `size` —que es la diferencia real— en vez de tres componentes que se van separando solos.
 *
 * El valor va en `tabular-nums`: un KPI que se actualiza cambia de ancho a cada dígito si no.
 */
const SIZES: Record<StatSize, { caja: string; icono: string; valor: string; label: string }> = {
  sm: { caja: 'gap-2.5 p-3.5', icono: 'h-9 w-9', valor: 'text-[16px]', label: 'text-[11px]' },
  md: { caja: 'gap-3 p-4', icono: 'h-11 w-11', valor: 'text-[20px]', label: 'text-[12px]' },
  lg: { caja: 'gap-3.5 p-5', icono: 'h-12 w-12', valor: 'text-[26px]', label: 'text-[13px]' },
};

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = 'primary',
  delta,
  deltaPositive = true,
  size = 'md',
  className,
}: StatCardProps) {
  const s = SIZES[size];
  const color = `var(--${tone})`;

  return (
    <div
      className={cn(
        'flex flex-1 items-center rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-card)]',
        'transition-colors duration-[var(--dur)] hover:border-[var(--border-strong)]',
        s.caja,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('flex shrink-0 items-center justify-center rounded-[var(--radius-lg)]', s.icono)}
        style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
      >
        {/* Sin ícono queda un punto del color de la serie: la tarjeta sigue diciendo de qué habla. */}
        {icon ?? <span className="h-2 w-2 rounded-full" style={{ background: color }} />}
      </span>

      <div className="min-w-0">
        <p className={cn('truncate', s.label)} style={{ color: 'var(--text-muted)' }}>
          {label}
        </p>
        <p className={cn('font-semibold leading-tight tabular-nums text-[var(--foreground)]', s.valor)}>{value}</p>

        {delta && (
          <span
            className="mt-1 inline-block rounded-[var(--radius-pill)] px-2 py-0.5 text-[11px] font-semibold"
            style={{
              color: deltaPositive ? 'var(--success)' : 'var(--error)',
              background: `color-mix(in srgb, var(--${deltaPositive ? 'success' : 'error'}) 12%, transparent)`,
            }}
          >
            {delta}
          </span>
        )}

        {hint && (
          <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

export interface StatGridProps {
  stats: StatCardProps[];
  /** Columnas en el breakpoint grande. Por defecto, la cantidad de stats topeada en 4. */
  cols?: 2 | 3 | 4;
  size?: StatSize;
  className?: string;
}

const COLS: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

/** La fila de KPIs de una pantalla. Reemplaza el grid repetido a mano en cada listado. */
export function StatGrid({ stats, cols, size, className }: StatGridProps) {
  if (stats.length === 0) return null;
  const n = (cols ?? Math.min(Math.max(stats.length, 2), 4)) as 2 | 3 | 4;
  return (
    <div className={cn('grid gap-4', COLS[n], className)}>
      {stats.map((s, i) => (
        <StatCard key={`${s.label}-${i}`} size={size} {...s} />
      ))}
    </div>
  );
}
