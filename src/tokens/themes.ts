/**
 * Paleta de marca y temas — portado de frontend-astro/src/shared/theme/themes.ts.
 * Fuente de verdad de los colores; los tokens se emiten como CSS custom properties
 * (ver ds/theme/cssVars.ts). Cada tema es light u oscuro (isDark) para el color-scheme.
 */

export type ThemeName =
  | 'aurora'
  | 'midnight'
  | 'emerald'
  | 'lavender'
  | 'mint'
  | 'slate'
  | 'graphite'
  | 'royal';

/** Paleta oficial de marca (brandbook / logo). */
export const BRAND = {
  violet: '#592ef2',
  violetDark: '#4521c7',
  violetLight: '#7c5cf6',
  green: '#29f180',
  greenDark: '#18c768',
  greenLight: '#5ff6a3',
  navy: '#141926',
  navyLight: '#2a3142',
  gray: '#cbd5e1',
  grayLight: '#eef1f6',
  grayDark: '#94a3b8',
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
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  isDark: boolean;
  colors: ThemeColors;
}

export const themes: Record<ThemeName, Theme> = {
  aurora: {
    name: 'aurora',
    displayName: 'Aurora',
    description: 'El look de marca: violeta y verde sobre blanco limpio',
    isDark: false,
    colors: {
      primary: '#592ef2', primaryDark: '#4521c7', primaryLight: '#7c5cf6',
      secondary: '#29f180', secondaryDark: '#18c768', secondaryLight: '#5ff6a3',
      dark: '#141926', darkLight: '#2a3142', gray: '#cbd5e1', grayLight: '#eef1f6', grayDark: '#94a3b8',
      background: '#ffffff', foreground: '#141926',
      error: '#ef4444', warning: '#f59e0b', success: '#10b981', info: '#3b82f6',
    },
  },
  midnight: {
    name: 'midnight',
    displayName: 'Midnight',
    description: 'Modo oscuro premium sobre azul noche con acentos de marca',
    isDark: true,
    colors: {
      primary: '#8b6cf8', primaryDark: '#6d4ff4', primaryLight: '#a78bfa',
      secondary: '#34f08a', secondaryDark: '#20c66a', secondaryLight: '#6ff7ab',
      dark: '#e8edf5', darkLight: '#c3cad6', gray: '#5b6679', grayLight: '#1c2435', grayDark: '#8b95a7',
      background: '#0b0f1a', foreground: '#e8edf5',
      error: '#f87171', warning: '#fbbf24', success: '#34d399', info: '#60a5fa',
    },
  },
  emerald: {
    name: 'emerald',
    displayName: 'Emerald',
    description: 'Verde de marca como protagonista, violeta de apoyo',
    isDark: false,
    colors: {
      primary: '#18c768', primaryDark: '#0fa855', primaryLight: '#29f180',
      secondary: '#592ef2', secondaryDark: '#4521c7', secondaryLight: '#7c5cf6',
      dark: '#141926', darkLight: '#2a3142', gray: '#cbd5e1', grayLight: '#e9f0ee', grayDark: '#94a3b8',
      background: '#ffffff', foreground: '#141926',
      error: '#ef4444', warning: '#f59e0b', success: '#18c768', info: '#592ef2',
    },
  },
  lavender: {
    name: 'lavender',
    displayName: 'Lavender',
    description: 'Violeta sereno sobre un fondo lavanda suave',
    isDark: false,
    colors: {
      primary: '#592ef2', primaryDark: '#4521c7', primaryLight: '#7c5cf6',
      secondary: '#29f180', secondaryDark: '#18c768', secondaryLight: '#5ff6a3',
      dark: '#141926', darkLight: '#2a3142', gray: '#d4d0ec', grayLight: '#ece9fb', grayDark: '#948cbf',
      background: '#f7f5ff', foreground: '#141926',
      error: '#ef4444', warning: '#f59e0b', success: '#18c768', info: '#592ef2',
    },
  },
  mint: {
    name: 'mint',
    displayName: 'Mint',
    description: 'Verde fresco sobre un fondo menta tenue',
    isDark: false,
    colors: {
      primary: '#18c768', primaryDark: '#0fa855', primaryLight: '#29f180',
      secondary: '#592ef2', secondaryDark: '#4521c7', secondaryLight: '#7c5cf6',
      dark: '#141926', darkLight: '#2a3142', gray: '#c5e3d3', grayLight: '#e4f5ec', grayDark: '#7fa893',
      background: '#f3fcf7', foreground: '#141926',
      error: '#ef4444', warning: '#f59e0b', success: '#18c768', info: '#592ef2',
    },
  },
  slate: {
    name: 'slate',
    displayName: 'Slate',
    description: 'Neutro y profesional, con acento violeta de marca',
    isDark: false,
    colors: {
      primary: '#592ef2', primaryDark: '#4521c7', primaryLight: '#7c5cf6',
      secondary: '#64748b', secondaryDark: '#475569', secondaryLight: '#94a3b8',
      dark: '#141926', darkLight: '#2a3142', gray: '#cbd5e1', grayLight: '#eef2f7', grayDark: '#94a3b8',
      background: '#f8fafc', foreground: '#141926',
      error: '#dc2626', warning: '#d97706', success: '#10b981', info: '#2563eb',
    },
  },
  graphite: {
    name: 'graphite',
    displayName: 'Graphite',
    description: 'Modo oscuro neutro sobre grafito, acentos vivos',
    isDark: true,
    colors: {
      primary: '#7c5cf6', primaryDark: '#592ef2', primaryLight: '#9d8af7',
      secondary: '#29f180', secondaryDark: '#20c66a', secondaryLight: '#5ff6a3',
      dark: '#ececee', darkLight: '#c7cace', gray: '#5a5e66', grayLight: '#23262d', grayDark: '#8a8f99',
      background: '#16181d', foreground: '#ececee',
      error: '#f87171', warning: '#fbbf24', success: '#34d399', info: '#60a5fa',
    },
  },
  royal: {
    name: 'royal',
    displayName: 'Royal',
    description: 'Violeta profundo y elegante para una imagen premium',
    isDark: false,
    colors: {
      primary: '#4521c7', primaryDark: '#3318a0', primaryLight: '#592ef2',
      secondary: '#29f180', secondaryDark: '#18c768', secondaryLight: '#5ff6a3',
      dark: '#141926', darkLight: '#2a3142', gray: '#cbd5e1', grayLight: '#edeef4', grayDark: '#94a3b8',
      background: '#fcfcfe', foreground: '#141926',
      error: '#ef4444', warning: '#f59e0b', success: '#18c768', info: '#592ef2',
    },
  },
};

export const themeList: Theme[] = Object.values(themes);
export const DEFAULT_THEME: ThemeName = 'aurora';

export function isThemeName(v: unknown): v is ThemeName {
  return typeof v === 'string' && v in themes;
}
