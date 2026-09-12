import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padded?: boolean;
  /**
   * `outlined` (por defecto) = plana con borde. Es la tarjeta de Data Cloud: la jerarquía la da el
   * borde y el fondo blanco contra el menta, no una sombra.
   * `filled` = un paso más tenue, para bloques ANIDADOS dentro de otra tarjeta (un KPI adentro de un
   * panel), donde repetir el blanco borraría el anidamiento.
   * `elevated` = con sombra; queda para lo que flota de verdad.
   */
  variant?: 'outlined' | 'filled' | 'elevated';
}

const VARIANT: Record<NonNullable<CardProps['variant']>, string> = {
  outlined: 'bg-[var(--surface-card)] border border-[var(--border)]',
  filled: 'bg-[var(--surface-raised)] border border-[var(--border)]',
  elevated: 'bg-[var(--surface-card)] border border-[var(--border)] shadow-[var(--shadow-sm)]',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, interactive, padded = true, variant = 'outlined', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-xl)] transition-[box-shadow,border-color] duration-[var(--dur)] ease-[var(--ease-out)]',
        VARIANT[variant],
        padded && 'p-5',
        interactive && 'cursor-pointer hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-sm)]',
        className,
      )}
      {...props}
    />
  );
});

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 flex items-start justify-between gap-3', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-[15px] font-semibold text-[var(--foreground)]', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('mt-1 text-[12px] text-[var(--text-muted)]', className)} {...props} />;
}
