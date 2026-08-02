import { cloneElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { cn } from '../utils/cn';

type Align = 'start' | 'end';

export interface MenuProps {
  /** Elemento disparador; se le inyectan onClick/aria. */
  trigger: ReactElement<{ onClick?: (e: React.MouseEvent) => void; 'aria-haspopup'?: string; 'aria-expanded'?: boolean }>;
  children: ReactNode;
  align?: Align;
  className?: string;
}

/** Menú contextual accesible: click-outside, Escape, foco por teclado básico. */
export function Menu({ trigger, children, align = 'end', className }: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const triggerEl = cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      trigger.props.onClick?.(e);
      setOpen((o) => !o);
    },
    'aria-haspopup': 'menu',
    'aria-expanded': open,
  });

  return (
    <div ref={rootRef} className="relative inline-block">
      {triggerEl}
      {open && (
        <div
          role="menu"
          id={id}
          onClick={() => setOpen(false)}
          className={cn(
            'absolute z-[1400] mt-1 min-w-48 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-xl',
            'animate-[menuIn_.12s_ease-out]',
            align === 'end' ? 'right-0' : 'left-0',
            className,
          )}
        >
          {children}
          <style>{`@keyframes menuIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}`}</style>
        </div>
      )}
    </div>
  );
}

export interface MenuItemProps {
  onSelect?: () => void;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  shortcut?: ReactNode;
  children: ReactNode;
}

export function MenuItem({ onSelect, icon, danger, disabled, shortcut, children }: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm',
        'transition-colors disabled:pointer-events-none disabled:opacity-50',
        danger
          ? 'text-[var(--error)] hover:bg-[var(--error)]/10'
          : 'text-[var(--foreground)] hover:bg-[var(--surface-hover)]',
      )}
    >
      {icon && <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <span className="text-[11px] text-[var(--muted-foreground)]">{shortcut}</span>}
    </button>
  );
}

export function MenuSeparator() {
  return <div className="my-1 h-px bg-[var(--border)]" role="separator" />;
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return <div className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">{children}</div>;
}
