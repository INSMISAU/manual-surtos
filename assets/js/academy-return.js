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
