import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

/**
 * Encabezado de página unificado de la suite: título + descripción + acciones (y breadcrumb opcional).
 * Marca-agnóstico, sobre tokens del DS. Reemplaza los "PlatformPageHeader" duplicados por app.
 */
export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Botones/acciones a la derecha. */
  actions?: ReactNode;
  /** Migas (ya renderizadas) sobre el título. */
  breadcrumb?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, breadcrumb, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6 flex flex-wrap items-start justify-between gap-4', className)}>
      <div className="min-w-0 flex-1">
        {breadcrumb && <div className="mb-1.5 text-[12px] text-[var(--muted-foreground)]">{breadcrumb}</div>}
        <h1 className="truncate text-[22px] font-bold leading-tight tracking-tight text-[var(--foreground)]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[var(--muted-foreground)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
