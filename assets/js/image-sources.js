(function(){
'use strict';
function clean(root){
 root.querySelectorAll('.photo-source,.photo-credit,.risk-credit,.media-credit,.image-card .source').forEach(function(el){
  var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),node;
  while((node=walker.nextNode())){
   var match=/\s*(?:Disponível em\s*:|Acesso em\s*:)/i.exec(node.nodeValue);
   if(!match)continue;
   var range=document.createRange();range.setStart(node,match.index);range.setEnd(el,el.childNodes.length);range.deleteContents();break;
  }
 });
}
window.INSImageSources={clean:clean};
})();
