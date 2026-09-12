import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

export interface ListItemRowProps {
  /** Visual de la izquierda: ícono, muestra de color, miniatura. */
  leading?: ReactNode;
  primary: ReactNode;
  secondary?: ReactNode;
  /** Controles de la derecha. */
  actions?: ReactNode;
  className?: string;
}

/**
 * Una fila de sub-recurso dentro de una tarjeta (colores de una marca, archivos, ajustes).
 *
 * No trae el botón de eliminar adentro, como hacía la versión del app-kit: una fila no sabe qué se
 * puede hacer con lo que muestra, y tenerlo cableado obligaba a pasar `onDelete` incluso en las listas
 * de sólo lectura. Lo que se puede hacer entra por `actions`.
 */
export function ListItemRow({ leading, primary, secondary, actions, className }: ListItemRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-card)] px-3.5 py-3',
        className,
      )}
    >
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[var(--foreground)]">{primary}</p>
        {secondary && (
          <p className="truncate text-[11px]" style={{ color: 'var(--text-muted)' }}>
            {secondary}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export interface NavigationCardProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  showArrow?: boolean;
  /**
   * Render del enlace. Por defecto un `<a href>`; en una SPA se pasa el `Link` del router. Mismo
   * contrato que `AppSidebar` y `WizardSteps` — el DS no depende de ningún router.
   */
  renderLink?: (p: { href: string; className: string; children: ReactNode }) => ReactNode;
  className?: string;
}

/**
 * Tarjeta de navegación: un destino con ícono, título y una línea de qué hay ahí.
 *
 * La versión del app-kit llevaba una sombra gris dura de 7px (`rgba(124,124,124,.75)`) que no salía de
 * ningún token y que en el fondo menta se veía sucia. Data Cloud es plano: el relieve lo da el borde,
 * que se marca al pasar el mouse.
 *
 * El `renderLink` existe porque la versión anterior importaba `useNavigate` de react-router y eso ataba
 * el design system al router de UNA de las apps.
 */
export function NavigationCard({
  title,
  description,
  icon,
  href,
  onClick,
  disabled = false,
  showArrow = true,
  renderLink,
  className,
}: NavigationCardProps) {
  const clase = cn(
    'group flex w-full items-start gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-card)] p-5 text-left',
    'transition-[border-color,box-shadow] duration-[var(--dur)] ease-[var(--ease-out)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    disabled
      ? 'cursor-not-allowed opacity-40'
      : 'hover:border-[var(--primary)] hover:shadow-[var(--shadow-sm)]',
    className,
  );

  const cuerpo = (
    <>
      {icon && (
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)]"
          style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)', color: 'var(--primary)' }}
        >
          {icon}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
          {title}
        </span>
        {description && (
          <span className="mt-1 block text-[12px]" style={{ color: 'var(--text-muted)' }}>
            {description}
          </span>
        )}
      </span>

      {!disabled && showArrow && (
        <ChevronRight
          size={18}
          aria-hidden
          className="mt-0.5 shrink-0 transition-transform duration-[var(--dur)] group-hover:translate-x-0.5"
          style={{ color: 'var(--text-muted)' }}
        />
      )}
    </>
  );

  if (href && !disabled) {
    if (renderLink) return <>{renderLink({ href, className: clase, children: cuerpo })}</>;
    return (
      <a href={href} className={clase}>
        {cuerpo}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={clase}>
      {cuerpo}
    </button>
  );
}
