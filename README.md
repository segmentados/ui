# @segmentados/ui

Design system de **Segmentados** (React + Tailwind): tokens, temas (incluido **mint**),
primitives y shell reutilizable por todas las apps de la suite (BI, Personalization, CDP, CRM).

Sembrado desde el DS del BI (`apps/bi/src/ds`). Es la fuente de verdad del look & feel de la suite.

## Qué exporta

- **Tokens / temas** — `themes`, `BRAND`, `spacing`, `radius`, `typography`, `elevation`, `motion`,
  `zIndex`, `ThemeProvider`, `useTheme`, `applyThemeVars`.
- **Primitives** — `Button`, `Input`, `Select`, `Card`, `Badge`, `Avatar`, `Kbd`, `Skeleton`,
  `Spinner`, `PageLoader`, `Modal`, `Menu`, `Tooltip`, `EmptyState`.
- **Feedback** — `Toaster`, `ConfirmDialog`, `toast`.
- **Shell** (marca-agnóstico) — `AppSidebar`, `PageHeader`, `ContextSwitcher`,
  `EnvironmentSwitcher`, `LanguageMenu`, `BackToAppButton`.

## Instalación (GitHub Packages)

El paquete es privado en GitHub Packages bajo el scope `@segmentados`. En el repo consumidor:

**`.npmrc`**
```
@segmentados:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```
> `GITHUB_TOKEN` = un PAT con permiso `read:packages` (en CI, el `GITHUB_TOKEN` del workflow alcanza).

```bash
npm install @segmentados/ui
```

`react` y `react-dom` son peerDependencies (los provee tu app).

## Uso

1. **Envolvé la app en el `ThemeProvider`** (default sugerido de la suite: `mint`):

```tsx
import { ThemeProvider } from '@segmentados/ui';

<ThemeProvider defaultTheme="mint">
  <App />
</ThemeProvider>
```

2. **Tailwind** — los componentes usan clases de Tailwind, así que tu app tiene que escanear el paquete
   para generarlas. Con Tailwind v4, en tu CSS:

```css
@import "tailwindcss";
@source "../node_modules/@segmentados/ui/dist";
```

3. **Usá los componentes**:

```tsx
import { Button, Card, PageHeader, AppSidebar } from '@segmentados/ui';
```

## Desarrollo

```bash
npm install
npm run build       # tsup → dist (ESM + .d.ts)
npm run typecheck
```

### Iterar sin publicar (dev cross-repo)
Para probar cambios en una app antes de publicar una versión, usá un link local:

```bash
# en este repo
npm run build
npm link
# en la app consumidora
npm link @segmentados/ui
```
(o `yalc` si preferís evitar los symlinks de `npm link`).

## Publicar

Se publica **automáticamente a GitHub Packages** al crear un **Release** (ver
`.github/workflows/publish.yml`). Flujo: `npm version <patch|minor|major>` → push del tag → crear el
Release en GitHub → el workflow corre `build` + `npm publish`.
