import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface SelectableCardProps {
  selected: boolean;
  onSelect: () => void;
  /** Visual de arriba: ícono, logo o emoji del conector. */
  media?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  /** `tile` = columna centrada (grilla de conectores). `row` = fila (lista de opciones). */
  layout?: 'tile' | 'row';
  className?: string;
}

/**
 * La tarjeta que se elige.
 *
 * Es el mismo control repetido en nueve pantallas del CDP —conectores, tipo de objeto, frecuencia,
 * canales, reglas de identidad, modelo de datos— y siempre con la misma gramática: borde primario,
 * anillo suave y tilde arriba a la derecha cuando está elegida.
 *
 * Va como `<button aria-pressed>` y no como un `<div onClick>`: es un control de dos estados, así que
 * tiene que llegarle el foco con Tab, responder a Enter y Espacio, y anunciarse como presionado. Las
 * versiones a mano casi siempre eran divs, y con teclado no se podía elegir nada.
 */
export function SelectableCard({
  selected,
  onSelect,
  media,
  title,
  description,
  disabled = false,
  layout = 'tile',
  className,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'relative rounded-[var(--radius-xl)] border bg-[var(--surface-card)] p-5 text-left',
        'transition-[border-color,box-shadow] duration-[var(--dur)] ease-[var(--ease-out)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        layout === 'tile' ? 'flex h-full flex-col items-center gap-2 text-center' : 'flex w-full items-center gap-3',
        selected ? 'border-[var(--primary)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]',
        className,
      )}
      style={selected ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent)' } : undefined}
    >
      {selected && (
        <span
          aria-hidden
          className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: 'var(--primary)', color: 'var(--on-primary)' }}
        >
          <Check size={12} />
        </span>
      )}

      {media && <span className={cn('shrink-0', layout === 'tile' ? 'text-[28px] leading-none' : '')}>{media}</span>}

      <span className={cn('min-w-0', layout === 'row' && 'flex-1')}>
        <span className="block text-[13px] font-semibold text-[var(--foreground)]">{title}</span>
        {description && (
          <span className="mt-0.5 block text-[11px]" style={{ color: 'var(--text-muted)' }}>
            {description}
          </span>
        )}
      </span>
    </button>
  );
}
