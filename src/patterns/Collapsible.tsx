import { useId, useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

export interface CollapsibleProps {
  title: ReactNode;
  /** A la derecha del título: un contador, una pastilla de estado, un botón. */
  aside?: ReactNode;
  children: ReactNode;
  /** Estado inicial cuando el componente se maneja solo. */
  defaultOpen?: boolean;
  /** Estado controlado. Con esto, `onOpenChange` es obligatorio para que se pueda cerrar. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Sección plegable.
 *
 * El cuerpo se DESMONTA al cerrarse en vez de ocultarse con CSS. Un panel oculto con `display:none`
 * sigue teniendo sus campos en el formulario y sus focos alcanzables con Tab, y ya pasó: se enviaban
 * valores de secciones que la persona creía cerradas.
 */
export function Collapsible({
  title,
  aside,
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
}: CollapsibleProps) {
  const [interno, setInterno] = useState(defaultOpen);
  const controlado = openProp !== undefined;
  const abierto = controlado ? openProp : interno;
  const id = useId();

  const alternar = () => {
    if (!controlado) setInterno((v) => !v);
    onOpenChange?.(!abierto);
  };

  return (
    <div className={cn('rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-card)]', className)}>
      <div className="flex items-center gap-2 px-5 py-4">
        <button
          type="button"
          onClick={alternar}
          aria-expanded={abierto}
          aria-controls={id}
          className="flex min-w-0 flex-1 items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-[var(--radius-sm)]"
        >
          <ChevronDown
            size={16}
            aria-hidden
            className={cn('shrink-0 transition-transform duration-[var(--dur)]', !abierto && '-rotate-90')}
            style={{ color: 'var(--text-muted)' }}
          />
          <span className="truncate text-[15px] font-semibold text-[var(--foreground)]">{title}</span>
        </button>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>

      {abierto && (
        <div id={id} className="border-t border-[var(--border)] px-5 py-4">
          {children}
        </div>
      )}
    </div>
  );
}

export interface AccordionItem {
  id: string;
  title: ReactNode;
  aside?: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Una sola sección abierta por vez. Por defecto se pueden abrir varias. */
  single?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

/** Varias secciones plegables. Con `single`, abrir una cierra la anterior. */
export function Accordion({ items, single = false, defaultOpenIds = [], className }: AccordionProps) {
  const [abiertos, setAbiertos] = useState<string[]>(defaultOpenIds);

  const alternar = (id: string, abrir: boolean) => {
    setAbiertos((prev) => {
      if (!abrir) return prev.filter((x) => x !== id);
      return single ? [id] : [...prev, id];
    });
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((it) => (
        <Collapsible
          key={it.id}
          title={it.title}
          aside={it.aside}
          open={abiertos.includes(it.id)}
          onOpenChange={(v) => alternar(it.id, v)}
        >
          {it.content}
        </Collapsible>
      ))}
    </div>
  );
}

export interface TreeNodeProps {
  label: ReactNode;
  /** Nivel de anidamiento, para la sangría. La raíz es 0. */
  depth?: number;
  /** Sin hijos se dibuja sin flecha: una flecha que no abre nada promete algo que no hay. */
  children?: ReactNode;
  defaultOpen?: boolean;
  aside?: ReactNode;
  onSelect?: () => void;
  selected?: boolean;
}

/** Un nodo de árbol (jerarquías de entidades, objetos de una fuente, campos anidados). */
export function TreeNode({
  label,
  depth = 0,
  children,
  defaultOpen = false,
  aside,
  onSelect,
  selected = false,
}: TreeNodeProps) {
  const [abierto, setAbierto] = useState(defaultOpen);
  const tieneHijos = Boolean(children);

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1.5 rounded-[var(--radius-md)] py-1.5 pr-2 text-[13px]',
          selected ? 'bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]' : 'hover:bg-[var(--surface-hover)]',
        )}
        style={{ paddingLeft: 8 + depth * 16 }}
      >
        {tieneHijos ? (
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-label={abierto ? 'Contraer' : 'Expandir'}
            className="shrink-0 rounded-[var(--radius-xs)] p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {abierto ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-[19px] shrink-0" aria-hidden />
        )}

        {onSelect ? (
          <button type="button" onClick={onSelect} className="min-w-0 flex-1 truncate text-left">
            {label}
          </button>
        ) : (
          <span className="min-w-0 flex-1 truncate">{label}</span>
        )}

        {aside}
      </div>

      {tieneHijos && abierto && <div>{children}</div>}
    </div>
  );
}
