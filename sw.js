/* Service Worker — Manual de Surtos INS
   Torna o manual utilizavel SEM internet, mostrando SEMPRE a versao mais
   recente quando ha internet (corrige o problema dos "varios refreshes").

   Estrategia:
   - Paginas (HTML) e dados (content.js, ddata.js, cms_data.js): NETWORK-FIRST.
     Com internet, vai buscar a versao fresca ao servidor e actualiza a cache;
     sem internet, usa a ultima versao guardada. Assim, o que for publicado
     aparece de imediato, sem obrigar o utilizador a varios refreshes.
   - Recursos estaticos (css, imagens, fontes, icones): CACHE-FIRST, por rapidez.
   Sobe o numero em CACHE_VERSION sempre que publicares (v3 -> v4).
*/
const CACHE_VERSION = "surtos-v3";

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
  // dados (podem estar na raiz ou em assets/js — allSettled ignora os que faltarem)
  "./content.js",
  "./ddata.js",
  "./cms_data.js",
  "./app.js",
  "./assets/js/content.js",
  "./assets/js/app.js",
  "./assets/css/style.css"
];

// Extensoes tratadas como "estaticas" (cache-first).
const STATIC_RX = /\.(css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|pdf)$/i;
// Ficheiros de dados que devem ser sempre frescos (network-first).
const DATA_RX = /(content|ddata|cms_data)\.js$/i;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then((c) => Promise.allSettled(CORE.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener