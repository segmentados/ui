import { Check, Globe } from 'lucide-react';
import { Menu, MenuItem, MenuLabel } from '../primitives/Menu';

/**
 * Menú de idioma genérico (marca-agnóstico). El estado lo maneja la app host (value/onChange);
 * el DS solo pinta el control. Package-ready para @segmentados/ui.
 */
export interface LanguageOption {
  id: string;
  label: string;
}

interface LanguageMenuProps {
  value: string;
  options: LanguageOption[];
  onChange: (id: string) => void;
  label?: string;
}

export function LanguageMenu({ value, options, onChange, label = 'Idioma' }: LanguageMenuProps) {
  return (
    <Menu
      align="end"
      trigger={
        <button
          type="button"
          aria-label="Cambiar idioma"
          className="rounded-lg p-2 text-[var(--muted-foreground)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
        >
          <Globe className="h-[18px] w-[18px]" />
        </button>
      }
    >
      <MenuLabel>{label}</MenuLabel>
      {options.map((o) => (
        <MenuItem
          key={o.id}
          onSelect={() => onChange(o.id)}
          icon={value === o.id ? <Check className="h-4 w-4 text-[var(--primary)]" /> : <span className="h-4 w-4" />}
        >
          {o.label}
        </MenuItem>
      ))}
    </Menu>
  );
}
