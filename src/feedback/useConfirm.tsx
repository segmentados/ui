import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

export interface ConfirmRequest {
  title: string;
  description?: ReactNode;
  /** Nombre del registro a borrar; arma el mensaje "¿Seguro que deseas eliminar <X>?…". */
  itemName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Acción destructiva (botón de confirmar en rojo). Para borrados: `true`. */
  danger?: boolean;
}

/**
 * Confirmación en un modal de la app, con la ergonomía de `window.confirm` pero sin sus problemas: no bloquea
 * el hilo, no lo suprime el navegador dentro de un iframe sin `allow-modals`, y se puede traducir/estilar.
 *
 * ```tsx
 * const [confirmar, dialogo] = useConfirm();
 * ...
 * if (!(await confirmar({ title: 'Eliminar cuenta', itemName: 'Delta S.A.', danger: true }))) return;
 * ...
 * return (<>{contenido}{dialogo}</>);
 * ```
 *
 * La promesa resuelve `false` al cerrar, cancelar o Escape, así que quien llama sólo mira el booleano.
 */
export function useConfirm(): [(req: ConfirmRequest) => Promise<boolean>, ReactNode] {
  const [req, setReq] = useState<ConfirmRequest | null>(null);
  // En un ref: cambiarlo no redibuja, y el `resolve` tiene que sobrevivir al render que dispara `setReq`.
  const resolver = useRef<((ok: boolean) => void) | null>(null);

  const confirmar = useCallback((r: ConfirmRequest) => {
    setReq(r);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const cerrar = useCallback((ok: boolean) => {
    // Primero resolver, después limpiar: si se limpiara antes, un re-render podría desmontar el diálogo con
    // la promesa colgada y quien espera no vuelve nunca.
    resolver.current?.(ok);
    resolver.current = null;
    setReq(null);
  }, []);

  const dialogo = (
    <ConfirmDialog
      open={req !== null}
      onClose={() => cerrar(false)}
      onConfirm={() => cerrar(true)}
      title={req?.title ?? ''}
      description={req?.description}
      itemName={req?.itemName}
      confirmLabel={req?.confirmLabel}
      cancelLabel={req?.cancelLabel}
      danger={req?.danger}
    />
  );

  return [confirmar, dialogo];
}
