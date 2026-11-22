(function(){
'use strict';
function openImage(img,trigger){
 var file=img.getAttribute('src')||'';
 if(!/^assets\/(?:ilustracoes|fig)\//.test(file))return;
 var dialog=document.createElement('dialog');dialog.className='ins-image-viewer';
 dialog.setAttribute('aria-label','Imagem ampliada');
 var heading=document.createElement('h2');heading.textContent='Imagem ampliada';
 var controls=document.createElement('div');controls.className='ins-image-controls';
 var canvas=document.createElement('div');canvas.className='ins-image-canvas';canvas.tabIndex=0;
 canvas.setAttribute('role','region');canvas.setAttribute('aria-label',img.alt||'Imagem');
 var picture=document.createElement('img');picture.alt=img.alt||'';canvas.appendChild(picture);
 var width=600;
 function size(value){width=Math.max(160,Math.min(6000,Math.round(value)));picture.style.width=width+'px';}
 function fit(){size(Math.min(picture.naturalWidth||600,Math.max(160,canvas.clientWidth-24)));}
 function control(text,label,action){var b=document.createElement('button');b.type='button';b.textContent=text;b.setAttribute('aria-label',label);b.addEventListener('click',action);controls.appendChild(b);return b;}
 control('−','Diminuir imagem',function(){size(width/1.3);});
 control('+','Aumentar imagem',function(){size(width*1.3);});
 control('Ajustar','Ajustar imagem ao ecrã',fit);
 var close=control('Fechar','Fechar imagem ampliada',function(){dialog.close();});
 dialog.addEventListener('close',function(){dialog.remove();if(trigger&&trigger.isConnected)trigger.focus();},{once:true});
 picture.addEventListener('load',fit,{once:true});
 dialog.appendChild(heading);dialog.appendChild(controls);dialog.appendChild(canvas);
 document.body.appendChild(dialog);
 if(typeof dialog.showModal!=='function'){dialog.remove();window.open(file,'_blank','noopener');return;}
 dialog.showModal();close.focus();picture.src=file;
}
function enhance(){
 document.querySelectorAll('.disease-hero img,.riskitem img,.secimg img,.image-card>img').forEach(function(img){
  if(img.dataset.insZoom||!/^assets\/(?:ilustracoes|fig)\//.test(img.getAttribute('src')||''))return;
  img.dataset.insZoom='1';
  var button=document.createElement('button');button.type='button';button.className='ins-image-zoom';button.textContent='Ampliar imagem';
  button.setAttribute('aria-label','Ampliar imagem'+(img.alt?': '+img.alt:''));button.setAttribute('aria-haspopup','dialog');
  button.addEventListener('click',function(){openImage(img,button);});
  var risk=img.closest('.riskitem');
  if(risk){var row=risk.querySelector('.riskrow,.rbanner');if(row)row.after(button);else risk.appendChild(button);}
  else{var figure=img.closest('figure')||img.parentElement;figure.appendChild(button);}
 });
}
function start(){enhance();if(typeof MutationObserver==='function')new MutationObserver(enhance).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
