import { Check, ChevronsUpDown } from 'lucide-react';
import { Menu, MenuItem, MenuLabel, MenuSeparator } from '../primitives/Menu';

/**
 * Selector de contexto genérico del topbar (marca-agnóstico). Lo usan tanto el switcher de
 * WORKSPACES (BI) como el de ENTORNOS (resto de la suite): misma UI, distinto data source.
 * Pensado para vivir después en @segmentados/ui.
 */
export interface ContextOption {
  id: string;
  name: string;
  /** Segunda línea (ej. "12 miembros · admin" o "Producción"). */
  meta?: string;
  /** Color del punto/mark (ej. color de entorno). Default: acento primario. */
  color?: string;
}

interface ContextSwitcherProps {
  label: string;
  options: ContextOption[];
  currentId?: string;
  onSelect?: (id: string) => void;
  footer?: { label: string; onSelect?: () => void };
}

const tint = (c?: string) =>
  c ? `color-mix(in srgb, ${c} 16%, transparent)` : 'color-mix(in srgb, var(--primary) 16%, transparent)';

export function ContextSwitcher({ label, options, currentId, onSelect, footer }: ContextSwitcherProps) {
  const current = options.find((o) => o.id === currentId) ?? options[0];
  if (!current) return null;

  return (
    <Menu
      align="start"
      className="min-w-64"
      trigger={
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-hover)]"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold"
            style={{ background: tint(current.color), color: current.color ?? 'var(--primary)' }}
          >
            {current.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="max-w-40 truncate">{current.name}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
        </button>
      }
    >
      <MenuLabel>{label}</MenuLabel>
      {options.map((o) => (
        <MenuItem
          key={o.id}
          onSelect={() => onSelect?.(o.id)}
          icon={o.id === current.id ? <Check className="h-4 w-4 text-[var(--primary)]" /> : <span className="h-4 w-4" />}
        >
          <span className="flex flex-col">
            <span className="truncate">{o.name}</span>
            {o.meta && <span className="text-[11px] text-[var(--muted-foreground)]">{o.meta}</span>}
          </span>
        </MenuItem>
      ))}
      {footer && (
        <>
          <MenuSeparator />
          <MenuItem onSelect={footer.onSelect}>{footer.label}</MenuItem>
        </>
      )}
    </Menu>
  );
}
