# Passagem do eBook de testes para o final — 22/10/2026

Origem: manual-surtos-teste-main (3).zip. Base final: manual-surtos-main.zip.
Preparação local, sem commit ou publicação automática.

690 ficheiros do leitor adicionados/actualizados, incluindo imagens, navegação,
tabelas, conteúdos, PDF e instalação offline. Não foram seleccionadas novas imagens
nem escritos novos conteúdos clínicos neste trabalho. O PDF é exactamente o fornecido
na versão de testes; não foi reeditado nem certificado editorialmente nesta passagem.

Preservados: cms.html, README.md, .nojekyll, workflow de manutenção do Supabase,
AUDITORIA_Publicacao_Rastreabilidade.md e assets/css/app.css.
A nota histórica REVISAO_GERMANO_2026-10-01.md permanece no ZIP original de testes.
Não há eliminações. O CMS não foi activado, sincronizado ou alterado.

Verificação executada no candidato composto sobre a versão final:
- três tabelas renderizadas, cabeçalhos agrupados e valores preservados;
- simulação da instalação completa, bloqueio perante falha essencial e leitura
  offline com parâmetros, usando o caminho /manual-surtos/;
- 676 referências locais do service worker presentes;
- 44 referências HTML locais resolvidas;
- sintaxe dos ficheiros JavaScript verificada;
- CMS, workflow e manifest idênticos ao final recebido;
- scripts principais, conteúdos, dados, imagens associadas e PDF copiados sem edição
  a partir da versão de testes recebida.

Limites: não foi testado offline num telemóvel nesta passagem, nem validada a publicação
remota. Estes testes não substituem a aprovação editorial/clinical do INS. Imagens e
comentários ainda pendentes de aprovação continuam sujeitos à equipa; esta passagem
não lhes atribui aprovação. O cache de imagens é opcional e depende do espaço disponível.

Histórico: alteracoes.csv contém os caminhos e hashes antes/depois dos 690 ficheiros.
O pacote guarda ambos os ZIPs originais em HISTORICO, permitindo recuperar a base.
Após publicar, registar o identificador do commit e o resultado da conferência online.
