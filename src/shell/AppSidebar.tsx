import type { ComponentType, ReactNode } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Tooltip } from '../primitives/Tooltip';
import { cn } from '../utils/cn';

/**
 * Sidebar de la suite, reutilizable por marca. Marca-agnóstico y framework-agnóstico: usa <a> + un
 * `activePath` (lo calcula la app host) en vez de react-router, así sirve tanto en apps SPA como en Astro.
 * La data (nav, brand, permisos, estado de colapso) la inyecta el host. Package-ready para @segmentados/ui.
 */
export interface SidebarNavItem {
  id: string;
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  permission?: string;
  soon?: boolean;
}
export interface SidebarNavSection {
  id: string;
  label?: string;
  items: SidebarNavItem[];
}

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
   * `Link` acá para navegación cliente: `renderLink={(p) => <Link to={p.href} className={p.className} onClick={p.onClick}>{p.children}</Link>}`.
   */
  renderLink?: (props: { href: string; active: boolean; className: string; onClick?: () => void; children: ReactNode }) => ReactNode;
}

function defaultRenderLink({ href, active, className, onClick, children }: { href: string; active: boolean; className: string; onClick?: () => void; children: ReactNode }) {
  return (
    <a href={href} onClick={onClick} aria-current={active ? 'page' : undefined} className={className}>
      {children}
    </a>
  );
}

function isActive(itemPath: string, activePath?: string): boolean {
  if (!activePath) return false;
  if (itemPath === '/') return activePath === '/';
  return activePath === itemPath || activePath.startsWith(itemPath + '/');
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
  const visible = (item: SidebarNavItem) => !item.permission || !hasPermission || hasPermission(item.permission);

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
          const items = section.items.filter(visible);
          if (items.length === 0) return null;
          return (
            <div key={section.id}>
              {!collapsed && section.label && (
                <div className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  {section.label}
                </div>
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path, activePath);
                  const className = cn(
                    'group flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors',
                    collapsed && 'justify-center px-0',
                    active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white',
                  );
                  const link = renderLink({
                    href: item.path,
                    active,
                    className,
                    onClick: onNavigate,
                    children: (
                      <>
                        <Icon className="h-[18px] w-[18px] shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.soon && (
                              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white/60">
                                Pronto
                              </span>
                            )}
                          </>
                        )}
                      </>
                    ),
                  });
                  return collapsed ? (
                    <Tooltip key={item.id} content={item.label} side="right">
                      {link}
                    </Tooltip>
                  ) : (
                    <div key={item.id}>{link}</div>
                  );
                })}
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
