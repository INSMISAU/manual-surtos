/* Visual privacy covers. Original clinical photographs remain unchanged. */
(function(){
'use strict';
if(window.__insPhotoPrivacy)return;window.__insPhotoPrivacy=true;
var areas={
"cdc-phil-5301-fontes-20261015.jpg":[[39, 47, 16, 8]],
"cdc-phil-27015-fontes-20261015.jpg":[[66, 60, 8, 8]],
"cdc-phil-23090-fontes-20261015.jpg":[[80, 52, 9, 8]],
'febre-amarela-doente-angola-2016-real-final-20261015.jpg':[[63,44,12,11],[62,23,6,4]],

'lassa-cdc-real-lote3-20261014.jpg':[[69,21,12,11]],
'crimeia-cdc-real-lote3-20261014.jpg':[[22,27,24,15]],
'peste-cdc-real-20261014.jpg':[[86,0,14,25]],
'colera-misau-2009-p32.jpg':[[55,48,8,7]],
'parotidite-caso.jpg':[[31,27,40,12]],
'varicela-caso.jpg':[[5,13,22,13],[43,11,22,15],[75,13,22,14]],
'febre-amarela-caso.jpg':[[42,23,19,14]],
'norovirus-caso.jpg':[[30,31,19,14]],
'crimeia-congo-caso.jpg':[[51,25,22,12]],
'lassa-caso.jpg':[[44,24,14,10]],
'febre-tifoide-caso.jpg':[[32,23,21,12]],
'ebola-caso.jpg':[[61,27,16,12]],
'colera-contexto.jpg':[[31,0,4,5],[23,14,5,7],[10,17,5,6],[19,28,5,6],[34,19,7,10],[74,16,6,6],[85,42,14,9],[76,75,18,14]]
};
function protect(img){
 var key=(img.getAttribute('src')||'').split('/').pop().split('?')[0],rects=areas[key];if(!rects||img.dataset.insPrivacy)return;
 img.dataset.insPrivacy='1';var p=img.parentElement;if(!p)return;
 if(getComputedStyle(p).position==='static')p.style.position='relative';
 var masks=rects.map(function(){var e=document.createElement('span');e.setAttribute('aria-hidden','true');e.style.cssText='position:absolute;background:#292929;pointer-events:none;z-index:2;border-radius:2px';p.appendChild(e);return e;});
 function place(){if(!img.naturalWidth)return;var b=img.getBoundingClientRect(),pb=p.getBoundingClientRect(),w=b.width,h=b.height,cs=getComputedStyle(img),iw=img.naturalWidth,ih=img.naturalHeight;
 if(cs.objectFit==='contain'||cs.objectFit==='cover'){var scale=cs.objectFit==='cover'?Math.max(w/iw,h/ih):Math.min(w/iw,h/ih);iw*=scale;ih*=scale;}else{iw=w;ih=h;}
 var left=b.left-pb.left+p.scrollLeft+(w-iw)/2,top=b.top-pb.top+p.scrollTop+(h-ih)/2;
 rects.forEach(function(r,i){var x=Math.max(b.left-pb.left+p.scrollLeft,left+iw*r[0]/100),y=Math.max(b.top-pb.top+p.scrollTop,top+ih*r[1]/100),right=Math.min(b.right-pb.left+p.scrollLeft,left+iw*(r[0]+r[2])/100),bottom=Math.min(b.bottom-pb.top+p.scrollTop,top+ih*(r[1]+r[3])/100);Object.assign(masks[i].style,{left:x+'px',top:y+'px',width:Math.max(0,right-x)+'px',height:Math.max(0,bottom-y)+'px'});});
 }
 img.addEventListener('load',place);if(window.ResizeObserver)new ResizeObserver(place).observe(img);window.addEventListener('resize',place);place();
}
function scan(root){if(root.nodeType!==1)return;if(root.tagName==='IMG')protect(root);root.querySelectorAll('img').forEach(protect);}
function start(){scan(document.documentElement);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(scan);});}).observe(document.documentElement,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();

