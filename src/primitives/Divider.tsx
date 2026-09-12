import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Texto al medio (o al costado según `align`). */
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
}

/**
 * Separador. Usa `--divider`, que es el foreground al 12%: un borde gris fijo se ve sucio sobre el
 * fondo menta y desaparece sobre el navy.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', align = 'center', children, className, ...props },
  ref,
) {
  const linea = orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full';

  if (!children) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(linea, 'bg-[var(--divider)]', className)}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      role="separator"
      className={cn('flex items-center gap-3', orientation === 'vertical' && 'flex-col', className)}
      {...props}
    >
      {align !== 'left' && <span className={cn('flex-1 bg-[var(--divider)]', orientation === 'horizontal' ? 'h-px' : 'w-px')} />}
      <span className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{children}</span>
      {align !== 'right' && <span className={cn('flex-1 bg-[var(--divider)]', orientation === 'horizontal' ? 'h-px' : 'w-px')} />}
    </div>
  );
});
