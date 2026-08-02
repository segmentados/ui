import { useId, useState, type ReactNode } from 'react';
import { cn } from '../utils/cn';

type Side = 'top' | 'bottom' | 'left' | 'right';

const SIDE: Record<Side, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
};

export interface TooltipProps {
  content: ReactNode;
  side?: Side;
  children: ReactNode;
  className?: string;
}

/** Tooltip accesible por hover y foco (CSS-only positioning, sin dependencias). */
export function Tooltip({ content, side = 'top', children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  if (content == null || content === '') return <>{children}</>;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
      aria-describedby={open ? id : undefined}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          id={id}
          className={cn(
            'pointer-events-none absolute z-[1700] whitespace-nowrap rounded-md bg-[var(--dark)] px-2 py-1 text-xs font-medium text-white shadow-lg',
            SIDE[side],
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
