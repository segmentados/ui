import type { Theme } from '../tokens/themes';

/** camelCase → --kebab (primaryDark → --primary-dark). */
function cssVarName(key: string): string {
  return `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
}

/**
 * Tokens semánticos derivados del tema, para que los componentes no dependan de colores crudos.
 * Se computan a partir de la paleta + isDark, de modo que un tema oscuro obtiene superficies y
 * bordes correctos sin tener que declararlos uno por uno.
 */
function derivedVars(theme: Theme): Record<string, string> {
  const c = theme.colors;
  const dark = theme.isDark;
  return {
    '--surface': dark ? c.grayLight : '#ffffff',
    '--surface-hover': dark ? c.gray : c.grayLight,
    '--card': dark ? c.grayLight : '#ffffff',
    '--border': dark ? 'rgba(255,255,255,0.10)' : c.grayLight,
    '--border-strong': dark ? 'rgba(255,255,255,0.18)' : c.gray,
    '--muted': c.grayLight,
    '--muted-foreground': c.grayDark,
    '--ring': c.primary,
    '--overlay': dark ? 'rgba(0,0,0,0.6)' : 'rgba(15,23,42,0.45)',
    '--sidebar': dark ? c.background : c.foreground,
    '--sidebar-foreground': dark ? c.foreground : '#ffffff',
    '--topbar': dark ? c.grayLight : '#ffffff',
    '--on-primary': '#ffffff',
    '--on-secondary': dark ? c.background : '#0b1220',
  };
}

/** Aplica todas las CSS custom properties del tema al elemento raíz (o al que se pase). */
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
