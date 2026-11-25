(function(){
 'use strict';
 function init(){
  if(document.getElementById('academy-return-nav'))return;
  var style=document.createElement('style');
  style.textContent='.academy-return-nav{position:sticky;top:0;z-index:60;height:48px;box-sizing:border-box;max-width:480px;margin:0 auto;padding:6px 12px;background:#fff;border-bottom:1px solid #cfdee4;display:flex;align-items:center}.academy-return-nav a{display:inline-flex;align-items:center;min-height:34px;box-sizing:border-box;padding:5px 12px;border:1px solid #427185;border-radius:7px;color:#254e60;background:#fff;font:600 14px/1.4 Arial,sans-serif;text-decoration:none}.academy-return-nav a:hover{background:#edf4f7}.academy-return-nav a:focus-visible{outline:3px solid #427185;outline-offset:2px}body .hdr{top:48px!important}';
  document.head.appendChild(style);
  var nav=document.createElement('nav');nav.id='academy-return-nav';nav.className='academy-return-nav';nav.setAttribute('aria-label','Regresso à Academia');
  var link=document.createElement('a');link.href='https://insmisau.github.io/academia-digital-ins/#biblioteca';link.target='_self';link.textContent='Voltar à Academia';link.title='Biblioteca da Academia · requer ligação à internet';nav.appendChild(link);
  document.body.insertBefore(nav,document.body.firstChild);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Acesso ao guia; não altera o conteúdo das fichas nem os acessos. */
(function(){function guide(){var back=document.querySelector('a[href*="academia-digital-ins"]');if(document.querySelector('[data-ins-help]'))return;var link=document.createElement("a");link.href=new URL("../../ajuda.html",document.currentScript&&document.currentScript.src||new URL("assets/js/academy-return.js",location.href)).href;link.textContent="Ajuda e guias";link.setAttribute("data-ins-help","");link.style.cssText="display:block;max-width:440px;margin:16px auto 90px;padding:12px 18px;border:1px solid #bdd2d9;border-radius:10px;background:#edf4f5;color:#07576b;text-align:center;font:15px/1.5 Arial,sans-serif;position:relative;z-index:1";document.body.appendChild(link);}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",guide);else guide();})();
