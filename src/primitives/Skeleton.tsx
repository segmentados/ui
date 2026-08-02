import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

/** Placeholder de carga con shimmer. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[var(--muted)]', className)}
      aria-hidden
      {...props}
    />
  );
}
