import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

export type ButtonVariant = 'primary' | 'primary-outline' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'info' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

/**
 * El hover de un relleno sólido se oscurece MEZCLANDO con el texto de la página, no con `brightness`.
 *
 * `brightness-95` es un filtro: apaga todo el botón —ícono, spinner, foco— y en un tema oscuro aclara
 * en vez de oscurecer, porque no sabe nada del fondo. La mezcla contra `--foreground` va en la dirección
 * correcta en los dos temas y sólo toca el fondo.
 */
const hoverSolido = (token: string) => `hover:bg-[color-mix(in_srgb,var(${token})_88%,var(--foreground))]`;

/**
 * `outline`, `ghost` y `link` quedan PLANOS a propósito.
 *
 * El relieve es lo que distingue la acción principal de una pantalla de las secundarias. Dárselo a todas lo
 * anula: una barra de herramientas con seis botones en relieve se lee como una pila de fichas y deja de
 * decir cuál hay que apretar.
 */
const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-dark)] shadow-[var(--shadow-raised)]',
  // Blanco, borde y letra verdes, EN RELIEVE 3D. Acción principal "suave": el mismo volumen que `primary`
  // (shadow-raised + se hunde al apretar, por estar en SOLIDOS) pero sobre superficie blanca con la marca en
  // el borde y el texto. Fondo por token (surface-card = blanco en claro); hover tiñe apenas de verde sin
  // perder el blanco. Distinta de `outline` (que es plana y neutra).
  'primary-outline':
    'border border-[var(--primary)] bg-[var(--surface-card)] text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--surface-card))] shadow-[var(--shadow-raised)]',
  secondary:
    `bg-[var(--secondary)] text-[var(--on-secondary)] ${hoverSolido('--secondary')} shadow-[var(--shadow-raised)]`,
  outline:
    'border border-[var(--border-strong)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-hover)]',
  ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-hover)]',
  danger: `bg-[var(--error)] text-[var(--on-primary)] ${hoverSolido('--error')} shadow-[var(--shadow-raised)]`,
  success: `bg-[var(--success)] text-[var(--on-primary)] ${hoverSolido('--success')} shadow-[var(--shadow-raised)]`,
  info: `bg-[var(--info)] text-[var(--on-primary)] ${hoverSolido('--info')} shadow-[var(--shadow-raised)]`,
  link: 'bg-transparent text-[var(--primary)] underline-offset-4 hover:underline px-0',
};

/** Las variantes con fondo propio: las únicas que pueden estar en relieve y hundirse al apretarlas. */
const SOLIDOS = new Set<ButtonVariant>(['primary', 'primary-outline', 'secondary', 'danger', 'success', 'info']);

/** Densidad Data Cloud: los botones de app son compactos (13px en `md`), no tipografía de landing. */
const SIZE: Record<ButtonSize, string> = {
  xs: 'h-7 px-3 text-[11px] gap-1.5 rounded-[var(--radius-pill)]',
  sm: 'h-8 px-4 text-[12px] gap-1.5 rounded-[var(--radius-pill)]',
  md: 'h-9 px-5 text-[13px] gap-2 rounded-[var(--radius-pill)]',
  lg: 'h-11 px-6 text-[15px] gap-2 rounded-[var(--radius-pill)]',
  icon: 'h-9 w-9 p-0 rounded-[var(--radius-pill)]',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth,
    className,
    disabled,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap font-medium',
        'transition-[background,color,box-shadow,filter] duration-150',
        // Apretado se HUNDE. Sin esto la pieza tiene volumen pero no responde al tacto: se ve en relieve
        // tanto en reposo como mientras la estás apretando.
        SOLIDOS.has(variant) && 'active:shadow-[var(--shadow-pressed)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)]',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANT[variant],
        SIZE[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
});
