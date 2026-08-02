import { LayoutGrid } from 'lucide-react';
import { Tooltip } from '../primitives/Tooltip';

/**
 * Botón "volver a la app / suite" del topbar. Lleva al launcher de Segmentados. La URL la provee la
 * app host por `href` (ej. desde su env); default `/apps`. La lib no lee env (queda portable).
 */
export function BackToAppButton({ href = '/apps' }: { href?: string }) {
  const target = href;
  return (
    <Tooltip content="Volver a Segmentados" side="bottom">
      <a
        href={target}
        aria-label="Volver a Segmentados"
        className="flex items-center rounded-lg p-2 text-[var(--muted-foreground)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
      >
        <LayoutGrid className="h-[18px] w-[18px]" />
      </a>
    </Tooltip>
  );
}
