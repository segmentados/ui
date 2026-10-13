# @segmentados/ui

Design system de **Segmentados** (React + Tailwind): tokens, temas (incluido **mint**),
primitives y shell reutilizable por todas las apps de la suite (BI, Personalization, CDP, CRM).

Sembrado desde el DS del BI (`apps/bi/src/ds`). Es la fuente de verdad del look & feel de la suite.

## Qué exporta

- **Tokens / temas** — `themes`, `BRAND`, `spacing`, `radius`, `typography`, `elevation`, `motion`,
  `zIndex`, `ThemeProvider`, `useTheme`, `applyThemeVars`.
- **Primitives** — `Button`, `Input`, `Textarea`, `PasswordInput`, `Select`, `Checkbox`, `Switch`,
  `Field`, `Card`, `Badge`, `StatusBadge`, `Chip`, `Avatar`, `Kbd`, `Divider`, `Progress`, `Skeleton`,
  `Spinner`, `PageLoader`, `Modal`, `Menu`, `Tooltip`, `Tabs`, `SegmentedToggle`, `EmptyState`,
  `ChecklistItem`, `Typography`, `Accordion`, `Collapsible`, `TreeNode`.
- **Data / patrones** — `DataTable`, `Pagination`, `FilterBar`, `SearchBar`, `KeyValue`, `StatCard`,
  `StatGrid`, `NavigationCard`, `SelectableCard`, `ListItemRow`, `WizardSteps`, `WizardSummarySidebar`, `Icon`.
- **Feedback** — `Toaster`, `toast`, `ConfirmDialog`, `useConfirm`.
- **Shell** (marca-agnóstico) — `AppSidebar`, `PageHeader`, `ContextSwitcher`,
  `EnvironmentSwitcher`, `LanguageMenu`, `BackToAppButton`.

> La lista canónica y completa de exports está en `src/index.ts`.

## Instalación

Publicado en el **npm público** (`registry.npmjs.org`) bajo el scope `@segmentados`. Se instala sin token ni `.npmrc` especial:

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

Se publica en el **npm público** (`registry.npmjs.org`, acceso `public` vía `publishConfig`). Requiere ser
miembro de la org `@segmentados` en npmjs.com con permiso de publicación, y estar logueado (`npm login`).

```bash
npm version <patch|minor|major>   # bump de versión (no se puede republicar una versión ya publicada)
npm publish                        # prepublishOnly corre el build (tsup)
```

Para automatizar en CI/Release, `.github/workflows/publish.yml` debe apuntar a `registry.npmjs.org` y usar
un `NPM_TOKEN` (en `NODE_AUTH_TOKEN`) en vez del `GITHUB_TOKEN`.
