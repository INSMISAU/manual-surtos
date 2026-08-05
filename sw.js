/* Service Worker — Manual de Surtos INS
   Mostra SEMPRE a versao mais recente com internet (acaba com os "varios refreshes")
   e funciona offline. Sobe CACHE_VERSION quando publicares (v5 -> v6). */
const CACHE_VERSION = "surtos-v59";

const CORE = [
  "./","./index.html","./doenca.html","./seccao.html","./sindrome.html",
  "./explorar-seccao.html","./explorar-sindrome.html","./explorar-abecedario.html",
  "./emendas.html","./glossario.html","./perfil.html","./pesquisa.html",
  "./content.js","./ddata.js","./cms_data.js","./fiche-assets.js","./app.js",
  "./assets/js/content.js","./assets/js/app.js","./assets/css/style.css",
  "./assets/ilustracoes/conjuntivite-caso.jpg",
  "./assets/icones/agregado-familiar.svg","./assets/icones/gravidez.svg","./assets/icones/populacoes.svg","./assets/icones/profissionais-saude.svg","./assets/icones/roedores.svg","./assets/ilustracoes/crimeia-congo-caso.jpg","./assets/ilustracoes/mpox-caso.jpg","./assets/ilustracoes/mpox-laboratorio.jpg","./assets/ilustracoes/parotidite-laboratorio.jpg","./assets/ilustracoes/peste-caso.jpg","./assets/ilustracoes/rubeola-transmissao.jpg","./assets/ilustracoes/sarampo-laboratorio.jpg","./assets/ilustracoes/sarampo-transmissao.jpg","./assets/ilustracoes/sindrome-respiratorias.jpg","./assets/ilustracoes/varicela-laboratorio.jpg","./assets/ilustracoes/rubeola-caso.jpg","./assets/ilustracoes/vsr-caso.jpg","./assets/ilustracoes/sarampo-caso.jpg","./assets/ilustracoes/varicela-caso.jpg","./assets/ilustracoes/parotidite-caso.jpg","./assets/ilustracoes/mers-ilustracao.jpg","./assets/ilustracoes/zika-vetor.jpg","./assets/ilustracoes/poliomielite-caso.jpg","./assets/ilustracoes/colera-contexto.jpg","./assets/ilustracoes/leptospirose-vetor.jpg","./assets/ilustracoes/dermatite-serpiginosa-caso.jpg","./assets/ilustracoes/gripe-caso.jpg","./assets/ilustracoes/covid-caso.jpg","./assets/ilustracoes/meningite-caso.jpg","./assets/ilustracoes/pertussis-caso.jpg","./assets/ilustracoes/tuberculose-caso.jpg","./assets/ilustracoes/escabiose-caso.jpg","./assets/ilustracoes/filariase-caso.jpg","./assets/ilustracoes/lepra-caso.jpg","./assets/ilustracoes/tungiase-caso.jpg","./assets/ilustracoes/inf-bacterianas-caso.jpg","./assets/ilustracoes/norovirus-caso.jpg","./assets/ilustracoes/rotavirus-caso.jpg","./assets/ilustracoes/febre-tifoide-caso.jpg","./assets/ilustracoes/ebola-caso.jpg","./assets/ilustracoes/lassa-caso.jpg","./assets/ilustracoes/fhsr-caso.jpg","./assets/ilustracoes/hepatite-caso.jpg","./assets/ilustracoes/febre-amarela-caso.jpg","./assets/ilustracoes/raiva-vetor.jpg","./assets/ilustracoes/peste-vetor.jpg","./assets/ilustracoes/dengue-vetor.jpg","./assets/ilustracoes/rift-vetor.jpg","./assets/ilustracoes/marburg-vetor.jpg"
];
const STATIC_RX = /\.(css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|pdf)$/i;
const DATA_RX = /(content|ddata|cms_data|fiche-assets|app)\.js$/i;

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
