import { forwardRef, useEffect, useRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant, SizeVariant } from './types';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  color?: ColorVariant;
  size?: SizeVariant;
  label?: string;
  /** Estado mixto: algunos hijos marcados y otros no. */
  indeterminate?: boolean;
}

const SIZE: Record<SizeVariant, string> = {
  xs: 'h-3 w-3', sm: 'h-4 w-4', md: 'h-[18px] w-[18px]', lg: 'h-5 w-5', xl: 'h-6 w-6',
};

const ACCENT: Record<ColorVariant, string> = {
  primary: 'accent-[var(--primary)]',
  secondary: 'accent-[var(--secondary)]',
  success: 'accent-[var(--success)]',
  error: 'accent-[var(--error)]',
  warning: 'accent-[var(--warning)]',
  info: 'accent-[var(--info)]',
  dark: 'accent-[var(--foreground)]',
  gray: 'accent-[var(--text-muted)]',
};

/**
 * Casilla de verificación.
 *
 * `indeterminate` NO es un atributo de HTML: sólo existe como propiedad del elemento, así que hay que
 * escribirlo por ref después de montar. Pasarlo como prop del JSX no hace nada — el checkbox se veía
 * vacío y un "seleccionar todo" con selección parcial mentía diciendo que no había nada marcado.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { color = 'primary', size = 'md', label, indeterminate = false, className, ...props },
  ref,
) {
  const interno = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (interno.current) interno.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const casilla = (
    <input
      ref={(node) => {
        interno.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }}
      type="checkbox"
      aria-checked={indeterminate ? 'mixed' : undefined}
      className={cn(
        'shrink-0 cursor-pointer rounded-[var(--radius-xs)] border-2 border-[var(--border-strong)]',
        'transition-[background,border-color] duration-[var(--dur-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        SIZE[size],
        ACCENT[color],
        className,
      )}
      {...props}
    />
  );

  if (!label) return casilla;

  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      {casilla}
      <span className="text-[13px] text-[var(--foreground)]">{label}</span>
    </label>
  );
});
