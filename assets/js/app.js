/* ============================================================
   App — Manual de Surtos (plataforma de digitalizacao, INS)
   Renderizacao partilhada. Dados em window.MANUAL (content.js)
   ============================================================ */
(function(){
const M = window.MANUAL || {};

const I = {
  burger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h7v17H6a2 2 0 0 0-2 2zM20 5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9 13h6M9 17h6M9 9h2"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
};

const ICON_FILES=new Set(['sindrome_febris','neurologicas','conjutivite','gastro','sindromes',
  'historico','respiratorias','epidemiologic','sindrome']);
function groupIcon(slug){
  const f=ICON_FILES.has(slug)?slug:'sindrome';
  return '<img class="dico" src="assets/icons/'+f+'.png" alt="" loading="lazy">';
}

function esc(s){return (s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function deaccent(s){return (s||'').toLowerCase()
  .replace(/[áàâãä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i')
  .replace(/[óòôõö]/g,'o').replace(/[úùûü]/g,'u').replace(/ç/g,'c');}
function boldLabel(t){
  const m=t.match(/^([^:]{2,60}):\s+(.+)$/);
  if(m) return '<b>'+esc(m[1])+':</b> '+esc(m[2]);
  return esc(t);
}
function renderBlocks(blocks){
  let html='',inList=false;
  const closeList=()=>{ if(inList){html+='</ul>';inList=false;} };
  (blocks||[]).forEach(b=>{
    if(b.type==='li'){ if(!inList){html+='<ul>';inList=true;} html+='<li>'+boldLabel(b.text)+'</li>'; }
    else { closeList();
      if(b.type==='h3') html+='<h3>'+esc(b.text)+'</h3>';
      else if(b.type==='h4') html+='<h4>'+esc(b.text)+'</h4>';
      else html+='<p>'+boldLabel(b.text)+'</p>';
    }
  });
  closeList();
  return html;
}
function param(k){return new URLSearchParams(location.search).get(k);}

function header(o){
  o=o||{};
  const back = o.back
    ? '<button class="backlink" onclick="history.length>1?history.back():location.href=\'index.html\'">'+I.back+' Voltar</button>'
    : '<button class="icon-btn burger" aria-label="menu">'+I.burger+'</button>';
  const searchBox = o.search!==false
    ? '<div class="search">'+I.search+'<input value="'+esc(o.q||'')+'" placeholder="Pesquisar sobre Manual, Síndromes ou Protocolos" onkeydown="if(event.key===\'Enter\')location.href=\'pesquisa.html?q=\'+encodeURIComponent(this.value)"></div>'
    : '';
  return '<header class="hdr"><div class="hdr-top">'+back+
    '<span class="crumb">'+esc(o.crumb||'')+'</span><span class="spacer"></span>'+
    '<button class="icon-btn">'+I.search+'</button><button class="icon-btn">'+I.bell+'</button></div>'+
    (o.title?'<h1 class="page-title">'+o.title+'</h1>':'')+
    (o.sub?'<p class="page-sub">'+esc(o.sub)+'</p>':'')+searchBox+'</header>';
}
function tabbar(active){
  const tabs=[['index.html','home','Início'],['explorar-seccao.html','map','Explorar'],
    ['emendas.html','doc','Emendas'],['glossario.html','book','Glossário'],['perfil.html','user','Perfil']];
  return '<nav class="tabbar">'+tabs.map(t=>
    '<a class="tab '+(active===t[1]?'active':'')+'" href="'+t[0]+'">'+I[t[1]]+'<span>'+t[2]+'</span></a>').join('')+'</nav>';
}
function mount(headerOpts, bodyHtml, activeTab){
  document.body.innerHTML='<div class="app">'+header(headerOpts)+'<main class="body">'+bodyHtml+'</main></div>'+tabbar(activeTab);
}

function pageHome(){
  const card=(href,t,extra)=>'<a class="nav-card" href="'+href+'"><span class="t">'+t+'</span>'+(extra||'')+'</a>';
  const body=
    coverBlock()+
    card('explorar-seccao.html','Explorar por Secção')+
    card('explorar-sindrome.html','Explorar por Síndrome','<span class="ico"><img class="dico" src="assets/icons/sindromes.png" alt=""></span>')+
    card('explorar-abecedario.html','Explorar por Abecedário','<span class="az">A-Z</span>')+
    '<div style="height:6px"></div>'+
    '<a class="hero" href="doenca.html?slug=colera"><img src="assets/img/hero-colera.jpg" alt="">'+
      '<div class="scrim"></div><div class="ct"><h3>Atualização<br>do Protocolo<br>de Cólera</h3><span class="tag">Emenda</span></div></a>'+
    '<p class="hero-meta">Veja as últimas V1.0 — Atualização do Protocolo de Cólera<br>Publicado em: 20/05/2026 · Secção 4</p>'+
    '<button class="pill carmine" onclick="location.href=\'doenca.html?slug=colera\'">'+I.download+' Baixar PDF</button>'+
    '<div class="recent">Os seus registos de leitura recente aparecerão aqui</div>';
  mount({crumb:'Estrutura de Exploração do Manual',title:'Estrutura de<br><span class="thin">Exploração do Manual</span>',search:true},body,'home');
}

function SECT_TITLE(id){
  const s=(M.sections||[]).find(s=>s.id===id);
  if(s) return s.title;
  if(id===4) return 'Vigilância Sindrómica';
  return '';
}
function pageExplorarSeccao(){
  const secInfo={1:'Panorama, objectivos, princípios e público-alvo do manual.',
    2:'Competências essenciais e fluxo de notificação e resposta a surtos.',
    3:'Orientações gerais e classificação dos tipos de surto.',
    4:'Detecção e resposta por condição de vigilância sindrómica.',
    5:'Passos da investigação de surtos no terreno.',
    6:'Considerações éticas na investigação de surtos.'};
  const body=[1,2,3,4,5,6].map(id=>{
    const href=id===4?'explorar-sindrome.html':('seccao.html?id='+id);
    return '<div class="sec-card"><h3>SECÇÃO '+id+': '+esc(SECT_TITLE(id))+'</h3>'+
      '<p>'+esc(secInfo[id])+'</p>'+
      '<button class="pill" onclick="location.href=\''+href+'\'">Saiba Mais '+I.arrow+'</button></div>';
  }).join('');
  mount({crumb:'Explorar',title:'Explorar<br><span class="thin">por Secção</span>'},body,'map');
}

function figHtml(f){return '<figure class="fig"><img src="'+f.file+'" alt="'+esc(f.caption)+'" loading="lazy">'+
  '<figcaption><b>Figura '+f.num+'.</b> '+esc(f.caption.replace(/^Figura\s+\d+\.\s*/,''))+'</figcaption></figure>';}
function renderSectionContent(sec){
  const figs=(sec.figures||[]).slice(); const used=new Set();
  let html='',inList=false; const closeList=()=>{ if(inList){html+='</ul>';inList=false;} };
  (sec.blocks||[]).forEach(b=>{
    if(b.type==='li'){ if(!inList){html+='<ul>';inList=true;} html+='<li>'+boldLabel(b.text)+'</li>'; }
    else { closeList();
      if(b.type==='h3') html+='<h3>'+esc(b.text)+'</h3>';
      else if(b.type==='h4') html+='<h4>'+esc(b.text)+'</h4>';
      else html+='<p>'+boldLabel(b.text)+'</p>'; }
    figs.forEach(f=>{ if(!used.has(f.num) && b.text.indexOf('Figura '+f.num)>=0){ closeList(); html+=figHtml(f); used.add(f.num);} });
  });
  closeList();
  const rest=figs.filter(f=>!used.has(f.num));
  if(rest.length) html+='<div class="figs-h">Figuras</div>'+rest.map(figHtml).join('');
  return html;
}
function coverBlock(){
  return '<div class="cover"><img class="ph" src="assets/img/cover.jpg" alt="Capa oficial do manual">'+
    '<div class="cv-title"><b>Manual para Detecção e Investigação de Surtos em Moçambique</b>'+
    '<span>Instituto Nacional de Saúde · Ministério da Saúde</span></div></div>';
}
function pageSeccao(){
  const id=+param('id');
  const s=(M.sections||[]).find(s=>s.id===id);
  if(!s){mount({back:true,title:'Secção'},'<div class="card">Secção não encontrada.</div>','map');return;}
  const body='<div class="note">Texto reproduzido <b>integralmente</b> do Manual Nacional (pendente de validação do INS).</div>'+
    '<div class="content card">'+renderSectionContent(s)+'</div>';
  mount({back:true,crumb:'Secção '+id,title:'SECÇÃO '+id+'<br><span class="thin">'+esc(s.title)+'</span>',search:false},body,'map');
}

function pageExplorarSindrome(){
  const cards=(M.groups||[]).map(g=>
    '<div class="syn" onclick="location.href=\'sindrome.html?id='+g.id+'\'"><div class="ico">'+groupIcon(g.icon)+'</div><div class="nm">'+esc(g.name)+'</div></div>').join('');
  const body='<div class="grid">'+cards+'</div>'+
    '<div class="card" style="margin-top:16px;display:flex;gap:14px;align-items:center">'+
    '<img src="assets/img/foto1.jpg" style="width:84px;height:84px;object-fit:cover;border-radius:12px" alt="">'+
    '<div><div style="font-family:Poppins;font-weight:700;color:var(--petrol);font-size:14px">Manual para Detecção e Investigação de Surtos em Moçambique</div>'+
    '<div style="font-size:12px;color:var(--muted);margin:4px 0 8px">Obtenha mais informações sobre as síndromes no manual completo.</div>'+
    '<button class="pill carmine" onclick="location.href=\'explorar-abecedario.html\'">'+I.book+' Ver doenças</button></div></div>';
  mount({crumb:'Explorar',title:'Explorar<br><span class="thin">por Síndrome</span>'},body,'map');
}

function pageSindrome(){
  const id=+param('id');
  const g=(M.groups||[]).find(g=>g.id===id);
  if(!g){mount({back:true,title:'Síndrome'},'<div class="card">Grupo não encontrado.</div>','map');return;}
  const ds=(M.diseases||[]).filter(d=>g.diseases.includes(d.slug));
  const rows=ds.map(d=>'<a class="abc-row" href="doenca.html?slug='+d.slug+'"><span class="ltr">'+esc(d.letter)+'</span>'+esc(d.name)+'<span style="float:right;color:var(--petrol)">'+I.arrow+'</span></a>').join('')
    || '<div class="abc-row dim">Sem fichas nesta categoria.</div>';
  const body='<div class="lead">'+ds.length+' condição(ões) nesta síndrome</div><div class="abc-list">'+rows+'</div>';
  mount({back:true,crumb:'Síndrome',title:esc(g.name),search:false},body,'map');
}

function pageAbecedario(){
  const ds=(M.diseases||[]).slice().sort((a,b)=>a.name.localeCompare(b.name,'pt'));
  const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const present=new Set(ds.map(d=>d.letter));
  const rows=ds.map(d=>'<a class="abc-row" id="L'+d.letter+'" href="doenca.html?slug='+d.slug+'"><span class="ltr">'+esc(d.letter)+' –</span> '+esc(d.name)+'</a>').join('');
  const idx=letters.map(l=>'<span class="'+(present.has(l)?'on':'')+'" onclick="var e=document.getElementById(\'L'+l+'\');if(e)e.scrollIntoView({behavior:\'smooth\',block:\'center\'})">'+l.toLowerCase()+'</span>').join('');
  const body='<div class="abc-wrap"><div class="abc-list">'+rows+'</div><div class="abc-index">'+idx+'</div></div>';
  mount({crumb:'Explorar',title:'Explorar<br><span class="thin">por Abecedário</span>'},body,'map');
}

function pageDoenca(){
  const slug=param('slug');
  const d=(M.diseases||[]).find(d=>d.slug===slug);
  if(!d){mount({back:true,title:'Doença'},'<div class="card">Ficha não encontrada.</div>','map');return;}
  const accs=(d.fields||[]).map((f,i)=>'<details class="acc" '+(i===0?'open':'')+'>'+
    '<summary><span class="dot"></span>'+esc(f.label)+'<span class="chev">'+I.chev+'</span></summary>'+
    '<div class="inner content">'+renderBlocks(f.blocks)+'</div></details>').join('');
  const body='<div class="note">Ficha reproduzida <b>integralmente</b> do Manual Nacional (pendente de validação do INS).</div>'+accs;
  mount({back:true,crumb:'Síndrome · '+d.letter,title:esc(d.name),search:false},body,'map');
}

function pageGlossario(){
  const ab=(M.glossary&&M.glossary.abbreviations)||[];
  const concepts=[
    ['Surto','A ocorrência de um número de casos de uma doença superior ao esperado em determinado local e período.'],
    ['Endemia','Doença que está constantemente presente numa área geográfica ou população específica, geralmente a um nível basal previsível.'],
    ['Epidemia','Aumento, frequentemente súbito, do número de casos de uma doença acima do que é normalmente esperado numa população.'],
    ['Caso suspeito','Pessoa que apresenta sinais e sintomas compatíveis com a definição clínica de uma doença sob vigilância.'],
    ['Definição de caso','Conjunto de critérios padronizados utilizados para classificar se uma pessoa apresenta uma determinada doença ou condição de saúde.'],
  ];
  const cBody=concepts.map(c=>'<h4>'+esc(c[0])+':</h4><p>'+esc(c[1])+'</p>').join('');
  const abBody=ab.map(a=>'<div class="abbr"><span class="k">'+esc(a.abbr)+'</span><span class="v">'+esc(a.meaning)+'</span></div>').join('');
  const body='<div class="card content"><h3 style="margin-top:4px">Principais conceitos epidemiológicos</h3>'+cBody+'</div>'+
    '<h2 class="sec-h">Abreviaturas ('+ab.length+')</h2><div class="card" style="padding:6px 16px">'+abBody+'</div>';
  mount({crumb:'Glossário',title:'Glossário',search:false},body,'book');
}

function pageEmendas(){
  const body=
    '<div class="ver-now"><div class="ok">'+I.check+'</div>'+
    '<div style="font-size:14px">Você está a usar a versão atual:</div>'+
    '<div class="big">V1.0</div><div style="font-size:12.5px;opacity:.9">Última verificação: Hoje</div></div>'+
    '<h2 class="sec-h">Emendas e Atualizações</h2>'+
    '<a class="hero" href="doenca.html?slug=colera" style="min-height:150px"><img src="assets/img/hero-colera.jpg" alt="">'+
    '<div class="scrim"></div><div class="ct"><h3 style="font-size:20px">Atualização do<br>Protocolo de Cólera</h3><span class="tag">Emenda</span></div></a>'+
    '<h2 class="sec-h">Versões anteriores</h2>'+
    '<div class="ver-item"><div class="vn">V1.0</div><div class="vd">20 Maio 2026</div>'+
    '<div class="chg"><b>Adicionado:</b> Digitalização integral do Manual Nacional (6 secções, 37 fichas de doença).</div>'+
    '<div class="chg"><b>Pendente:</b> Validação clínica e do design pelo INS.</div></div>'+
    '<div class="note">As emendas e o histórico de versões serão geridos pelo INS após a publicação oficial.</div>';
  mount({crumb:'Emendas',title:'Histórico<br><span class="thin">de Versões</span>',search:false},body,'doc');
}

function pageSearch(){
  const q=(param('q')||'').trim();
  const nq=deaccent(q);
  let results=[];
  if(nq.length>=2){
    (M.diseases||[]).forEach(d=>{
      const hay=deaccent(d.name+' '+(d.fields||[]).map(f=>f.label+' '+f.blocks.map(b=>b.text).join(' ')).join(' '));
      if(hay.indexOf(nq)>=0) results.push({t:d.name,s:'Ficha de doença',href:'doenca.html?slug='+d.slug});
    });
    (M.sections||[]).forEach(s=>{
      const hay=deaccent('seccao '+s.id+' '+s.title+' '+s.blocks.map(b=>b.text).join(' '));
      if(hay.indexOf(nq)>=0) results.push({t:'SECÇÃO '+s.id+': '+s.title,s:'Secção',href:'seccao.html?id='+s.id});
    });
    ((M.glossary&&M.glossary.abbreviations)||[]).forEach(a=>{
      if(deaccent(a.abbr+' '+a.meaning).indexOf(nq)>=0) results.push({t:a.abbr+' — '+a.meaning,s:'Abreviatura',href:'glossario.html'});
    });
  }
  let body;
  if(!q) body='<div class="lead">Escreva um termo e prima Enter para pesquisar no manual.</div>';
  else if(!results.length) body='<div class="card">Sem resultados para <b>'+esc(q)+'</b>.</div>';
  else body='<div class="lead">'+results.length+' resultado(s) para "'+esc(q)+'"</div><div class="abc-list">'+
    results.map(r=>'<a class="abc-row" href="'+r.href+'">'+esc(r.t)+'<div style="font-size:11px;color:var(--muted)">'+esc(r.s)+'</div></a>').join('')+'</div>';
  mount({back:true,crumb:'Pesquisa',title:'Pesquisa',q:q},body,'map');
}

function pagePerfil(){
  const m=M.meta||{};
  const body='<div class="brand"><img src="assets/img/logos.png" alt="INS"><div class="bt"><b>Instituto Nacional de Saúde</b>Ministério da Saúde · Moçambique</div></div>'+'<div class="card content"><h3 style="margin-top:2px">'+esc(m.title||'Manual de Surtos')+'</h3>'+
    '<p class="lead">'+esc(m.subtitle||'')+'</p>'+
    '<p><b>Versão:</b> '+esc(m.version||'V1.0')+'</p>'+
    '<p><b>Conteúdo:</b> '+(M.sections||[]).length+' secções narrativas, '+(M.groups||[]).length+' grupos sindrómicos, '+(M.diseases||[]).length+' fichas de doença e '+((M.glossary&&M.glossary.abbreviations)||[]).length+' abreviaturas.</p>'+
    '<p><b>Funcionamento:</b> aplicação estática, funciona offline (sem necessidade de internet).</p></div>'+
    '<div class="card content"><h4 style="margin-top:2px">Sobre</h4>'+
    '<p>Digitalização do Manual Nacional para Detecção e Investigação de Surtos, do Instituto Nacional de Saúde (INS) / Ministério da Saúde (MISAU).</p>'+
    '<p>Protótipo para validação de design e estrutura. Conteúdo clínico pendente de validação do INS.</p></div>'+
    '<div class="note">Os dados de utilizador, registo e certificação serão definidos pelo INS na fase de formação.</div>';
  mount({crumb:'Perfil',title:'Perfil',search:false},body,'user');
}

const PAGES={home:pageHome,'explorar-seccao':pageExplorarSeccao,seccao:pageSeccao,
  'explorar-sindrome':pageExplorarSindrome,sindrome:pageSindrome,'explorar-abecedario':pageAbecedario,
  doenca:pageDoenca,glossario:pageGlossario,emendas:pageEmendas,pesquisa:pageSearch,perfil:pagePerfil};
document.addEventListener('DOMContentLoaded',()=>{
  const p=document.body.getAttribute('data-page');
  (PAGES[p]||pageHome)();
});
})();
