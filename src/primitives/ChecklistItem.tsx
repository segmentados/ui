import { CircleCheck, AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Fila de "estado de validación" / checklist: ícono de estado + etiqueta. Tres estados:
 *  - `ok` → tilde verde (hecho),
 *  - `warn` → triángulo ámbar (atención),
 *  - ninguno → tilde atenuado (pendiente).
 *
 * Extraído de las reimplementaciones idénticas en los wizards del CRM (Checklist / Estado de validación).
 */
export interface ChecklistItemProps {
  ok?: boolean;
  warn?: boolean;
  label: ReactNode;
  className?: string;
}

export function ChecklistItem({ ok, warn, label, className }: ChecklistItemProps) {
  const color = warn ? 'var(--warning)' : ok ? 'var(--success)' : 'var(--text-muted)';
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
      <span style={{ color, flex: 'none', marginTop: 1 }}>{warn ? <AlertTriangle size={17} /> : <CircleCheck size={17} />}</span>
      <span style={{ fontSize: 13, color: ok || warn ? 'var(--foreground)' : 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}
