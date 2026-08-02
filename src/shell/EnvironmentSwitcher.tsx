import { ContextSwitcher } from './ContextSwitcher';

/**
 * Switcher de ENTORNOS (modo no-BI: Personalization / CDP / CRM). Reemplaza al de workspaces
 * cuando el topbar se reutiliza fuera de BI. Los datos los provee la app host (por props),
 * porque cada backend resuelve marca/entorno a su manera. Espeja el selector de entornos de Perso.
 */
export interface EnvironmentOption {
  id: string;
  name: string;
  /** Tipo/etiqueta (Producción, QA, Development…). */
  kind?: string;
  color?: string;
}

interface EnvironmentSwitcherProps {
  environments: EnvironmentOption[];
  currentId?: string;
  onChange?: (id: string) => void;
}

export function EnvironmentSwitcher({ environments, currentId, onChange }: EnvironmentSwitcherProps) {
  if (!environments || environments.length === 0) return null;
  return (
    <ContextSwitcher
      label="Entorno"
      currentId={currentId}
      onSelect={onChange}
      options={environments.map((e) => ({ id: e.id, name: e.name, meta: e.kind, color: e.color }))}
    />
  );
}
