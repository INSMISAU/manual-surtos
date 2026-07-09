/* Service Worker — Manual de Surtos INS
   Mostra SEMPRE a versao mais recente com internet (acaba com os "varios refreshes")
   e funciona offline. Sobe CACHE_VERSION quando publicares (v4 -> v5). */
const CACHE_VERSION = "surtos-v4";

const CORE = [
  "./","./index.html","./doenca.html","./seccao.html","./sindrome.html",
  "./explorar-seccao.html","./explorar-sindrome.html","./explorar-abecedario.html",
  "./emendas.html","./glossario.html","./perfil.html","./pesquisa.html",
  "./content.js","./ddata.js","./cms_data.js","./fiche-assets.js","./app.js",
  "./assets/js/content.js","./assets/js/app.js","./assets/css/style.css"
];
const STATIC_RX = /\.(css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|pdf)$/i;
const DATA_RX = /(content|ddata|cms_data|fiche-assets)\.js$/i;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then((c) => Promise.allSettled(CORE.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const isPage = req.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/");
  const isData = DATA_RX.test(url.pathname);
  const isStatic = STATIC_RX.test(url.pathname);
  if (isPage || (isData && !isStatic)) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE_VERSION).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE_VERSION).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => null);
      return cached || network.then((res) => res || caches.match("./index.html"));
    })
  );
});
