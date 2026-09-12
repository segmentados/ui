import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_THEME, isThemeName, themeList, themes, type Theme, type ThemeName } from '../tokens/themes';
import { applyThemeVars } from './cssVars';
import { getPortalHost } from './portalHost';

const STORAGE_KEY = 'bi.theme';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  themes: Theme[];
  isDark: boolean;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored(): ThemeName {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isThemeName(raw) ? raw : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function ThemeProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: ThemeName;
}) {
  const [themeName, setThemeName] = useState<ThemeName>(() => initial ?? readStored());

  const setTheme = useCallback((name: ThemeName) => {
    setThemeName(name);
    try {
      window.localStorage.setItem(STORAGE_KEY, name);
    } catch {
      /* storage puede no estar disponible */
    }
  }, []);

  useEffect(() => {
    const theme = themes[themeName];
    applyThemeVars(theme);
    // Y sobre el host de portales: un modal cuelga de `body`, fuera del árbol de la app, así que si el
    // consumidor scopea los tokens a un contenedor no los heredaría. Ver `portalHost.ts`.
    const host = getPortalHost();
    if (host) applyThemeVars(theme, host);
  }, [themeName]);

  const value = useMemo<ThemeContextValue>(() => {
    const theme = themes[themeName];
    return { theme, themeName, themes: themeList, isDark: theme.isDark, setTheme };
  }, [themeName, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  return ctx;
}
