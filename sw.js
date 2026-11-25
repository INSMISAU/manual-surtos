/* Service Worker — Manual de Surtos INS
   Mostra SEMPRE a versao mais recente com internet (acaba com os "varios refreshes")
   e funciona offline. Sobe CACHE_VERSION quando publicares (v5 -> v6). */
const CACHE_VERSION = "surtos-final-v201-guias-20261125";
const CACHE_PREFIX = "ins-manual:" + new URL(self.registration.scope).pathname + ":";
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;

const CORE = [
  "./ajuda.html",
  "./assets/js/validation-access.js?v=20261124",
  "./assets/js/academy-return.js",
  "./assets/icons/simbolos-sindromicos-aprovados-20261123.png",
  "./assets/css/figures.css",
  "./assets/css/image-viewer.css",
  "./assets/css/style.css",
  "./assets/fig/chart-palette.svg",
  "./assets/fig/fig-chitima.png",
  "./assets/fig/fig1.svg",
  "./assets/fig/fig2.png",
  "./assets/fig/fig3.png",
  "./assets/fig/fig4.png",
  "./assets/fig/fig5.png",
  "./assets/fig/fig6.png",
  "./assets/fig/fig7.png",
  "./assets/icons/sindromes.png",
  "./assets/ilustracoes/alimentos-armazenamento-inadequado-cdc-5427.jpg",
  "./assets/ilustracoes/alimentos-preparacao-ouagadougou-ilri.jpg",
  "./assets/ilustracoes/amarela-vacinacao-angola-cdc-real-ef-20261015.jpg",
  "./assets/ilustracoes/aves-usda-d4817-1-fontes-20261015.jpg",
  "./assets/ilustracoes/carbunculo-surto-etiopia-wassie-2022.png",
  "./assets/ilustracoes/cchf-mauritania-2019.jpg",
  "./assets/ilustracoes/cdc-phil-10705-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-11162-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-1207-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-13102-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-13481-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-13482-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-13534-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-15908-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-17994-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-18263-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-18427-africa-riscos-20261120.jpg",
  "./assets/ilustracoes/cdc-phil-1921-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19292-africa-riscos-20261120.jpg",
  "./assets/ilustracoes/cdc-phil-19360-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19371-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19622-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19683-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19825-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19829-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19972-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19976-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-19997-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-20015-africa-riscos-20261120.jpg",
  "./assets/ilustracoes/cdc-phil-20077-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-20612-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-20939-africa-riscos-20261120.jpg",
  "./assets/ilustracoes/cdc-phil-20940-africa-riscos-20261120.jpg",
  "./assets/ilustracoes/cdc-phil-20950-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-21427-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-2175-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-2176-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-22355-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-22399-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-22472-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-22506-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-22800-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-22906-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-23090-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-23174-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-23209-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-24857-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-24872-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-24898-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-25124-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-25614-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-26246-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-27015-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-273-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-2739-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-2791-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-28446-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-28616-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-29185-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-29417-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-3008-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-30342-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-30535-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-31389-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-31584-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-32075-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-3853-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-5301-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-5319-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-5445-fontes-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-6093-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-6470-revisao-20261015.jpg",
  "./assets/ilustracoes/cdc-phil-8238-revisao-20261015.jpg",
  "./assets/ilustracoes/cde-20261021-01.webp",
  "./assets/ilustracoes/cde-20261021-02.webp",
  "./assets/ilustracoes/cde-20261021-04.webp",
  "./assets/ilustracoes/cde-20261021-05.webp",
  "./assets/ilustracoes/cde-20261021-06.webp",
  "./assets/ilustracoes/cde-20261021-07.webp",
  "./assets/ilustracoes/cde-20261021-08.webp",
  "./assets/ilustracoes/cde-20261021-09.webp",
  "./assets/ilustracoes/cde-20261021-10.webp",
  "./assets/ilustracoes/cde-20261021-11.webp",
  "./assets/ilustracoes/cde-20261021-14.webp",
  "./assets/ilustracoes/cde-20261021-15.webp",
  "./assets/ilustracoes/cde-20261021-16.webp",
  "./assets/ilustracoes/cde-20261021-17.webp",
  "./assets/ilustracoes/cde-20261021-18.webp",
  "./assets/ilustracoes/cde-20261021-20.webp",
  "./assets/ilustracoes/cde-20261021-21.webp",
  "./assets/ilustracoes/cde-20261021-22.webp",
  "./assets/ilustracoes/cde-20261021-23.webp",
  "./assets/ilustracoes/cde-20261021-24.webp",
  "./assets/ilustracoes/cde-20261021-25.webp",
  "./assets/ilustracoes/cde-20261021-27.webp",
  "./assets/ilustracoes/cde-20261021-28.webp",
  "./assets/ilustracoes/cde-20261021-29.webp",
  "./assets/ilustracoes/cde-20261021-30.webp",
  "./assets/ilustracoes/cde-20261021-31.webp",
  "./assets/ilustracoes/cde-20261021-32.webp",
  "./assets/ilustracoes/cde-20261021-33.webp",
  "./assets/ilustracoes/cde-20261021-34.webp",
  "./assets/ilustracoes/cde-20261021-35.webp",
  "./assets/ilustracoes/cde-20261021-37.webp",
  "./assets/ilustracoes/cde-20261021-38.webp",
  "./assets/ilustracoes/cde-20261021-39.webp",
  "./assets/ilustracoes/cde-20261021-40.webp",
  "./assets/ilustracoes/cde-20261021-41.webp",
  "./assets/ilustracoes/cde-20261021-42.webp",
  "./assets/ilustracoes/cde-20261021-43.webp",
  "./assets/ilustracoes/cde-20261021-44.webp",
  "./assets/ilustracoes/cde-20261021-45.webp",
  "./assets/ilustracoes/cde-20261021-46.webp",
  "./assets/ilustracoes/cde-20261021-47.webp",
  "./assets/ilustracoes/cde-20261021-48.webp",
  "./assets/ilustracoes/cde-20261021-49.webp",
  "./assets/ilustracoes/cde-20261021-51.webp",
  "./assets/ilustracoes/cde-20261021-52.webp",
  "./assets/ilustracoes/cde-20261021-53.webp",
  "./assets/ilustracoes/cde-20261021-54.webp",
  "./assets/ilustracoes/cde-20261021-55.webp",
  "./assets/ilustracoes/cde-20261021-56.webp",
  "./assets/ilustracoes/cde-20261021-57.webp",
  "./assets/ilustracoes/cde-20261021-58.webp",
  "./assets/ilustracoes/cde-20261021-59.webp",
  "./assets/ilustracoes/cde-20261021-60.webp",
  "./assets/ilustracoes/chikungunya-criadouro-etiopia-yared-2024-painel-c.png",
  "./assets/ilustracoes/colera-misau-2009-p32.jpg",
  "./assets/ilustracoes/colera-tratamento-mocambique-oms-2019.jpg",
  "./assets/ilustracoes/contacto-familiar-cdc-real-cd-20261014.jpg",
  "./assets/ilustracoes/covid-19-anao-aprovada-gp-20261023.jpeg",
  "./assets/ilustracoes/crimeia-cdc-real-lote3-20261014.jpg",
  "./assets/ilustracoes/crimeia-hyalomma-estudo-fontes-20261015.jpg",
  "./assets/ilustracoes/dengue-aedes-albopictus-cdc-real-revisao-20261015.jpg",
  "./assets/ilustracoes/dermatite-serpiginosa-sudao-shamad-2024.jpg",
  "./assets/ilustracoes/ebola-doentes-msf-bambu-2026-gp.jpg",
  "./assets/ilustracoes/febre-amarela-doente-angola-2016-real-final-20261015.jpg",
  "./assets/ilustracoes/filariase-avaliacao-cobertura-cdc-real-ef-20261015.jpg",
  "./assets/ilustracoes/filariase-culex-vector-cdc-real-ef-20261015.jpg",
  "./assets/ilustracoes/filariase-elefantiase-publicacao-2023-real-cm-20261015.jpg",
  "./assets/ilustracoes/filariase-perna-publicacao-2024-real-cm-20261015.jpg",
  "./assets/ilustracoes/gravidez-cagole-cicv-2020.webp",
  "./assets/ilustracoes/gripe-aves-mercado-xipamanine-ilri.jpg",
  "./assets/ilustracoes/hepatite-alimentos-maputo-estudo-2021.jpg",
  "./assets/ilustracoes/hepatite-ictericia-ocular-real-lote4-20261014.jpg",
  "./assets/ilustracoes/hfrs-tomografia-renal-real-ef-20261015.jpg",
  "./assets/ilustracoes/lassa-avaliacao-pulso-2017-real-final-20261015.jpg",
  "./assets/ilustracoes/lassa-cuidados-alima-publicacao-2025-gp.jpg",
  "./assets/ilustracoes/lassa-investigacao-2015-real-cm-20261015.jpg",
  "./assets/ilustracoes/lepra-barreira-acesso-comunidade-cdc-19628.jpg",
  "./assets/ilustracoes/lepra-casos-mesma-familia-nair-2017.jpg",
  "./assets/ilustracoes/lepra-manchas-publicacao-2025-real-cm-20261015.webp",
  "./assets/ilustracoes/lepto-cheias-mocambique-2019-real-cm-20261015.jpg",
  "./assets/ilustracoes/lepto-patel-2023-fontes-20261015.jpg",
  "./assets/ilustracoes/leptospirose-marrocos-hachad-2024.jpg",
  "./assets/ilustracoes/marburg-morcego-estudo-2023-fontes-20261015.jpg",
  "./assets/ilustracoes/mastomys-estudo-2013-fontes-20261015.jpg",
  "./assets/ilustracoes/meningite-berrini-aprovada-gp-20261023.jpeg",
  "./assets/ilustracoes/meningite-verificacao-cartao-cdc-23093.jpg",
  "./assets/ilustracoes/mers-avaliacao-respiratoria-real-pv-20261015.jpg",
  "./assets/ilustracoes/mers-camelos-wajir-ilri-gangale.jpg",
  "./assets/ilustracoes/mpox-evolucao-cdc-mmwr-2025.gif",
  "./assets/ilustracoes/mpox-ins-2025-documento.png",
  "./assets/ilustracoes/mpox-investigacao-domicilio-2021-real-cm-20261015.jpg",
  "./assets/ilustracoes/mpox-pcr-gana-2022-real-revisao-20261015.jpg",
  "./assets/ilustracoes/nci-catheter-fontes-20261015.jpg",
  "./assets/ilustracoes/nci-oral-fontes-20261015.jpg",
  "./assets/ilustracoes/parotidite-cdc-real-lote2-20261014.jpg",
  "./assets/ilustracoes/path-sro-malawi.jpg",
  "./assets/ilustracoes/pertussis-cdc-real-lote3-20261014.jpg",
  "./assets/ilustracoes/peste-bubao-drenagem-real-pv-20261015.jpg",
  "./assets/ilustracoes/peste-cdc-real-20261014.jpg",
  "./assets/ilustracoes/peste-investigacao-pulgas-cdc-14323.jpg",
  "./assets/ilustracoes/peste-pulga-real-revisao-20261015.jpg",
  "./assets/ilustracoes/polio-crianca-nao-vacinada-cdc-19879.jpg",
  "./assets/ilustracoes/polio-misau-2009-capa.png",
  "./assets/ilustracoes/raiva-cism-documento.png",
  "./assets/ilustracoes/raiva-contacto-caes-mocambique-teemages-2014.jpg",
  "./assets/ilustracoes/raiva-exposicao-mordedura-real-pv-20261015.jpg",
  "./assets/ilustracoes/raiva-vacinacao-serengeti-scirep-2023-fig1.png",
  "./assets/ilustracoes/raiva-veterinarios-real-pv-20261015.jpg",
  "./assets/ilustracoes/renal-ambiente-excrementos-cdc-14340.jpg",
  "./assets/ilustracoes/renal-roedores-campo-malawi-2022.jpg",
  "./assets/ilustracoes/rift-agricultora-ilri-burundi-2022.jpg",
  "./assets/ilustracoes/rift-colheita-ovino-cdc-real-lote4-20261014.jpg",
  "./assets/ilustracoes/rift-ordenha-ilri-2019.jpg",
  "./assets/ilustracoes/rift-retinite-clinica-real-ef-20261015.jpg",
  "./assets/ilustracoes/rota-crianca-prevencao-2014-real-cm-20261015.jpg",
  "./assets/ilustracoes/rotavirus-agua-boromata-unicef-2007.jpg",
  "./assets/ilustracoes/rubeola-cdc-real-20261014.jpg",
  "./assets/ilustracoes/rubeola-src-cataratas-real-pv-20261015.jpg",
  "./assets/ilustracoes/saneamento-guara-guara-susana-2011.jpg",
  "./assets/ilustracoes/sangue-colheita-profissional-cdc-real-ef-20261015.jpg",
  "./assets/ilustracoes/sarampo-espirro-real-revisao-20261015.jpg",
  "./assets/ilustracoes/sarampo-misau-2009-p91.jpg",
  "./assets/ilustracoes/tifoide-cdc-real-lote3-20261014.jpg",
  "./assets/ilustracoes/tifoide-mauricias-cdc6460.jpg",
  "./assets/ilustracoes/tuberculose-cough-officers-maputo-cdc-2019.jpg",
  "./assets/ilustracoes/tuberculose-pessoa-tosse-cdc-gp.jpg",
  "./assets/ilustracoes/tungiase-ambiente-estudo-2023-fontes-20261015.jpg",
  "./assets/ilustracoes/tungiase-cdc-real-20261014.jpg",
  "./assets/ilustracoes/tungiase-lesoes-pub2026-real-pv-20261015.png",
  "./assets/ilustracoes/varicela-lesoes-pub2024-real-pv-20261015.png",
  "./assets/ilustracoes/varicela-profissionais-real-pv-20261015.jpg",
  "./assets/ilustracoes/viagem-avaliacao-sanitaria-cdc-real-cd-20261014.jpg",
  "./assets/ilustracoes/vsr-lactente-nhs-publicacao-2025-gp.jpeg",
  "./assets/ilustracoes/zika-aedes-real-revisao-20261015.jpg",
  "./assets/img/cover.jpg",
  "./assets/img/logos.png",
  "./assets/js/app.js",
  "./assets/js/content.js",
  "./assets/js/galeria.js",
  "./assets/js/image-sources.js",
  "./assets/js/image-viewer.js",
  "./assets/js/photo-privacy.js",
  "./como-utilizar.html",
  "./ddata.js",
  "./doenca.html",
  "./emendas.html",
  "./explorar-abecedario.html",
  "./explorar-seccao.html",
  "./explorar-sindrome.html",
  "./fiche-assets.js",
  "./glossario.html",
  "./i192.png",
  "./i512.png",
  "./imagens.html",
  "./index.html",
  "./manifest.json",
  "./manual.html",
  "./manual.pdf",
  "./perfil.html",
  "./pesquisa.html",
  "./seccao.html",
  "./sindrome.html",
  "./sw.js"
];
const STATIC_RX = /\.(css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|pdf)$/i;
const DATA_RX = /(content|ddata|cms_data|fiche-assets|app)\.js$/i;

// Só activar uma versão cuja base de leitura esteja integralmente guardada.
const REQUIRED = CORE;
self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      // Só activar quando todo o leitor público estiver disponível sem rede.
      for (let i = 0; i < REQUIRED.length; i += 8) {
        await cache.addAll(REQUIRED.slice(i, i + 8));
      }
    } catch (error) {
      await caches.delete(CACHE_NAME);
      throw error;
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function pdfRangeResponse(request, response) {
  const range = request.headers.get("Range");
  if (!range || response.status !== 200) return response;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(range.trim());
  if (!match) return response;
  const data = await response.arrayBuffer(), length = data.byteLength;
  let start, end;
  if (match[1] === "") {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return new Response(null, {status:416,headers:{"Content-Range":"bytes */"+length}});
    start = Math.max(0,length-suffix); end = length-1;
  } else {
    start = Number(match[1]); end = match[2] === "" ? length-1 : Number(match[2]);
  }
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= length || end < start) {
    return new Response(null, {status:416,headers:{"Content-Range":"bytes */"+length}});
  }
  end = Math.min(end,length-1);
  const headers = new Headers(response.headers);
  headers.delete("Content-Encoding"); headers.delete("Transfer-Encoding");
  headers.set("Content-Range","bytes "+start+"-"+end+"/"+length);
  headers.set("Content-Length",String(end-start+1)); headers.set("Accept-Ranges","bytes");
  return new Response(data.slice(start,end+1),{status:206,statusText:"Partial Content",headers});
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const isPage = req.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/");
  const isData = DATA_RX.test(url.pathname);
  const isStatic = STATIC_RX.test(url.pathname);
  if (/\.pdf$/i.test(url.pathname)) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      let response = await cache.match(req,{ignoreSearch:true});
      if (!response) {
        const headers = new Headers(req.headers); headers.delete("Range");
        response = await fetch(new Request(req,{headers}));
        if (response.status === 200) {
          const key = new URL(req.url); key.search = "";
          await cache.put(key.href,response.clone());
        }
      }
      return pdfRangeResponse(req,response);
    })().catch(() => Response.error()));
    return;
  }
  if (isPage || (isData && !isStatic)) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
        return res;
      }).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req) || (isPage ? await cache.match(req, {ignoreSearch:true}) : null);
        return cached || (isPage ? await cache.match("./index.html") : null) || Response.error();
      })
    );
    return;
  }
  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => cache.match(req)).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => null);
      return cached || network.then((res) => res || Response.error());
    })
  );
});











