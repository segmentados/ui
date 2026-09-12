import { forwardRef, type HTMLAttributes, type JSX, type ElementType } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant } from './types';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'subtitle1'
    | 'subtitle2'
    | 'overline';
  component?: keyof JSX.IntrinsicElements;
  color?: ColorVariant | 'inherit' | 'textPrimary' | 'textSecondary' | 'textSubtle';
  align?: 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  /**
   * Números de ancho fijo. Va explícito y no automático por variante porque lo que lo necesita es el
   * CONTENIDO, no el tamaño: un KPI que se actualiza o una columna de importes saltan de ancho a cada
   * cambio de dígito si cada cifra mide distinto.
   */
  numeric?: boolean;
}

/**
 * Escala Data Cloud: 10 → 26px, no la escala de landing (que llegaba a 60).
 *
 * Una pantalla de datos es densa: el título de una pantalla es 26 y el cuerpo 13. Con `text-6xl` un h1
 * ocupaba un tercio del alto útil y empujaba la tabla —que es lo que la persona vino a mirar— abajo del
 * pliegue. El `tracking` ajustado en los títulos es lo que evita que a 26px se vean sueltos.
 */
const variantClasses: Record<NonNullable<TypographyProps['variant']>, string> = {
  h1: 'text-[26px] font-semibold leading-tight tracking-[var(--tracking-heading)]',
  h2: 'text-[22px] font-semibold leading-tight tracking-[var(--tracking-heading)]',
  h3: 'text-[20px] font-semibold leading-tight tracking-[var(--tracking-tighter)]',
  h4: 'text-[18px] font-semibold tracking-[var(--tracking-tight)]',
  h5: 'text-[16px] font-semibold',
  h6: 'text-[15px] font-semibold',
  subtitle1: 'text-[15px] font-medium',
  subtitle2: 'text-[13px] font-medium',
  body1: 'text-[13px]',
  body2: 'text-[12px]',
  caption: 'text-[11px]',
  overline: 'text-[10px] uppercase tracking-wider font-semibold',
};

const variantMapping: Record<NonNullable<TypographyProps['variant']>, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

// Tokens del DS: los alias del prototipo (textPrimary/Secondary/Subtle, dark, gray) se mapean al
// vocabulario del design system para ser portables entre apps de la suite.
const colorClasses: Record<NonNullable<TypographyProps['color']>, string> = {
  primary: 'text-[var(--primary)]',
  secondary: 'text-[var(--secondary)]',
  success: 'text-[var(--success)]',
  error: 'text-[var(--error)]',
  warning: 'text-[var(--warning)]',
  info: 'text-[var(--info)]',
  dark: 'text-[var(--foreground)]',
  gray: 'text-[var(--text-muted)]',
  inherit: '',
  textPrimary: 'text-[var(--foreground)]',
  textSecondary: 'text-[var(--muted-foreground)]',
  textSubtle: 'text-[var(--text-subtle)]',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    variant = 'body1',
    component,
    color = 'textPrimary',
    align = 'left',
    gutterBottom = false,
    noWrap = false,
    numeric = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const Component = (component || variantMapping[variant] || 'span') as ElementType;
  return (
    <Component
      ref={ref}
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        gutterBottom && 'mb-2',
        noWrap && 'truncate',
        numeric && 'tabular-nums',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
