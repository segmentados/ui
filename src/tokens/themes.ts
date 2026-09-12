/**
 * Identidad visual Data Cloud — la paleta canónica de la suite.
 *
 * ── Por qué dos temas y no ocho ──────────────────────────────────────────────────────────────────
 * Había ocho (aurora/midnight/emerald/lavender/mint/slate/graphite/royal) y un switcher para elegirlos.
 * Ocho temas no son ocho decisiones de diseño: son ocho maneras de que la misma pantalla se vea distinta
 * según quién la abrió, y ninguna es "la marca". La identidad de Data Cloud es UNA —verde sobre fondo
 * menta— y acá quedan sólo sus dos caras necesarias: clara y oscura.
 *
 * `mint` es la identidad. `midnight` es la MISMA identidad de noche: el verde sigue siendo el primario,
 * apoyado sobre navy profundo en vez de menta. No es un tema alternativo, es el mismo con otra luz.
 *
 * ── Esta es la fuente de verdad ──────────────────────────────────────────────────────────────────
 * Los valores salen de `frontend-astro/src/styles/global.css`, que hasta ahora los declaraba a mano. De
 * acá en adelante manda este archivo: el consumidor debe DERIVAR sus custom properties de lo que emite
 * `applyThemeVars`, no volver a escribirlas. Sincronizar ese fork es trabajo posterior, no de este cambio.
 */

export type ThemeName = 'mint' | 'midnight';

/**
 * Paleta oficial de marca (brandbook / logo).
 *
 * El verde es el color de Data Cloud y el violeta pasó a acento: es al revés de como estaba, y es el
 * cambio que ordena todo lo demás.
 */
export const BRAND = {
  green: '#29f180',
  greenDark: '#18c768',
  greenLight: '#5ff6a3',
  violet: '#592ef2',
  violetDark: '#4521c7',
  violetLight: '#7c5cf6',
  navy: '#141926',
  navyLight: '#2a3142',
  mint: '#f3fcf7',
  gray: '#c5e3d3',
  grayLight: '#e4f5ec',
  grayDark: '#7fa893',
  white: '#ffffff',
} as const;

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  dark: string;
  darkLight: string;
  gray: string;
  grayLight: string;
  grayDark: string;
  background: string;
  foreground: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  /**
   * Las superficies y los grises de texto van explícitos, no derivados de `isDark`.
   *
   * Derivarlos daba blanco puro en claro y un gris cualquiera en oscuro, y la identidad Data Cloud usa
   * un blanco sobre fondo menta y un navy elevado sobre navy: son decisiones de paleta, no un cálculo.
   */
  surfaceCard: string;
  surfaceRaised: string;
  textMuted: string;
  textSubtle: string;
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  isDark: boolean;
  colors: ThemeColors;
}

export const themes: Record<ThemeName, Theme> = {
  mint: {
    name: 'mint',
    displayName: 'Data Cloud',
    description: 'La identidad de Data Cloud: verde de marca sobre un fondo menta tenue',
    isDark: false,
    colors: {
      primary: '#18c768', primaryDark: '#0fa855', primaryLight: '#29f180',
      secondary: '#592ef2', secondaryDark: '#4521c7', secondaryLight: '#7c5cf6',
      dark: '#141926', darkLight: '#2a3142',
      gray: '#c5e3d3', grayLight: '#e4f5ec', grayDark: '#7fa893',
      background: '#f3fcf7', foreground: '#141926',
      surfaceCard: '#ffffff', surfaceRaised: '#fafffe',
      textMuted: '#6b8b7a', textSubtle: '#9bb5a8',
      error: '#ef4444', warning: '#f59e0b', success: '#18c768', info: '#592ef2',
    },
  },
  midnight: {
    name: 'midnight',
    displayName: 'Data Cloud oscuro',
    description: 'La misma identidad de noche: verde de marca sobre navy profundo',
    isDark: true,
    colors: {
      // El verde sube de tono: el #18c768 del claro sobre navy pierde contra el fondo.
      primary: '#29f180', primaryDark: '#18c768', primaryLight: '#5ff6a3',
      secondary: '#7c5cf6', secondaryDark: '#592ef2', secondaryLight: '#9d8af7',
      // `dark`/`darkLight` son el texto fuerte, así que en un tema oscuro se invierten.
      dark: '#e6f2ea', darkLight: '#c2d4c9',
      // `gray` es el borde marcado y `grayLight` la superficie: en oscuro NO son grises claros.
      gray: '#2a3448', grayLight: '#161d2e', grayDark: '#8fa89a',
      background: '#0d121f', foreground: '#e6f2ea',
      surfaceCard: '#161d2e', surfaceRaised: '#1b2437',
      textMuted: '#8fa89a', textSubtle: '#6b8272',
      error: '#f87171', warning: '#fbbf24', success: '#29f180', info: '#9d8af7',
    },
  },
};

export const themeList: Theme[] = Object.values(themes);

/** La identidad Data Cloud en claro. Lo que ve alguien que nunca tocó una preferencia. */
export const DEFAULT_THEME: ThemeName = 'mint';

export function isThemeName(v: unknown): v is ThemeName {
  return typeof v === 'string' && v in themes;
}
