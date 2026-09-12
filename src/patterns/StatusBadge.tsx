import { Chip, type ChipProps } from '../primitives/Chip';
import type { ColorVariant } from '../primitives/types';

export type StatusTone = ColorVariant;

/**
 * De un estado crudo del backend a un tono.
 *
 * Este mapa estaba escrito cinco veces (`data-streams/labels`, RunDetail, RunsPanel,
 * ActivationStatusBadge, SegmentStatusBadge) y ya no coincidían entre sí: el mismo `failed` salía rojo
 * en una pantalla y gris en otra, y "pausado" era ámbar o gris según quién lo hubiera escrito último.
 * Un estado tiene UN color en todo el producto, o el color deja de significar algo.
 *
 * Las claves están en inglés y en español porque el backend devuelve las dos, según el slice.
 */
const TONOS: Record<string, StatusTone> = {
  running: 'info', processing: 'info', pending: 'info', queued: 'info', delivering: 'info',
  ejecutando: 'info', procesando: 'info', pendiente: 'info', encolado: 'info',

  succeeded: 'success', success: 'success', completed: 'success', active: 'success', connected: 'success',
  published: 'success', enabled: 'success', ok: 'success', healthy: 'success',
  completado: 'success', activo: 'success', conectado: 'success', publicado: 'success', operativo: 'success',

  failed: 'error', error: 'error', dead: 'error', rejected: 'error',
  fallido: 'error', fallida: 'error', rechazado: 'error', critica: 'error',

  partial: 'warning', degraded: 'warning', warning: 'warning', paused: 'warning', stale: 'warning',
  parcial: 'warning', degradado: 'warning', pausado: 'warning', advertencia: 'warning',

  draft: 'gray', disabled: 'gray', inactive: 'gray', unused: 'gray', archived: 'gray', unknown: 'gray',
  borrador: 'gray', inactivo: 'gray', sin_usar: 'gray', archivado: 'gray', desconocido: 'gray',
};

/** El tono de un estado. `gray` cuando no se reconoce: un estado nuevo no debe pintarse de verde. */
export function statusTone(status: string | null | undefined): StatusTone {
  if (!status) return 'gray';
  return TONOS[status.trim().toLowerCase()] ?? 'gray';
}

export interface StatusBadgeProps extends Omit<ChipProps, 'color' | 'children'> {
  status: string | null | undefined;
  /** Qué mostrar. Sin esto se muestra el estado crudo: traducir es del consumidor, no del DS. */
  label?: string;
  /** Forzar el tono cuando el estado no está en el mapa y el consumidor sí sabe cuál va. */
  tone?: StatusTone;
}

/** La pastilla de estado de la suite: mismo color para el mismo estado, en todas las pantallas. */
export function StatusBadge({ status, label, tone, variant = 'soft', size = 'sm', ...props }: StatusBadgeProps) {
  return (
    <Chip color={tone ?? statusTone(status)} variant={variant} size={size} {...props}>
      {label ?? status ?? '—'}
    </Chip>
  );
}
