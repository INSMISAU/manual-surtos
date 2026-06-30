# Como publicar a plataforma (GitHub Pages, Netlify ou servidor do INS)

Esta plataforma é um site estático: são só ficheiros (HTML, CSS, JS, imagens).
Não precisa de base de dados nem de servidor especial. Funciona em qualquer alojamento
de ficheiros e também offline (abrindo `index.html`).

> **Antes de começar:** descompacta o ficheiro `manual-surtos-ins.zip`.
> Vais obter uma pasta com o `index.html` e a pasta `assets/`. É **o conteúdo desta pasta**
> que vais publicar (o `index.html` tem de ficar na raiz, não dentro de outra subpasta).

---

## Opção A — Netlify Drop (a mais rápida, ~2 minutos, sem conta técnica)

A forma mais simples de obter um link para partilhar com o INS imediatamente.

1. Vai a **https://app.netlify.com/drop**
2. Cria uma conta gratuita (podes entrar com o Google) — basta uma vez.
3. **Arrasta a pasta descompactada** (a que tem o `index.html`) para a área indicada na página.
4. Em segundos recebes um link público do tipo `https://nome-aleatorio.netlify.app`.
5. (Opcional) Em *Site settings → Change site name* podes mudar para algo como
   `manual-surtos-ins.netlify.app`.

**Para actualizar mais tarde:** voltas a arrastar a pasta nova para o mesmo site (*Deploys → Drag and drop*).

---

## Opção B — GitHub Pages num repositório NOVO (recomendado para versão oficial)

1. Entra em **https://github.com** e faz login (ou cria conta).
2. Carrega no **+** (canto superior direito) → **New repository**.
3. Dá um nome, por exemplo `manual-surtos-ins`. Deixa **Public**. Carrega em **Create repository**.
4. Na página do repositório vazio, carrega em **uploading an existing file**
   (ou **Add file → Upload files**).
5. **Arrasta para a janela todos os ficheiros e pastas** de dentro da pasta descompactada
   (o `index.html`, a pasta `assets`, o `.nojekyll`, etc.).
   - Importante: arrasta o **conteúdo** da pasta, não a pasta inteira por cima
     (o `index.html` tem de ficar na raiz do repositório).
6. Em baixo, carrega em **Commit changes**.
7. Vai a **Settings** (do repositório) → no menu lateral, **Pages**.
8. Em **Source**, escolhe **Deploy from a branch**.
9. Em **Branch**, escolhe **main** e a pasta **/ (root)**. Carrega em **Save**.
10. Espera 1–2 minutos e actualiza a página. O GitHub mostra o endereço:
    `https://<o-teu-utilizador>.github.io/manual-surtos-ins/`

Pronto — é esse o link a partilhar.

---

## Opção C — GitHub Pages no repositório EXISTENTE (demo-modulo-surtos)

Se quiseres usar o repositório que já tens:

1. Abre o repositório `demo-modulo-surtos` no GitHub.
2. **Add file → Upload files** e arrasta o conteúdo da pasta descompactada.
   - Se já existirem ficheiros antigos com o mesmo nome, o upload substitui-os ao fazer commit.
   - Se preferires manter o que está, coloca esta versão numa subpasta (ex.: `manual/`)
     e o endereço fica `.../demo-modulo-surtos/manual/`.
3. **Commit changes.**
4. **Settings → Pages** e confirma que está **Branch: main / (root)**.
5. O site fica em `https://percilia-muianga.github.io/demo-modulo-surtos/`.

---

## Opção D — Servir a partir da pasta `/docs` (alternativa no mesmo repo)

Se quiseres manter o código-fonte e o site separados:

1. Cria uma pasta `docs/` no repositório e coloca lá **todo o conteúdo** desta pasta.
2. **Settings → Pages → Branch: main / docs**.
3. O site é publicado a partir de `/docs`.

---

## Opção E — Servidor do INS ou distribuição offline

- **Servidor/website do INS:** entrega esta pasta à equipa de TI do INS. Como são ficheiros
  estáticos, basta copiá-los para qualquer pasta servida pelo servidor web (Apache, Nginx, IIS).
  Os links são relativos, por isso funciona em qualquer subdomínio ou subpasta sem alterações.
- **Offline (provarmos sem internet):** copia a pasta para um computador ou pen e abre o
  `index.html` no browser. Tudo funciona sem rede (as fontes Google são opcionais).
  Ideal para as províncias com ligação limitada, como pede o ToR.

---

## Resolução de problemas

- **A página aparece em branco:** confirma que o `index.html` está na **raiz** (não dentro de
  uma subpasta) e que a pasta `assets/` foi enviada junto.
- **Os ícones ou imagens não aparecem:** garante que enviaste a pasta `assets/` completa
  (subpastas `css`, `js`, `img`, `icons`, `data`).
- **No GitHub diz "404":** espera 1–2 minutos após activar o Pages; confirma em
  *Settings → Pages* que o branch e a pasta estão correctos.
- **Tipos de letra diferentes:** sem internet, o site usa as fontes do sistema — é normal e
  não afecta o conteúdo.

## Como actualizar o conteúdo mais tarde

O texto do manual está em `assets/js/content.js` (gerado a partir do manual).
Para regenerar após alterações ao manual, corre o script `ingest.py` (fora desta pasta).
Depois é só voltar a enviar os ficheiros para o GitHub/Netlify.

---

*Plataforma de digitalização do Manual Nacional para Detecção e Investigação de Surtos —
INS / MISAU. Protótipo para validação de design e estrutura.*
