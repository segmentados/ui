/**
 * Escalas no-cromáticas del Design System (constantes TS reutilizables por componentes
 * y por el motor de visualización). Los colores viven en tokens/themes.ts.
 */

/** Escala de espaciado (px). Múltiplos de 4, base 8. */
export const spacing = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64, 20: 80, 24: 96,
} as const;

/** Radios de borde (px). Espejan los tokens `--radius-*` que emite el tema. */
export const radius = {
  none: 0, xs: 4, sm: 6, md: 8, lg: 12, xl: 16, '2xl': 20, pill: 9999, full: 9999,
} as const;

/** Tipografía: familias, tamaños (px) y pesos. */
export const typography = {
  fontFamily: {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace',
  },
  /**
   * Data Cloud tipografía densa: la escala arranca en 10 (etiquetas de eje, hints) y el título de
   * pantalla es 26, no 30. Los pasos 13/15 existen porque el spec los usa para tabla y para título de
   * tarjeta, y redondearlos a 12/16 cambia la densidad de las listas.
   */
  fontSize: {
    '2xs': 10, xs: 11, sm: 12, base: 13, md: 14, lg: 15, xl: 16, '2xl': 18, '3xl': 20, '4xl': 22, '5xl': 26,
  },
  fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.2, normal: 1.5, relaxed: 1.7 },
} as const;

/** Elevaciones (sombras). */
export const elevation = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 12px -2px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
  lg: '0 12px 28px -6px rgb(0 0 0 / 0.16), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
  xl: '0 24px 48px -12px rgb(0 0 0 / 0.24)',
} as const;

/** Duraciones y curvas de animación. */
export const motion = {
  duration: { fast: 120, base: 200, slow: 320 },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.3, 0, 0, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

/** Capas de apilamiento — un único lugar para evitar guerras de z-index. */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  sidebar: 1200,
  topbar: 1300,
  overlay: 1400,
  modal: 1500,
  toast: 1600,
  tooltip: 1700,
  commandPalette: 1800,
} as const;

/** Paleta categórica para visualizaciones (Tableau-10, alineada al ReportChart existente). */
export const categorical10 = [
  '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
  '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ac',
] as const;
