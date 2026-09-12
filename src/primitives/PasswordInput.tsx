import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, type InputProps } from './Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  /** Etiquetas del botón de ver/ocultar. El paquete no tiene i18n: las pone el consumidor. */
  showLabel?: string;
  hideLabel?: string;
}

/**
 * Campo de contraseña con el ojo para revelarla.
 *
 * Existe como componente porque el par input+botón se reescribía en cada formulario de credenciales, y
 * la mitad de las veces sin `aria-label` en el botón ni `aria-pressed`: un botón sin nombre que cambia
 * de ícono es invisible para un lector de pantalla.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { showLabel = 'Mostrar contraseña', hideLabel = 'Ocultar contraseña', ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input ref={ref} type={visible ? 'text' : 'password'} className="pr-10" {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[var(--radius-sm)] p-1.5 text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        {visible ? <EyeOff size={15} aria-hidden /> : <Eye size={15} aria-hidden />}
      </button>
    </div>
  );
});
