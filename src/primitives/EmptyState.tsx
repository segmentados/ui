import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface EmptyStateProps {
  icon?: ReactNode;
  /**
   * Acepta nodos, no sólo texto, porque muchos mensajes de "no se encontró" llevan interpolación
   * (`No se pudo cargar: {error}`). Ensanchar el tipo es compatible hacia atrás —un string ES un
   * ReactNode— y evita que esos casos tengan que volver a dibujar la caja a mano.
   */
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
  /**
   * Para cuando el vacío es el CONTENIDO de una tarjeta y no un bloque de página.
   *
   * El empty-state de página es una tarjeta: borde punteado, fondo de superficie y relieve. Puesto
   * adentro de un panel con título queda una tarjeta dentro de otra, que se lee como un error de
   * maquetado. Con `inline` se usa el MISMO componente —mismo ícono, misma tipografía, mismo
   * espaciado— sin el marco.
   *
   * Existe para que el caso "vacío adentro de una tarjeta" no obligue a escribir un `<p>` centrado y
   * apagado a mano: de ahí salieron las cuatro variantes distintas que había que unificar.
   */
  inline?: boolean;
}

/**
 * Estado vacío: ícono + título + descripción + acción.
 *
 * Es una **tarjeta flotante**, no texto suelto: fondo de superficie (`--surface-card`) y relieve
 * (`--shadow-float`) sobre el borde punteado. La razón es que un vacío ocupa el lugar del contenido —
 * una tabla, una grilla de tarjetas— y si se dibuja sólo con un borde tenue se lee como si la pantalla
 * se hubiera cortado a medio cargar. Con fondo y altura se lee como un bloque deliberado que dice
 * "acá no hay nada todavía".
 */
export function EmptyState({ icon, title, description, action, className, inline = false }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-center',
        inline
          ? 'px-4 py-8'
          : 'rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[var(--surface-card)] px-6 py-12 shadow-[var(--shadow-float)]',
        className,
      )}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
        {description && <p className="mx-auto mt-1 max-w-sm text-[13px] text-[var(--muted-foreground)]">{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
