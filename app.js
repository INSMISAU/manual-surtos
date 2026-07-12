/* ============================================================
   App — Manual de Surtos (plataforma de digitalizacao, INS)
   Renderizacao partilhada. Dados em window.MANUAL (content.js)
   ============================================================ */
(function(){
const M = window.MANUAL || {};
const I = {
  chevL:'<svg class="i" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
  chevR:'<svg class="i" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
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
  let html;
  const m=t.match(/^([^:]{2,80}):\s+(.+)$/);
  if(m) html='<b>'+esc(m[1])+':</b> '+esc(m[2]);
  else html=esc(t);
  return html.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>'); /* negrito inline **...** */
}
/* --- Tabelas markdown ("| ... | ... |") renderizadas como tabela real --- */
function isTableRow(b){ return b && b.type!=='li' && b.type!=='h3' && b.type!=='h4' && typeof b.text==='string' && b.text.trim().charAt(0)==='|'; }
function parseRow(t){ let s=t.trim(); if(s.charAt(0)==='|')s=s.slice(1); if(s.charAt(s.length-1)==='|')s=s.slice(0,-1); return s.split('|').map(c=>c.trim()); }
function isSep(cells){ return cells.length>0 && cells.every(c=>/^:?-{2,}:?$/.test(c.replace(/\s/g,''))); }
function tableHtml(texts){
  const rows=texts.map(parseRow);
  let sep=-1; for(let i=0;i<rows.length;i++){ if(isSep(rows[i])){ sep=i; break; } }
  const maxc=Math.max.apply(null,rows.map(r=>r.length));
  const cells=(r,tag)=>{ let h=''; for(let i=0;i<maxc;i++){ h+='<'+tag+'>'+esc(r[i]!=null?r[i]:'')+'</'+tag+'>'; } return h; };
  let html='<div class="tbl-wrap"><table class="tbl">';
  if(sep>=0){
    html+='<thead>'; for(let i=0;i<sep;i++) html+='<tr>'+cells(rows[i],'th')+'</tr>'; html+='</thead><tbody>';
    for(let i=sep+1;i<rows.length;i++) html+='<tr>'+cells(rows[i],'td')+'</tr>'; html+='</tbody>';
  } else { html+='<tbody>'; rows.forEach(r=>{ html+='<tr>'+cells(r,'td')+'</tr>'; }); html+='</tbody>'; }
  return html+'</table></div>';
}
function renderBody(blocks,figs){
  figs=figs||[]; const used=new Set();
  let html='',listTag=null;
  const closeList=()=>{ if(listTag){html+='</'+listTag+'>';listTag=null;} };
  const figByNum=n=>{ for(let k=0;k<figs.length;k++){ if(String(figs[k].num)===String(n)) return figs[k]; } return null; };
  const arr=blocks||[];
  for(let i=0;i<arr.length;i++){
    const b=arr[i];
    if(isTableRow(b)){ const t=[]; while(i<arr.length&&isTableRow(arr[i])){ t.push(arr[i].text); i++; } i--; closeList(); html+=tableHtml(t); continue; }
    /* Linha que É a legenda de uma figura ("Figura N. …"): mostra a figura uma só vez
       (com a sua própria legenda) e não repete o texto por cima. */
    const cap = (b && typeof b.text==='string') ? b.text.match(/^\s*Figura\s+(\d+)\s*[.\:]/i) : null;
    if(cap){ const f=figByNum(cap[1]); if(f && !used.has(f.num)){ closeList(); html+=figHtml(f); used.add(f.num); continue; } }
    if(b.type==='li'||b.type==='oli'){ const want=b.type==='oli'?'ol':'ul'; if(listTag!==want){closeList();html+='<'+want+'>';listTag=want;} html+='<li>'+boldLabel(b.text)+'</li>'; }
    else { closeList();
      if(b.type==='h3') html+='<h3>'+esc(b.text)+'</h3>';
      else if(b.type==='h4') html+='<h4>'+esc(b.text)+'</h4>';
      else html+='<p>'+boldLabel(b.text)+'</p>';
    }
  }
  closeList();
  const rest=figs.filter(f=>!used.has(f.num));
  if(rest.length) html+='<div class="figs-h">Figuras</div>'+rest.map(figHtml).join('');
  return html;
}
function renderBlocks(blocks){ return renderBody(blocks); }
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
  addClosers();
}
/* Comprimir sem voltar ao topo: botao "Fechar" no fim de cada bloco aberto. */
function addClosers(root){
  var box=(root||document);
  var alvos=[].slice.call(box.querySelectorAll('details.acc > .inner'));
  alvos.forEach(function(inn){
    if(inn.querySelector('.closer')) return;
    var b=document.createElement('button');
    b.type='button'; b.className='closer';
    b.innerHTML='<svg class="i" viewBox="0 0 24 24" style="width:15px;height:15px"><path d="M18 15l-6-6-6 6"/></svg> Fechar';
    b.addEventListener('click',function(e){
      e.preventDefault(); e.stopPropagation();
      var d=inn.parentNode; d.open=false;
      var y=d.getBoundingClientRect().top+window.pageYOffset-70;
      window.scrollTo({top:y<0?0:y,behavior:'smooth'});
    });
    inn.appendChild(b);
  });
}
function pageHome(){
  const card=(href,t,extra)=>'<a class="nav-card" href="'+href+'"><span class="t">'+t+'</span>'+(extra||'')+'</a>';
  const pf=(M.meta&&M.meta.prefacio)||null;
  const prefacio=pf?('<details class="acc" style="margin:0 0 12px"><summary><span class="dot"></span>'+esc(pf.titulo)+'<span class="chev">'+I.chev+'</span></summary>'+
    '<div class="inner content">'+pf.paragrafos.map(p=>'<p>'+esc(p)+'</p>').join('')+
    '<p style="font-size:12.5px;color:var(--muted);margin-top:10px">'+esc(pf.assinatura)+'</p></div></details>'):'';
  const body=
    coverBlock()+
    prefacio+
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
function renderSectionContent(sec){ return renderBody((sec.blocks||[]),(sec.figures||[])); }
function coverBlock(){
  return '<div class="cover"><img class="ph" src="assets/img/cover.jpg" alt="Capa oficial do manual">'+
    '<div class="cv-title"><b>Manual para Detecção e Investigação de Surtos em Moçambique</b>'+
    '<span>Instituto Nacional de Saúde · Ministério da Saúde</span></div></div>';
}
/* Navegacao continua (Anterior / Seguinte) — segue a ordem do manual. */
function pager(prev,next){
  const lnk=(o,dir)=>'<a class="pg '+dir+'" href="'+o.href+'">'+
     (dir==='pv'?'<span class="ar">'+I.chevL+'</span>':'')+
     '<span class="tx"><span class="lb">'+(dir==='pv'?'Anterior':'Seguinte')+'</span><span class="tt">'+esc(o.title)+'</span></span>'+
     (dir==='nx'?'<span class="ar">'+I.chevR+'</span>':'')+'</a>';
  const fim=t=>'<span class="pg end">'+t+'</span>';
  return '<div class="pager">'+(prev?lnk(prev,'pv'):fim('Início do manual'))+(next?lnk(next,'nx'):fim('Fim do manual'))+'</div>';
}
function seccaoPager(id){
  const ordem=[1,2,3,4,5,6];
  const href=i=>i===4?'explorar-sindrome.html':('seccao.html?id='+i);
  const nome=i=>i===4?'Vigilância Sindrómica':SECT_TITLE(i);
  const i=ordem.indexOf(id);
  const pv=i>0?{href:href(ordem[i-1]),title:'Secção '+ordem[i-1]+' · '+nome(ordem[i-1])}:null;
  const nx=i<ordem.length-1?{href:href(ordem[i+1]),title:'Secção '+ordem[i+1]+' · '+nome(ordem[i+1])}:null;
  return pager(pv,nx);
}
function sindromePager(id){
  const gs=(M.groups||[]);
  const i=gs.findIndex(g=>g.id===id);
  const pv=i>0?{href:'sindrome.html?id='+gs[i-1].id,title:gs[i-1].name}:null;
  const nx=(i>=0&&i<gs.length-1)?{href:'sindrome.html?id='+gs[i+1].id,title:gs[i+1].name}:null;
  return pager(pv,nx);
}
function pageSeccao(){
  const id=+param('id');
  const s=(M.sections||[]).find(s=>s.id===id);
  if(!s){mount({back:true,title:'Secção'},'<div class="card">Secção não encontrada.</div>','map');return;}
  const body='<div class="note">Texto reproduzido <b>integralmente</b> do Manual Nacional (pendente de validação do INS).</div>'+
    '<details class="acc" open><summary><span class="dot"></span>'+esc(s.title)+'<span class="chev">'+I.chev+'</span></summary>'+
    '<div class="inner content">'+renderSectionContent(s)+'</div></details>'+seccaoPager(id);
  mount({back:true,crumb:'Secção '+id,title:'SECÇÃO '+id+'<br><span class="thin">'+esc(s.title)+'</span>',search:false},body,'map');
}
function pageExplorarSindrome(){
  const cards=(M.groups||[]).map(g=>
    '<div class="syn" onclick="location.href=\'sindrome.html?id='+g.id+'\'"><div class="ico">'+groupIcon(g.icon)+'</div><div class="nm">'+esc(g.name)+'</div></div>').join('');
  const si=(M.meta&&M.meta.sindromesIntro)||[];
  const intro=si.length?('<details class="acc" open style="margin-bottom:14px"><summary><span class="dot"></span>Porquê agrupar por síndrome<span class="chev">'+I.chev+'</span></summary>'+
    '<div class="inner content">'+si.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div></details>'):'';
  const t1=(M.meta&&M.meta.tabela1)||null;
  const tabela=t1?('<details class="acc" style="margin:14px 0 0"><summary><span class="dot"></span>'+esc(t1.titulo)+'<span class="chev">'+I.chev+'</span></summary>'+
    '<div class="inner content"><div style="overflow-x:auto"><table class="t1"><thead><tr>'+
    t1.cabecalho.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+
    (M.groups||[]).map(g=>'<tr><td><a href="sindrome.html?id='+g.id+'"><b>'+esc(g.name)+'</b></a></td><td>'+esc(g.agentes||'')+'</td><td>'+esc(g.obs||'')+'</td></tr>').join('')+
    '</tbody></table></div></div></details>'):'';
  const body=intro+'<div class="grid">'+cards+'</div>'+tabela+
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
  const intro=(g.intro&&g.intro.length)
    ? '<details class="acc" open><summary><span class="dot"></span>Introdução<span class="chev">'+I.chev+'</span></summary>'+
      '<div class="inner content">'+g.intro.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div></details>'
    : '';
  const obs=g.obs?('<details class="acc"><summary><span class="dot"></span>Observações do manual<span class="chev">'+I.chev+'</span></summary>'+
    '<div class="inner content"><p>'+esc(g.obs)+'</p></div></details>'):'';
  const body=intro+obs+'<div class="lead">'+ds.length+' condição(ões) nesta síndrome</div><div class="abc-list">'+rows+'</div>'+sindromePager(id);
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
  const concepts=((M.glossary&&M.glossary.concepts)||[]).map(c=>[c.term,c.def]);
  const cBody=concepts.map(c=>'<h4>'+esc(c[0])+':</h4><p>'+esc(c[1])+'</p>').join('');
  const abBody=ab.map(a=>'<div class="abbr"><span class="k">'+esc(a.abbr)+'</span><span class="v">'+esc(a.meaning)+'</span></div>').join('');
  const gi=(M.glossary&&M.glossary.intro)?'<p style="margin:0 0 12px">'+esc(M.glossary.intro)+'</p>':'';
  const body=(gi?'<div class="note">'+esc(M.glossary.intro)+'</div>':'')+
    '<details class="acc" open><summary><span class="dot"></span>Principais conceitos epidemiológicos<span class="chev">'+I.chev+'</span></summary>'+
    '<div class="inner content">'+cBody+'</div></details>'+
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
    '<p class="hero-meta" style="margin:6px 2px 12px;font-size:12.5px;color:var(--muted)">Data: 20 de Maio de 2026 · Secção 4</p>'+
    '<h2 class="sec-h">Versões anteriores</h2>'+
    '<div class="ver-item"><div class="vn">V1.0</div><div class="vd">20 Maio 2026</div>'+
    '<div class="chg"><b>Adicionado:</b> Digitalização integral do Manual Nacional (6 secções, 37 fichas de doença).</div>'+
    '<div class="chg"><b>Pendente:</b> Validação clínica e do design pelo INS.</div></div>'+
    '<div class="note">As emendas e o histórico de versões serão geridos pelo INS após a publicação oficial.</div>';
  mount({crumb:'Emendas',title:'Histórico<br><span class="thin">de Versões</span>',search:false},body,'doc');
}
function pageSearch(){
  const q=(param('q')||'').trim();
  const STOP=['de','do','da','dos','das','e','a','o','as','os','em','no','na','para','com','ou'];
  /* pesquisa flexível: divide em palavras, ignora acentos e artigos, e casa por qualquer ordem */
  const tokens=deaccent(q).split(/\s+/).map(t=>t.replace(/[^a-z0-9]/g,'')).filter(t=>t.length>=2 && STOP.indexOf(t)<0);
  function matches(text){ const dt=deaccent(text); return tokens.length>0 && tokens.every(t=>dt.indexOf(t)>=0); }
  function hl(text){ /* destaca as palavras pesquisadas (ignorando acentos) */
    return String(text).split(/(\s+)/).map(function(w){
      var dw=deaccent(w.replace(/[.,;:()"']/g,''));
      return (dw && tokens.some(function(t){return dw.indexOf(t)>=0;})) ? '<mark>'+esc(w)+'</mark>' : esc(w);
    }).join('');
  }
  function snippet(text){ const dt=deaccent(text); let pos=-1;
    tokens.forEach(function(t){ var p=dt.indexOf(t); if(p>=0 && (pos<0||p<pos)) pos=p; });
    if(pos<0) return '';
    var start=Math.max(0,pos-45); var s=String(text).slice(start,start+150).trim();
    return (start>0?'… ':'')+hl(s)+' …';
  }
  let results=[];
  if(tokens.length){
    (M.diseases||[]).forEach(d=>{
      const full=d.name+' '+(d.fields||[]).map(f=>f.label+' '+f.blocks.map(b=>b.text).join(' ')).join(' ');
      if(matches(full)) results.push({t:d.name,s:'Ficha de doença',href:'doenca.html?slug='+d.slug,snip:snippet(full)});
    });
    (M.sections||[]).forEach(s=>{
      const full='Secção '+s.id+' '+s.title+' '+s.blocks.map(b=>b.text).join(' ');
      if(matches(full)) results.push({t:'SECÇÃO '+s.id+': '+s.title,s:'Secção',href:'seccao.html?id='+s.id,snip:snippet(full)});
    });
    ((M.glossary&&M.glossary.abbreviations)||[]).forEach(a=>{
      if(matches(a.abbr+' '+a.meaning)) results.push({t:a.abbr+' — '+a.meaning,s:'Abreviatura',href:'glossario.html',snip:''});
    });
  }
  let body;
  if(!q) body='<div class="lead">Escreva um termo e prima Enter para pesquisar no manual.</div>';
  else if(!results.length) body='<div class="card">Sem resultados para <b>'+esc(q)+'</b>.</div>';
  else body='<div class="lead">'+results.length+' resultado(s) para "'+esc(q)+'"</div><div class="abc-list">'+
    results.map(r=>'<a class="abc-row" href="'+r.href+'"><div>'+hl(r.t)+'</div>'+(r.snip?'<div style="font-size:12px;color:var(--muted);margin-top:3px;line-height:1.45">'+r.snip+'</div>':'')+'<div style="font-size:11px;color:var(--petrol);margin-top:2px">'+esc(r.s)+'</div></a>').join('')+'</div>';
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
    '<div class="note">Este é o e-book (manual digital), destinado à consulta. O registo de utilizadores e a certificação aplicam-se à componente formativa, não ao e-book.</div>';
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

;/* ===== MELHORIAS DO MANUAL (navegacao + leitura) — colar no fim do app.js ===== */
/* ===== INICIO BLOCO MELHORIAS ===== */
(function(){
  // (1) Fonte Raleway garantida em todas as paginas
  if(!document.getElementById('ral-font')){
    var lf=document.createElement('link'); lf.id='ral-font'; lf.rel='stylesheet';
    lf.href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(lf);
  }
  // (5) MODO OFFLINE: registar o service worker (funciona sem internet)
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
  }
  var st=document.createElement('style');
  st.textContent=[
   // ---- Menu de navegacao (cores do manual) ----
   '.mnav-ov{position:fixed;inset:0;background:rgba(6,40,52,.5);z-index:60;display:none}',
   '.mnav-ov.on{display:block}',
   '.mnav{position:fixed;top:0;left:50%;width:100%;max-width:480px;background:#fff;',
     'border-radius:0 0 22px 22px;box-shadow:0 14px 34px rgba(0,0,0,.3);overflow:hidden;',
     'z-index:61;transform:translate(-50%,-102%);transition:transform .25s}',
   '.mnav.on{transform:translate(-50%,0)}',
   '.mnav .mh{background:linear-gradient(160deg,#0a7d96 0%,#066b83 45%,#0a90ab 100%);color:#fff;',
     'padding:16px 16px 14px;display:flex;align-items:center}',
   '.mnav .mh b{font-family:"Raleway","Segoe UI",sans-serif;font-size:16px;font-weight:800;flex:1}',
   '.mnav .mx{background:rgba(255,255,255,.2);border:none;border-radius:50%;width:32px;height:32px;',
     'font-size:15px;cursor:pointer;color:#fff}',
   '.mnav .ml{padding:8px 10px 14px}',
   '.mnav a{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;',
     'color:#243038;font-weight:600;font-size:15px;cursor:pointer;text-decoration:none}',
   '.mnav a:active{background:#eef4f6}',
   '.mnav a .mi{width:26px;height:26px;flex:none;border-radius:8px;background:#eef4f6;color:#007088;',
     'display:grid;place-items:center;font-size:14px;font-weight:800}',
   '.mnav a.adm{margin-top:6px;border-top:1px solid #e4e9ed;padding-top:14px;color:#b02040}',
   '.mnav a.adm .mi{background:#f7e6ea;color:#b02040}',
   // ---- Botoes flutuantes (cores do manual) ----
   // fora da coluna de texto sempre que haja espaco; encostados a margem em ecras estreitos
   '.fab-nav{position:fixed;bottom:92px;right:max(6px, calc(50% - 285px));z-index:45;display:flex;flex-direction:column;gap:7px;opacity:.93}',
   '.fab-nav:hover{opacity:1}',
   '.fab-nav button{width:38px;height:38px;border-radius:50%;border:none;background:#007088;color:#fff;',
     'box-shadow:0 3px 10px rgba(0,0,0,.22);cursor:pointer;display:grid;place-items:center;font-size:17px;line-height:1}',
   '.fab-nav button.menu{background:#b02040;font-size:16px}',
   '.fab-nav button.up{background:#0b465d;font-size:16px;width:36px;height:36px}',
   // telemovel: esconder as setas de rolar (o dedo ja rola); ficam so o menu e o voltar
   '@media(max-width:560px){.fab-nav{right:6px;bottom:84px;gap:6px}',
     '.fab-nav button{width:36px;height:36px;font-size:16px}',
     '.fab-nav button.up{display:none}}',
   // ---- Ver texto integral (igual ao das fichas: topo, largo, contorno petroleo) ----
   '.rm-clip{max-height:460px;overflow:hidden;position:relative}',
   '.rm-clip::after{content:"";position:absolute;left:0;right:0;bottom:0;height:80px;',
     'background:linear-gradient(rgba(242,248,250,0),#f2f8fa);pointer-events:none}',
   '.rm-btn{width:100%;border:1px solid #007088;background:#eef7f8;color:#005c70;font:inherit;',
     'font-size:13.5px;font-weight:700;padding:11px;border-radius:11px;cursor:pointer;display:flex;',
     'align-items:center;justify-content:center;gap:8px;margin:0 0 14px;font-family:"Raleway",sans-serif}',
   // destaque da pesquisa + Voltar padronizado (só o de baixo)
   'mark{background:#fff3bf;color:inherit;padding:0 2px;border-radius:3px}',
   '.hdr .backlink{display:none!important}'
  ].join('');
  document.head.appendChild(st);

  var MENU=[
    ['index.html','⌂','Inicio',''],
    ['explorar-seccao.html','§','Explorar por Seccao',''],
    ['explorar-sindrome.html','◆','Explorar por Sindrome',''],
    ['explorar-abecedario.html','AZ','Explorar por Abecedario',''],
    ['emendas.html','↻','Emendas / Versoes',''],
    ['glossario.html','◈','Glossario',''],
    ['perfil.html','☺','Perfil',''],
    ['cms.html','⚙','Administracao (CMS)','adm']
  ];
  function buildMenu(){
    if(document.getElementById('mnav'))return;
    var ov=document.createElement('div'); ov.className='mnav-ov'; ov.id='mnav-ov';
    var m=document.createElement('div'); m.className='mnav'; m.id='mnav';
    m.innerHTML='<div class="mh"><b>Navegacao</b><button class="mx" aria-label="fechar">✕</button></div>'+
      '<div class="ml">'+MENU.map(function(x){
        return '<a class="'+x[3]+'" href="'+x[0]+'"><span class="mi">'+x[1]+'</span>'+x[2]+'</a>';
      }).join('')+'</div>';
    document.body.appendChild(ov); document.body.appendChild(m);
    ov.addEventListener('click',closeMenu);
    m.querySelector('.mx').addEventListener('click',closeMenu);
  }
  function openMenu(){ buildMenu(); document.getElementById('mnav-ov').classList.add('on'); document.getElementById('mnav').classList.add('on'); }
  function closeMenu(){ var o=document.getElementById('mnav-ov'),m=document.getElementById('mnav'); if(o)o.classList.remove('on'); if(m)m.classList.remove('on'); }
  window.MenuToggle=openMenu;

  function enhance(){
    var b=document.querySelector('.burger');
    if(b && !b.dataset.wired){ b.dataset.wired='1'; b.addEventListener('click',openMenu); }
    var tops=document.querySelectorAll('.hdr-top .icon-btn:not(.burger)');
    if(tops[0] && !tops[0].dataset.wired){ tops[0].dataset.wired='1'; tops[0].style.cursor='pointer';
      tops[0].addEventListener('click',function(){ location.href='pesquisa.html'; }); }
    if(tops[1] && !tops[1].dataset.wired){ tops[1].dataset.wired='1'; tops[1].style.cursor='pointer';
      tops[1].addEventListener('click',function(){ location.href='emendas.html'; }); }
    if(!document.getElementById('fab-nav')){
      var f=document.createElement('div'); f.className='fab-nav'; f.id='fab-nav';
      var back=document.createElement('button'); back.title='Voltar'; back.innerHTML='‹';
      back.addEventListener('click',function(){ if(history.length>1) history.back(); else location.href='index.html'; });
      var up=document.createElement('button'); up.title='Ir ao topo'; up.className='up'; up.innerHTML='↑';
      up.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
      var dn=document.createElement('button'); dn.title='Ir ao fundo'; dn.className='up'; dn.innerHTML='↓';
      dn.addEventListener('click',function(){ window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'}); });
      var men=document.createElement('button'); men.title='Menu'; men.className='menu'; men.innerHTML='≡';
      men.addEventListener('click',openMenu);
      f.appendChild(back); f.appendChild(up); f.appendChild(dn); f.appendChild(men);
      document.body.appendChild(f);
    }
    var btns=document.querySelectorAll('button');
    for(var j=0;j<btns.length;j++){ if(/Baixar PDF/i.test(btns[j].textContent||'')) btns[j].style.display='none'; }
    var rec=document.querySelector('.recent'); if(rec) rec.style.display='none';
    var blocks=document.querySelectorAll('.content.card');
    for(var i=0;i<blocks.length;i++){ collapseLong(blocks[i]); }
  }
  function collapseLong(box){
    if(box.dataset.rm) return;
    if(box.scrollHeight <= 560) return;
    box.dataset.rm='1';
    box.classList.add('rm-clip');
    var btn=document.createElement('button'); btn.className='rm-btn';
    btn.innerHTML='&#128196; Ver texto integral do manual';
    btn.addEventListener('click',function(){
      if(box.classList.contains('rm-clip')){ box.classList.remove('rm-clip'); btn.innerHTML='&#128196; Ver menos'; }
      else { box.classList.add('rm-clip'); btn.innerHTML='&#128196; Ver texto integral do manual'; box.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
    box.parentNode.insertBefore(btn, box);
  }
  function run(){ setTimeout(enhance,90); }
  if(document.readyState!=='loading') run(); else document.addEventListener('DOMContentLoaded',run);
})();
/* ===== FIM BLOCO MELHORIAS ===== */
