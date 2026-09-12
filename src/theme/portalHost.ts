/**
 * El nodo del que cuelgan los portales del DS (modales, toasts).
 *
 * ── El problema que resuelve ─────────────────────────────────────────────────────────────────────
 * Un portal a `document.body` sale del árbol de la app. Si el consumidor scopea los tokens a un
 * contenedor —como hace `MintScope` en la suite, que pinta las custom properties sobre un div— todo lo
 * que sale por un portal queda FUERA de ese contenedor y hereda lo que haya en el host: un modal con la
 * paleta de otra app, o sin paleta.
 *
 * ── Por qué un nodo propio y no `document.body` ──────────────────────────────────────────────────
 * Porque a un nodo propio le podemos aplicar los tokens del tema (lo hace `ThemeProvider`), y a `body`
 * no siempre: es del host, y pisarlo sería que el DS se apropie de un elemento que no le pertenece.
 * Sigue colgando de `body`, así que el apilamiento no cambia.
 */
const ATTR = 'data-ds-portal-root';

export function getPortalHost(): HTMLElement | null {
  if (typeof document === 'undefined') return null;

  const existente = document.querySelector<HTMLElement>(`[${ATTR}]`);
  if (existente) return existente;

  const host = document.createElement('div');
  host.setAttribute(ATTR, '');
  // Sin caja propia: es un ancla, no un contenedor. Cada portal se posiciona por su cuenta y un host
  // con tamaño taparía la página.
  host.style.display = 'contents';
  document.body.appendChild(host);
  return host;
}
