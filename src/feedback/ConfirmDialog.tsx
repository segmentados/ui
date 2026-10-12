import type { ReactNode } from 'react';
import { Button } from '../primitives/Button';
import { Modal } from '../primitives/Modal';

/**
 * Modal de confirmación reutilizable; el caso más común es la **confirmación de borrado**.
 * Reemplaza los bloques Modal + header/body/footer duplicados en las pantallas de lista.
 *
 * Para un borrado típico alcanza con `itemName` (arma el mensaje "¿Seguro que deseas eliminar <X>? Esta
 * acción no se puede deshacer."), `danger` y `confirmLabel="Eliminar"`. `error` muestra en rojo el fallo de
 * la acción (p. ej. un 403/404 del backend) sin cerrar el diálogo.
 */
export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  /** Contenido del cuerpo. Si se omite y hay `itemName`, se arma el mensaje de borrado por defecto. */
  description?: ReactNode;
  /** Nombre del registro a borrar. Con esto (y sin `description`) se arma "¿Seguro que deseas eliminar <X>?…". */
  itemName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  /** Mensaje de error de la acción (p. ej. un 403/404). Si está presente se muestra en rojo. */
  error?: string | null;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger,
  loading,
  error,
}: ConfirmDialogProps) {
  const body =
    description ??
    (itemName ? (
      <>
        ¿Seguro que deseas eliminar <strong>{itemName}</strong>? Esta acción no se puede deshacer.
      </>
    ) : null);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {body && <p className="text-sm text-[var(--muted-foreground)]">{body}</p>}
      {error && <p className="mt-2 text-sm text-[var(--error)]">{error}</p>}
    </Modal>
  );
}
