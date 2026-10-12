import { forwardRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn';
import type { ColorVariant } from './types';

/**
 * Barra de pestañas. El DS no tenía Tabs (sólo `SegmentedToggle`); se portó desde el DS local del SPA, que
 * ~33 pantallas reimplementaban inline. Tokens adaptados al tema del DS (el SPA usaba la familia `--gray*`,
 * acá se mapea a `--border`/`--muted-foreground`/`--surface-hover`).
 *
 * Variantes: `standard` (subrayado), `outlined` (recuadro con solapa), `pills` (píldora con color de acento) y
 * `segmented` (pista hundida, la activa levantada — navegación que no compite con el contenido).
 */
export interface Tab {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: Tab[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  color?: ColorVariant;
  variant?: 'standard' | 'outlined' | 'pills' | 'segmented';
  orientation?: 'horizontal' | 'vertical';
}

const colorClasses: Record<ColorVariant, string> = {
  primary: 'border-[var(--primary)] text-[var(--primary)]',
  secondary: 'border-[var(--secondary)] text-[var(--secondary)]',
  success: 'border-[var(--success)] text-[var(--success)]',
  error: 'border-[var(--error)] text-[var(--error)]',
  warning: 'border-[var(--warning)] text-[var(--warning)]',
  info: 'border-[var(--info)] text-[var(--info)]',
  dark: 'border-[var(--foreground)] text-[var(--foreground)]',
  gray: 'border-[var(--muted-foreground)] text-[var(--muted-foreground)]',
};

const pillColorClasses: Record<ColorVariant, string> = {
  primary: 'bg-[var(--primary)] text-white',
  secondary: 'bg-[var(--secondary)] text-[var(--foreground)]',
  success: 'bg-[var(--success)] text-white',
  error: 'bg-[var(--error)] text-white',
  warning: 'bg-[var(--warning)] text-white',
  info: 'bg-[var(--info)] text-white',
  dark: 'bg-[var(--foreground)] text-white',
  gray: 'bg-[var(--muted)] text-[var(--foreground)]',
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { tabs, value: controlledValue, defaultValue, onChange, color = 'primary', variant = 'standard', orientation = 'horizontal', className, ...props },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.value || '');
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleTabClick = (tabValue: string, disabled?: boolean) => {
      if (disabled) return;
      if (controlledValue === undefined) setInternalValue(tabValue);
      onChange?.(tabValue);
    };

    return (
      <div ref={ref} className={cn('flex', orientation === 'horizontal' ? 'flex-col' : 'flex-row', className)} {...props}>
        <div
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-row border-b-2 border-[var(--border)]' : 'flex-col border-r-2 border-[var(--border)]',
            variant === 'pills' && 'border-0 gap-2',
            variant === 'segmented' && 'border-0 gap-[2px] self-start rounded-[10px] bg-[var(--border)] p-[3px] shadow-[var(--shadow-sunken)]',
          )}
        >
          {tabs.map((tab) => {
            const isActive = tab.value === value;
            return (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value, tab.disabled)}
                disabled={tab.disabled}
                className={cn(
                  'flex items-center gap-2 font-medium transition-all duration-200',
                  variant === 'segmented' ? 'rounded-lg px-[14px] py-1.5 text-[12.5px]' : 'px-4 py-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  variant === 'standard' &&
                    cn('border-b-2 -mb-0.5', isActive ? colorClasses[color] : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'),
                  variant === 'outlined' &&
                    cn('border-2', isActive
                      ? cn('border-[var(--border)] border-b-[var(--background)] bg-[var(--background)]', colorClasses[color])
                      : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'),
                  variant === 'pills' &&
                    (isActive ? pillColorClasses[color] : 'text-[var(--muted-foreground)] hover:bg-[var(--surface-hover)]'),
                  variant === 'segmented' &&
                    (isActive
                      ? 'bg-[var(--background)] text-[var(--foreground)] shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_1px_rgba(0,0,0,.32),0_2px_5px_-1px_rgba(0,0,0,.25),inset_0_-1px_1px_rgba(0,0,0,.06)]'
                      : 'bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'),
                )}
              >
                {tab.icon && <span>{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
