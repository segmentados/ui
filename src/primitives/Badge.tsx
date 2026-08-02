import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
  primary: 'bg-[var(--primary)]/12 text-[var(--primary)]',
  success: 'bg-[var(--success)]/15 text-[var(--success)]',
  warning: 'bg-[var(--warning)]/15 text-[var(--warning)]',
  error: 'bg-[var(--error)]/15 text-[var(--error)]',
  info: 'bg-[var(--info)]/15 text-[var(--info)]',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

export function Badge({ tone = 'neutral', dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
        TONE[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
