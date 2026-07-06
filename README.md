# Manual Nacional para Detecção e Investigação de Surtos — Plataforma Digital (protótipo)

Digitalização interactiva do Manual Nacional (INS / MISAU), construída a partir das maquetas do Hélder
e do texto integral do manual. Site estático (HTML/CSS/JS, sem framework) — funciona **offline**,
basta abrir `index.html` num browser. Compatível com a distribuição offline pretendida pelo ToR (FHI 360 / EpiC).

## Como abrir
Abrir `index.html` com duplo clique. Não precisa de servidor nem de internet
(as fontes Google são opcionais; sem rede, usa as fontes do sistema).

## Estrutura
- `index.html` — Início ("Estrutura de Exploração do Manual")
- `explorar-seccao.html` / `seccao.html?id=N` — secções narrativas (1, 2, 3, 5, 6)
- `explorar-sindrome.html` / `sindrome.html?id=N` — 10 grupos sindrómicos da Secção 4
- `explorar-abecedario.html` — índice A–Z das 37 doenças
- `doenca.html?slug=...` — ficha de doença com blocos "Saber mais" (acordeão)
- `glossario.html` — conceitos epidemiológicos + 62 abreviaturas
- `emendas.html` — histórico de versões / emendas
- `assets/css/style.css` — sistema de design (paleta INS petróleo #007088 / carmim #B02040)
- `assets/js/app.js` — renderização partilhada e ícones
- `assets/js/content.js` / `assets/data/content.json` — conteúdo do manual (gerado)

## Conteúdo
Todo o texto é **reproduzido integralmente** do *Manual Nacional para Detecção e Investigação de Surtos*
(ficheiro fonte indicado em `content.json` → `meta.source`), conforme a directriz de transcrição fiel.
O conteúdo é regenerado pelo script `../ingest.py`.

## Pendente (decisões do INS / entregas do designer)
- Validação clínica de todo o conteúdo pelo INS antes de ir para produção.
- Sistema de cores oficial do INS a confirmar (a paleta actual segue as cores da marca petróleo/carmim).
- Fotografias finais aprovadas (a foto do cartão de destaque é provisória).
- Conceitos do glossário: incluídos exemplos; confirmar redacção oficial com o INS.
- Itens das emendas/versões: a definir pelo INS após publicação oficial.

> Protótipo para validação de **design e estrutura**. Não substitui o manual oficial.

## Actualização — alinhamento com a maquetização final do Hélder (Maio 2026)
- Tipografia **Raleway** (como indicado pelo designer).
- **Capa oficial** no ecrã inicial: ilustração + logos (República de Moçambique + INS/MISAU) + "Marracuene, Maio de 2026".
- **Logos oficiais** no separador Perfil.
- **7 figuras do manual** extraídas do PDF e colocadas nas secções correspondentes:
  Figura 1 (fluxo de notificação) na Secção 2; Figuras 2–6 (tríade da doença e curvas
  epidemiológicas) na Secção 3; Figura 7 (malária) na Secção 5.
- Polimento: painéis de leitura com o tom do impresso e barra carmim no rodapé do conteúdo.

Assets novos: `assets/fig/fig1..7.png`, `assets/img/cover.jpg`, `assets/img/lockup.png`, `assets/img/logos.png`.
atualizacao
deploy 4 julho

