import type { Theme } from '../tokens/themes';

/** camelCase → --kebab (primaryDark → --primary-dark, surfaceCard → --surface-card). */
function cssVarName(key: string): string {
  return `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
}

/**
 * El set COMPLETO de custom properties de la identidad Data Cloud.
 *
 * Acá está todo lo que las pantallas consumen por `var(--x)`: semánticos, superficies, bordes, radios,
 * sombras y motion. Emitirlo entero desde un solo lugar es lo que permite que el consumidor deje de
 * declararlo a mano — mientras falte un token, la app tiene que completarlo por su cuenta y el fork se
 * reabre solo.
 *
 * ── `--text-muted` y `--muted-foreground` son el MISMO color ─────────────────────────────────────
 * Son dos nombres que nacieron en dos lados (el de la app y el del DS) y hoy hay ~800 usos repartidos
 * entre ambos. Unificarlos es hacerlos salir del mismo valor, no elegir uno y romper el otro: se emiten
 * los dos desde `colors.textMuted`. El nombre preferido para código nuevo es `--text-muted`.
 */
function derivedVars(theme: Theme): Record<string, string> {
  const c = theme.colors;
  return {
    // ── Superficies ──────────────────────────────────────────────────────────────────────────────
    '--surface': c.surfaceCard,
    '--card': c.surfaceCard,
    '--surface-muted': `color-mix(in srgb, ${c.foreground} 3%, ${c.background})`,
    '--surface-hover': `color-mix(in srgb, ${c.foreground} 5%, ${c.background})`,
    '--surface-sunken': `color-mix(in srgb, ${c.foreground} 4%, ${c.background})`,
    '--surface-input': `color-mix(in srgb, ${c.background} 55%, ${c.surfaceCard})`,
    '--topbar': c.surfaceCard,
    '--white': '#ffffff',

    // ── Bordes y divisores ───────────────────────────────────────────────────────────────────────
    '--border': c.grayLight,
    '--border-strong': c.gray,
    '--border-subtle': `color-mix(in srgb, ${c.grayLight} 60%, ${c.background})`,
    '--divider': `color-mix(in srgb, ${c.foreground} 12%, transparent)`,

    // ── Texto ────────────────────────────────────────────────────────────────────────────────────
    '--muted': c.grayLight,
    // Mismo valor, dos nombres. Ver el comentario de arriba.
    '--muted-foreground': c.textMuted,

    // ── Interacción ──────────────────────────────────────────────────────────────────────────────
    '--ring': c.primary,
    '--overlay': theme.isDark ? 'rgba(0,0,0,0.6)' : 'rgba(15,23,42,0.45)',
    // El texto que va ENCIMA de un relleno sólido. Existe para que ningún botón vuelva a hardcodear #fff.
    '--on-primary': '#ffffff',
    '--on-secondary': '#ffffff',

    // El sidebar es navy en los dos temas: es la marca, no una superficie del tema.
    '--sidebar': theme.isDark ? c.surfaceCard : c.foreground,
    '--sidebar-foreground': '#ffffff',

    // ── Radios ───────────────────────────────────────────────────────────────────────────────────
    '--radius-xs': '4px',
    '--radius-sm': '6px',
    '--radius-md': '8px',
    '--radius-lg': '12px',
    '--radius-xl': '16px',
    '--radius-2xl': '20px',
    '--radius-pill': '9999px',

    // ── Sombras ──────────────────────────────────────────────────────────────────────────────────
    // Dos familias, y no son intercambiables.
    //
    // La ESCALA (xs → lg) separa una superficie del fondo: una tarjeta, un menú, un modal. Sigue siendo
    // mínima, fiel a que la identidad se apoya en bordes y no en elevación.
    //
    // El RELIEVE (raised/pressed/sunken/well) es otra cosa: simula que una pieza tiene VOLUMEN. Es para los
    // controles que se aprietan o se llenan —botones, el pulgar de un switch, un campo— y no para
    // superficies. Aplicarlo a todo anularía las dos: la profundidad funciona por contraste, y si todo
    // sobresale nada sobresale.
    '--shadow-xs': '0 1px 2px rgba(16, 24, 40, 0.04)',
    '--shadow-sm': '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.04)',
    '--shadow-md': '0 2px 4px rgba(16, 24, 40, 0.04), 0 6px 16px rgba(16, 24, 40, 0.07)',
    '--shadow-lg': '0 12px 32px rgba(16, 24, 40, 0.10), 0 2px 8px rgba(16, 24, 40, 0.05)',
    // FLOTANTE: una superficie grande que "sale de la pantalla". Es pariente del relieve, pero resuelve
    // otro problema: el relieve simula el CANTO de una pieza chica y solida (un boton, el pulgar de un
    // switch) y sus capas internas no se ven sobre una tarjeta casi blanca.
    //
    // Lo que da la sensacion de altura es la PROGRESION, no la opacidad: una sombra de contacto corta y
    // cerrada que apoya la tarjeta, y dos difusas cada vez mas anchas y mas corridas hacia abajo que la
    // despegan del fondo. Sin la de contacto flota sin peso; sin las anchas se ve pegada.
    //
    // En oscuro la caida necesita mucha mas opacidad: un negro al 12% sobre navy es invisible.
    '--shadow-float': theme.isDark
      ? '0 1px 1px rgba(0,0,0,0.40), 0 2px 4px -1px rgba(0,0,0,0.44), 0 8px 16px -6px rgba(0,0,0,0.52), 0 18px 32px -12px rgba(0,0,0,0.56)'
      : '0 1px 1px rgba(16,24,40,0.05), 0 2px 4px -1px rgba(16,24,40,0.07), 0 8px 16px -6px rgba(16,24,40,0.12), 0 18px 32px -12px rgba(16,24,40,0.14)',

    '--shadow-focus': `0 0 0 3px color-mix(in srgb, ${c.primary} 22%, transparent)`,

    // Relieve: la pieza sobresale. Cuatro capas — el borde de arriba atrapa la luz, el de abajo queda en
    // penumbra y se curva, una sombra corta la apoya y una difusa la despega.
    //
    // En oscuro NO alcanza con el mismo valor: un negro sobre navy es invisible. Lo que da el volumen ahí
    // es el brillo de arriba, así que sube; y la caída necesita más opacidad para leerse contra un fondo
    // que ya es casi negro.
    '--shadow-raised': theme.isDark
      ? 'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.40), 0 1px 2px rgba(0,0,0,0.50), 0 2px 6px -1px rgba(0,0,0,0.40)'
      : 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.12), 0 1px 2px rgba(16,24,40,0.20), 0 2px 6px -1px rgba(16,24,40,0.16)',

    // Apretado: se hunde. Sólo las internas invertidas, sin nada que lo despegue del fondo.
    '--shadow-pressed': theme.isDark
      ? 'inset 0 1px 2px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(255,255,255,0.06)'
      : 'inset 0 1px 2px rgba(0,0,0,0.22), inset 0 -1px 0 rgba(255,255,255,0.10)',

    // La pista hundida de un control: la del switch, la del grupo de pestañas. Fuerte a propósito — lo que
    // hace que el pulgar se lea por encima es el contraste con este hueco, no su propia sombra.
    '--shadow-sunken': theme.isDark
      ? 'inset 0 1px 3px rgba(0,0,0,0.50)'
      : 'inset 0 1px 3px rgba(0,0,0,0.22)',

    // El hueco de un campo. Mucho más suave: acá adentro va TEXTO, y una sombra marcada lo ensucia y hace
    // que el campo se lea como deshabilitado.
    '--shadow-well': theme.isDark
      ? 'inset 0 1px 2px rgba(0,0,0,0.30)'
      : 'inset 0 1px 2px rgba(16,24,40,0.08)',

    // ── Tipografía y motion ──────────────────────────────────────────────────────────────────────
    '--tracking-tight': '-0.014em',
    '--tracking-tighter': '-0.022em',
    '--tracking-heading': '-0.028em',
    '--ease-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
    '--dur-fast': '0.14s',
    '--dur': '0.2s',
  };
}

/**
 * Aplica las custom properties del tema a un elemento raíz.
 *
 * El `root` es parametrizable —y no siempre `document.documentElement`— porque los portales (modales,
 * menús, tooltips, toasts) se montan colgados de `document.body`: si los tokens vivieran sólo en un
 * contenedor de la app, todo lo que sale por un portal se quedaría sin ellos y se pintaría con los
 * valores del host.
 */
export function applyThemeVars(theme: Theme, root: HTMLElement = document.documentElement): void {
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(cssVarName(key), value);
  }
  for (const [name, value] of Object.entries(derivedVars(theme))) {
    root.style.setProperty(name, value);
  }
  root.setAttribute('data-theme', theme.name);
  root.style.colorScheme = theme.isDark ? 'dark' : 'light';
}

/**
 * Los mismos tokens como texto CSS, para pintarlos en un `<style>` o en un SSR sin tocar el DOM.
 *
 * Lo necesita el consumidor que quiere emitir la paleta en el HTML inicial y evitar el flash de un tema
 * antes de que corra el JS.
 */
export function themeCssText(theme: Theme): string {
  const vars = [
    ...Object.entries(theme.colors).map(([k, v]) => [cssVarName(k), v] as const),
    ...Object.entries(derivedVars(theme)),
  ];
  return vars.map(([name, value]) => `${name}:${value};`).join('');
}
