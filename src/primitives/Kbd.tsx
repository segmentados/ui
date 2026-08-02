import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

/** Tecla o combinación (⌘K). Cada hijo string se renderiza como una tecla. */
export function Kbd({ keys, className, ...props }: { keys: string[] } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)} {...props}>
      {keys.map((k, i) => (
        <kbd
          key={i}
          className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-[var(--border-strong)] bg-[var(--muted)] px-1 text-[11px] font-medium text-[var(--muted-foreground)]"
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}

/** ⌘ en Mac, Ctrl en el resto (para leyendas de atajos). */
export const modKey = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl';
