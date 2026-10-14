import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

export type ButtonVariant = 'primary' | 'primary-outline' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'info' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';

/**
 * Eje de color (`tone`) y estilo de relleno (`appearance`): la matriz 2D de la app.
 *
 * El `variant` plano de arriba expresa la jerarquía semántica del DS (primary / danger / link…), y es la
 * API que usan las apps nuevas. Pero las pantallas de CRM/Perso/Company venían de un Button propio con una
 * matriz `appearance × tone` (4 estilos × 8 colores) que el `variant` plano no cubre: no hay tono `warning`,
 * `dark` ni `gray`, ni "texto teñido del color", ni "contorno del color". Para converger ESAS pantallas al
 * DS sin repintar ~160 botones, el Button acepta además este par opcional y reproduce la matriz 1:1.
 *
 * Es ADITIVO: si no pasás `appearance`/`tone`, el Button se comporta exactamente como antes (ruta `variant`).
 */
export type ButtonAppearance = 'contained' | 'outlined' | 'text' | 'ghost';
export type ButtonTone = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'dark' | 'gray';

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
  xl: 'h-14 px-8 text-[18px] gap-2 rounded-[var(--radius-pill)]',
  icon: 'h-9 w-9 p-0 rounded-[var(--radius-pill)]',
};

// ──────────────────────────────────────────────────────────────────────────────────────────────
// Matriz `appearance × tone` (compat app): portada 1:1 del Button propio de las apps.
//
// Las clases de abajo son IDÉNTICAS a las que emitía frontend-astro/src/shared/ui/react/Button.tsx,
// a propósito: hay pantallas con tests que pinean clases concretas (bg-[var(--primary)], text-white,
// rounded-pill, h-9, disabled:*…). Converger a este Button NO debe cambiar ni un nombre de clase, o esos
// tests —y el aspecto de ~160 botones que no puedo re-verificar a ojo— se rompen en silencio. Si algo de
// esta matriz hay que tocarlo, tocá también el pin del test; no son dos verdades.
// ──────────────────────────────────────────────────────────────────────────────────────────────

const APP_SIZE: Record<Exclude<ButtonSize, 'icon'>, string> = {
  xs: 'h-7 px-3 text-[11px]',
  sm: 'h-8 px-4 text-[12px]',
  md: 'h-9 px-5 text-[13px]',
  lg: 'h-11 px-6 text-[15px]',
  xl: 'h-14 px-8 text-[18px]',
};

const APP_TONE: Record<ButtonAppearance, Record<ButtonTone, string>> = {
  contained: {
    primary: 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white shadow-[var(--shadow-raised)]',
    secondary: 'bg-white border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--gray-light)] shadow-[var(--shadow-raised)]',
    success: 'bg-[var(--success)] hover:bg-[#059669] text-white shadow-[var(--shadow-raised)]',
    error: 'bg-[var(--error)] hover:bg-[#dc2626] text-white shadow-[var(--shadow-raised)]',
    warning: 'bg-[var(--warning)] hover:bg-[#d97706] text-white shadow-[var(--shadow-raised)]',
    info: 'bg-[var(--info)] hover:bg-[#2563eb] text-white shadow-[var(--shadow-raised)]',
    dark: 'bg-[var(--dark)] hover:bg-[var(--dark-light)] text-white shadow-[var(--shadow-raised)]',
    gray: 'bg-[var(--gray-light)] hover:bg-[var(--gray)] text-[var(--foreground)] shadow-[var(--shadow-raised)]',
  },
  outlined: {
    primary: 'bg-white border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--gray-light)]',
    secondary: 'bg-white border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--gray-light)]',
    success: 'border border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)]/10',
    error: 'border border-[var(--error)] text-[var(--error)] hover:bg-[var(--error)]/10',
    warning: 'border border-[var(--warning)] text-[var(--warning)] hover:bg-[var(--warning)]/10',
    info: 'border border-[var(--info)] text-[var(--info)] hover:bg-[var(--info)]/10',
    dark: 'border-[1.5px] border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]',
    gray: 'border border-[var(--border-strong)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]',
  },
  text: {
    primary: 'text-[var(--primary)] hover:bg-[var(--primary)]/10',
    secondary: 'text-[var(--secondary)] hover:bg-[var(--secondary)]/10',
    success: 'text-[var(--success)] hover:bg-[var(--success)]/10',
    error: 'text-[var(--error)] hover:bg-[var(--error)]/10',
    warning: 'text-[var(--warning)] hover:bg-[var(--warning)]/10',
    info: 'text-[var(--info)] hover:bg-[var(--info)]/10',
    dark: 'text-[var(--dark)] hover:bg-[var(--dark)]/10',
    gray: 'text-[var(--gray)] hover:bg-[var(--gray)]/10',
  },
  ghost: {
    primary: 'text-[var(--primary)] hover:bg-[var(--primary)]/5',
    secondary: 'text-[var(--secondary)] hover:bg-[var(--secondary)]/5',
    success: 'text-[var(--success)] hover:bg-[var(--success)]/5',
    error: 'text-[var(--error)] hover:bg-[var(--error)]/5',
    warning: 'text-[var(--warning)] hover:bg-[var(--warning)]/5',
    info: 'text-[var(--info)] hover:bg-[var(--info)]/5',
    dark: 'text-[var(--dark)] hover:bg-[var(--dark)]/5',
    gray: 'text-[var(--gray)] hover:bg-[var(--gray)]/5',
  },
};

/**
 * Clases de un botón de la matriz app (appearance×tone) SIN renderizarlo.
 *
 * Existe por lo mismo que su gemela en la app: un "Nuevo X" que navega tiene que ser un `<a>` de verdad
 * (pestaña nueva, click del medio, anunciado como enlace), y pintar el `<a>` con estas clases evita anidar
 * un `<button>` dentro de un `<a>`. El Button de abajo la usa internamente y también la exporta.
 */
export function appButtonClassName({
  appearance = 'contained',
  tone = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: {
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  size?: Exclude<ButtonSize, 'icon'>;
  fullWidth?: boolean;
  className?: string;
} = {}): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold tracking-[var(--tracking-tight)]',
    'transition-[background-color,box-shadow,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)]',
    'active:scale-[0.98] focus:outline-none focus-visible:shadow-[var(--shadow-focus)]',
    appearance === 'contained' && 'active:shadow-[var(--shadow-pressed)]',
    APP_SIZE[size],
    APP_TONE[appearance][tone],
    fullWidth && 'w-full',
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  /**
   * Matriz app (estilo de relleno). Si se pasa `appearance` o `tone`, el Button usa la matriz
   * `appearance × tone` en lugar de `variant`. Pensado para converger las pantallas de CRM/Perso/Company
   * que venían de un Button propio tipo MUI, sin cambiar su aspecto.
   */
  appearance?: ButtonAppearance;
  /** Matriz app (color). Default `primary`. */
  tone?: ButtonTone;
  /**
   * Si se pasa `href` (y el botón no está `disabled`/`loading`), se renderiza como `<a>` REAL —no un
   * `<button>` disfrazado— con las MISMAS clases. Así un "Nuevo X" que navega soporta pestaña nueva,
   * click del medio y se anuncia como enlace, sin anidar `<button>` dentro de `<a>`.
   */
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth,
    appearance,
    tone,
    href,
    target,
    rel,
    className,
    disabled,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  // La matriz app se activa en cuanto aparece cualquiera de sus dos ejes; si no, ruta `variant` clásica.
  const useMatrix = appearance !== undefined || tone !== undefined;
  const appSize = size === 'icon' ? 'md' : size; // la matriz app no tiene tamaño `icon`.

  // Clases "visuales" (sirven igual para <button> y <a>). Los `disabled:*` van aparte porque son pseudo de
  // control de formulario: en un <a> son inertes y sólo ensucian.
  const visual = useMatrix
    ? appButtonClassName({ appearance: appearance ?? 'contained', tone: tone ?? 'primary', size: appSize, fullWidth, className })
    : cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap font-medium',
        'transition-[background,color,box-shadow,filter] duration-150',
        // Apretado se HUNDE. Sin esto la pieza tiene volumen pero no responde al tacto: se ve en relieve
        // tanto en reposo como mientras la estás apretando.
        SOLIDOS.has(variant) && 'active:shadow-[var(--shadow-pressed)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)]',
        VARIANT[variant],
        SIZE[size],
        fullWidth && 'w-full',
        className,
      );

  const content = (
    <>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </>
  );

  // Enlace real cuando hay destino y la acción está habilitada. Un <a> no se "deshabilita": si está
  // disabled/loading caemos al <button> (que sí lo expresa) para no ofrecer un link muerto navegable.
  if (href !== undefined && !disabled && !loading) {
    return (
      <a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={visual}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        visual,
        useMatrix
          ? // Deshabilitado de la matriz app: pastilla apagada (no opacity), igual que el Button propio.
            cn(
              'disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100',
              'disabled:bg-[var(--gray-light)] disabled:text-[var(--gray)] disabled:border-transparent',
            )
          : 'disabled:pointer-events-none disabled:opacity-50',
      )}
      {...props}
    >
      {content}
    </button>
  );
});
