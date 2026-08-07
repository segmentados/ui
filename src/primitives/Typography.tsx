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
}

const variantClasses: Record<NonNullable<TypographyProps['variant']>, string> = {
  h1: 'text-6xl font-bold',
  h2: 'text-5xl font-bold',
  h3: 'text-4xl font-semibold',
  h4: 'text-3xl font-semibold',
  h5: 'text-2xl font-medium',
  h6: 'text-xl font-medium',
  subtitle1: 'text-lg font-medium',
  subtitle2: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wider',
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
  gray: 'text-[var(--muted-foreground)]',
  inherit: '',
  textPrimary: 'text-[var(--foreground)]',
  textSecondary: 'text-[var(--muted-foreground)]',
  textSubtle: 'text-[var(--muted-foreground)]',
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
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
