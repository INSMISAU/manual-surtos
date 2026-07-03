/* Service Worker — Manual de Surtos INS
   Torna o manual utilizavel SEM internet.
   Como funciona: na 1a vez que abrir com internet, guarda o manual;
   depois abre offline. Muda o numero em CACHE_VERSION quando publicares
   conteudo novo (surtos-v1 -> surtos-v2) para forcar a atualizacao.
*/
const CACHE_VERSION = "surtos-v1";
const CORE = [
  "./",
  "./index.html",
  "./doenca.html",
  "./seccao.html",
  "./sindrome.html",
  "./explorar-seccao.html",
  "./explorar-sindrome.html",
  "./explorar-abecedario.html",
  "./emendas.html",
  "./glossario.html",
  "./perfil.html",
  "./pesquisa.html",
  "./assets/css/style.css",
  "./assets/js/content.js",
  "./assets/js/app.js"
];
 
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
  e.respondWith(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => { if (res && res.status === 200) cache.put(req, res.clone()); return res; })
          .catch(() => null);
        return cached || network.then((res) => res || cache.match("./index.html"));
      })
    )
  );
});
