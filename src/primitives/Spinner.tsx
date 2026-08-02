import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

const SIZE = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-8 w-8' } as const;

export function Spinner({
  size = 'md',
  className,
  label = 'Cargando',
}: {
  size?: keyof typeof SIZE;
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center">
      <Loader2 className={cn('animate-spin text-[var(--primary)]', SIZE[size], className)} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function PageLoader({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-3 text-[var(--muted-foreground)]">
      <Spinner size="lg" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
