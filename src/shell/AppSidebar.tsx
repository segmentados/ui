import { useState, type ComponentType, type ReactNode } from 'react';
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Tooltip } from '../primitives/Tooltip';
import { cn } from '../utils/cn';

/**
 * Sidebar de la suite, reutilizable por marca. Marca-agnóstico y framework-agnóstico: usa <a> + un
 * `activePath` (lo calcula la app host) en vez de react-router, así sirve tanto en apps SPA como en Astro.
 * La data (nav, brand, permisos, estado de colapso) la inyecta el host. Package-ready para @segmentados/ui.
 *
 * Soporta grupos ANIDADOS colapsables (`item.children`, recursivo) e íconos como componente
 * (`ComponentType`) o emoji/texto (`string`). BI usa items planos con ícono componente: sigue igual.
 */
export type SidebarIcon = ComponentType<{ className?: string }> | string;

export interface SidebarNavItem {
  id: string;
  label: string;
  /** Ruta destino. Opcional: un grupo sólo-cabecera (con children y sin path) alterna el colapso al click. */
  path?: string;
  icon?: SidebarIcon;
  permission?: string;
  soon?: boolean;
  /** Hijos → el item es un grupo colapsable (recursivo). */
  children?: SidebarNavItem[];
}
export interface SidebarNavSection {
  id: string;
  label?: string;
  items: SidebarNavItem[];
}

export type RenderLink = (props: {
  href: string;
  active: boolean;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) => ReactNode;

export interface AppSidebarProps {
  nav: SidebarNavSection[];
  brand: { name: string; logoSrc?: string };
  /** Path activo (ej. location.pathname). El item con `path === activePath` (o prefijo para no-root) se marca. */
  activePath?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  /** Gate de UI por permiso; si no se pasa, se muestran todos. */
  hasPermission?: (perm: string) => boolean;
  /** En el drawer mobile se muestra siempre expandido y sin botón de colapsar. */
  mobile?: boolean;
  onNavigate?: () => void;
  /**
   * Render del link. Default `<a href>` (sirve para Astro/MPA). En una SPA (react-router) pasá tu
   * `Link` acá: `renderLink={(p) => <Link to={p.href} className={p.className} onClick={p.onClick}>{p.children}</Link>}`.
   */
  renderLink?: RenderLink;
}

function defaultRenderLink({ href, active, className, onClick, children }: {
  href: string; active: boolean; className: string; onClick?: () => void; children: ReactNode;
}) {
  return (
    <a href={href} onClick={onClick} aria-current={active ? 'page' : undefined} className={className}>
      {children}
    </a>
  );
}

function isActive(itemPath: string | undefined, activePath?: string): boolean {
  if (!itemPath || !activePath) return false;
  if (itemPath === '/') return activePath === '/';
  return activePath === itemPath || activePath.startsWith(itemPath + '/');
}

/** ¿El item o algún descendiente matchea el path activo? (para abrir el grupo correcto). */
function anyActive(item: SidebarNavItem, activePath?: string): boolean {
  if (isActive(item.path, activePath)) return true;
  return (item.children ?? []).some((c) => anyActive(c, activePath));
}

function Glyph({ icon, className }: { icon?: SidebarIcon; className?: string }) {
  if (!icon) return <span className={className} aria-hidden />;
  if (typeof icon === 'string') {
    return (
      <span className={cn('inline-flex items-center justify-center text-[15px] leading-none', className)} aria-hidden>
        {icon}
      </span>
    );
  }
  const Icon = icon;
  return <Icon className={className} />;
}

const ICON_CLS = 'h-[18px] w-[18px] shrink-0';

function SoonBadge() {
  return (
    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white/60">
      Pronto
    </span>
  );
}

interface NodeProps {
  item: SidebarNavItem;
  depth: number;
  activePath?: string;
  collapsed: boolean;
  onNavigate?: () => void;
  hasPermission?: (perm: string) => boolean;
  renderLink: RenderLink;
}

function NavNode({ item, depth, activePath, collapsed, onNavigate, hasPermission, renderLink }: NodeProps) {
  const visibleChildren = (item.children ?? []).filter(
    (c) => !c.permission || !hasPermission || hasPermission(c.permission),
  );
  const hasChildren = visibleChildren.length > 0;
  const active = isActive(item.path, activePath);
  const descendantActive = hasChildren && visibleChildren.some((c) => anyActive(c, activePath));
  const [open, setOpen] = useState(descendantActive);

  const rowCls = (extra?: string) =>
    cn(
      'group flex items-center gap-3 rounded-lg py-2 text-[13px] font-medium transition-colors',
      collapsed ? 'justify-center px-0' : 'px-2.5',
      active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white',
      extra,
    );
  const indent = !collapsed && depth > 0 ? { paddingLeft: 10 + depth * 14 } : undefined;

  // Hoja: link simple.
  if (!hasChildren) {
    const link = renderLink({
      href: item.path ?? '#',
      active,
      className: rowCls(),
      onClick: onNavigate,
      children: (
        <>
          <Glyph icon={item.icon} className={ICON_CLS} />
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {item.soon && <SoonBadge />}
            </>
          )}
        </>
      ),
    });
    if (collapsed) {
      return <Tooltip content={item.label} side="right">{link}</Tooltip>;
    }
    return <div style={indent}>{link}</div>;
  }

  // Grupo colapsable. En modo colapsado mostramos sólo el ícono (tooltip) y no expandimos inline.
  const label = (
    <>
      <Glyph icon={item.icon} className={ICON_CLS} />
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
    </>
  );

  const header =
    item.path && !collapsed ? (
      // Cabecera navegable (link a su página) + chevron separado que alterna el colapso.
      <div className="flex items-center" style={indent}>
        {renderLink({ href: item.path, active, className: rowCls('flex-1 min-w-0'), onClick: onNavigate, children: label })}
        <button
          type="button"
          aria-label={open ? 'Colapsar' : 'Expandir'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 rounded-lg px-2 py-2 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
        </button>
      </div>
    ) : (
      // Cabecera sólo-toggle (grupo header-only, o colapsado).
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={rowCls('w-full')}
        style={indent}
        title={collapsed ? item.label : undefined}
      >
        {label}
        {!collapsed && <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />}
      </button>
    );

  return (
    <div>
      {collapsed ? <Tooltip content={item.label} side="right">{header}</Tooltip> : header}
      {open && !collapsed && (
        <div className="mt-0.5 space-y-0.5">
          {visibleChildren.map((child) => (
            <NavNode
              key={child.id}
              item={child}
              depth={depth + 1}
              activePath={activePath}
              collapsed={collapsed}
              onNavigate={onNavigate}
              hasPermission={hasPermission}
              renderLink={renderLink}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function AppSidebar({
  nav,
  brand,
  activePath,
  collapsed: collapsedProp = false,
  onToggleCollapse,
  hasPermission,
  mobile = false,
  onNavigate,
  renderLink = defaultRenderLink,
}: AppSidebarProps) {
  const collapsed = mobile ? false : collapsedProp;
  const topVisible = (item: SidebarNavItem) => !item.permission || !hasPermission || hasPermission(item.permission);

  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-[var(--sidebar)] text-[var(--sidebar-foreground)] transition-[width] duration-200',
        collapsed ? 'w-16' : 'w-60',
      )}
      aria-label="Navegación principal"
    >
      <div className={cn('flex h-14 items-center gap-2.5 px-4', collapsed && 'justify-center px-0')}>
        {brand.logoSrc && (
          <img src={brand.logoSrc} alt={brand.name} className="h-8 w-8 shrink-0 rounded-lg object-contain" />
        )}
        {!collapsed && <span className="text-[15px] font-semibold tracking-tight">{brand.name}</span>}
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-2.5 py-3">
        {nav.map((section) => {
          const items = section.items.filter(topVisible);
          if (items.length === 0) return null;
          return (
            <div key={section.id}>
              {!collapsed && section.label && (
                <div className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  {section.label}
                </div>
              )}
              <div className="space-y-0.5">
                {items.map((item) => (
                  <NavNode
                    key={item.id}
                    item={item}
                    depth={0}
                    activePath={activePath}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                    hasPermission={hasPermission}
                    renderLink={renderLink}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {!mobile && onToggleCollapse && (
        <div className="border-t border-white/10 p-2.5">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white',
              collapsed && 'justify-center px-0',
            )}
          >
            {collapsed ? <PanelLeftOpen className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
            {!collapsed && <span>Colapsar</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
