import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface WizardStep {
  label: ReactNode;
  /** Adónde vuelve este paso. Sólo se usa en los pasos ya recorridos. */
  href?: string;
}

export interface WizardStepsProps {
  steps: WizardStep[];
  /** Índice del paso actual, base 0. */
  current: number;
  /** Envuelto en tarjeta (el wizard de fuentes) o suelto sobre el fondo (el de ingesta). */
  card?: boolean;
  /**
   * Render del enlace. Por defecto un `<a href>`, que sirve para MPA; en una SPA se pasa el `Link`
   * del router para no recargar el documento. Mismo contrato que `AppSidebar`.
   */
  renderLink?: (p: { href: string; className: string; children: ReactNode }) => ReactNode;
  className?: string;
}

/**
 * El indicador de pasos de un asistente.
 *
 * Estaba implementado dos veces —`SourceWizardShell.WizardSteps` (tarjeta, tilde, línea entre pasos) y
 * `MockKit.Pasos` (lista suelta, ✓ de texto)— y se veían distinto en dos wizards del mismo producto.
 * Acá es uno, y la diferencia real entre los dos —ir dentro de una tarjeta o no— es la prop `card`.
 *
 * Sólo se navega HACIA ATRÁS. Un paso posterior necesita lo que se define en el anterior, y dejarlo
 * abrir con el estado vacío muestra una pantalla que no puede funcionar. Por eso los pasos que todavía
 * no se recorrieron ignoran su `href` aunque lo tengan.
 */
export function WizardSteps({ steps, current, card = true, renderLink, className }: WizardStepsProps) {
  const contenido = steps.map((s, i) => {
    const hecho = i < current;
    const activo = i === current;
    const navegable = hecho && !!s.href;

    const cuerpo = (
      <>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
          style={{
            background: hecho || activo ? 'var(--primary)' : 'color-mix(in srgb, var(--border) 60%, transparent)',
            color: hecho || activo ? 'var(--on-primary)' : 'var(--text-muted)',
          }}
        >
          {hecho ? <Check size={15} /> : i + 1}
        </span>
        <span
          className="text-[13px]"
          style={{
            color: activo || hecho ? 'var(--foreground)' : 'var(--text-muted)',
            fontWeight: activo ? 600 : 400,
          }}
        >
          {i + 1}. {s.label}
        </span>
      </>
    );

    const claseEnlace = cn('flex items-center gap-2.5', !navegable && 'pointer-events-none');

    return (
      <div key={i} className="flex flex-1 items-center gap-3">
        {navegable && renderLink ? (
          renderLink({ href: s.href!, className: claseEnlace, children: cuerpo })
        ) : (
          <a
            href={navegable ? s.href : undefined}
            aria-current={activo ? 'step' : undefined}
            className={claseEnlace}
          >
            {cuerpo}
          </a>
        )}

        {i < steps.length - 1 && (
          <span
            aria-hidden
            className="hidden h-px flex-1 md:block"
            style={{ background: hecho ? 'var(--primary)' : 'var(--border)' }}
          />
        )}
      </div>
    );
  });

  return (
    <nav
      aria-label="Pasos"
      className={cn(
        'mb-4 flex flex-wrap items-center gap-2',
        card && 'rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-card)] p-4',
        className,
      )}
    >
      {contenido}
    </nav>
  );
}
