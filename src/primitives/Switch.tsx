import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant, SizeVariant } from './types';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  color?: ColorVariant;
  size?: SizeVariant;
  label?: string;
}

const SIZE: Record<SizeVariant, { caja: string; bola: string; corrido: string }> = {
  xs: { caja: 'h-4 w-7', bola: 'h-3 w-3', corrido: 'peer-checked:translate-x-3' },
  sm: { caja: 'h-5 w-9', bola: 'h-4 w-4', corrido: 'peer-checked:translate-x-4' },
  md: { caja: 'h-6 w-11', bola: 'h-5 w-5', corrido: 'peer-checked:translate-x-5' },
  lg: { caja: 'h-7 w-14', bola: 'h-6 w-6', corrido: 'peer-checked:translate-x-7' },
  xl: { caja: 'h-8 w-16', bola: 'h-7 w-7', corrido: 'peer-checked:translate-x-8' },
};

const ENCENDIDO: Record<ColorVariant, string> = {
  primary: 'peer-checked:bg-[var(--primary)]',
  secondary: 'peer-checked:bg-[var(--secondary)]',
  success: 'peer-checked:bg-[var(--success)]',
  error: 'peer-checked:bg-[var(--error)]',
  warning: 'peer-checked:bg-[var(--warning)]',
  info: 'peer-checked:bg-[var(--info)]',
  dark: 'peer-checked:bg-[var(--foreground)]',
  gray: 'peer-checked:bg-[var(--text-muted)]',
};

/**
 * Interruptor.
 *
 * La bola se mueve con `peer-checked` y no leyendo `checked` en JS: así el componente funciona igual
 * controlado que no controlado. Con la versión anterior, un switch sin `checked` (no controlado) nunca
 * se movía aunque el input sí cambiara de estado.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { color = 'primary', size = 'md', label, className, ...props },
  ref,
) {
  const s = SIZE[size];

  const control = (
    <span className="relative inline-flex shrink-0 items-center">
      <input ref={ref} type="checkbox" className={cn('peer sr-only', className)} {...props} />
      <span
        aria-hidden
        className={cn(
          'rounded-full bg-[var(--border-strong)] transition-colors duration-[var(--dur)]',
          // La pista HUNDIDA es la mitad del efecto: lo que hace que el pulgar se lea por encima es el
          // contraste con este hueco, no su propia sombra.
          'shadow-[var(--shadow-sunken)]',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--background)]',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          s.caja,
          ENCENDIDO[color],
        )}
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-0.5 rounded-full bg-[var(--on-primary)] shadow-[var(--shadow-raised)]',
          'transition-transform duration-[var(--dur)] ease-[var(--ease-out)]',
          s.bola,
          s.corrido,
        )}
      />
    </span>
  );

  if (!label) return control;

  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      {control}
      <span className="text-[13px] text-[var(--foreground)]">{label}</span>
    </label>
  );
});
