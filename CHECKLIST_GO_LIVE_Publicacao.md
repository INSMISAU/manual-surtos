# Checklist Go-Live — Publicação do Manual de Surtos

*Validação operacional antes da entrega ao INS. A arquitectura está feita; isto é a lista de verificação. Fazer primeiro no `manual-surtos-teste`, depois igual no `manual-surtos` real.*

---

## 1. Deploy da Edge Function `publicar`
```
supabase login
supabase link --project-ref watlfdjcgfxmzymztmvc
supabase functions deploy publicar
```
**Verificar:** no painel Supabase → Edge Functions, a função `publicar` aparece como *deployed*.

## 2. Configurar o segredo GH_TOKEN
Criar um token **fine-grained** no GitHub (Settings → Developer settings → Fine-grained tokens) com:
- Acesso aos repositórios `INSMISAU/manual-surtos` **e** `INSMISAU/manual-surtos-teste`
- Permissão **Contents: Read and write**

Depois:
```
supabase secrets set GH_TOKEN=github_pat_xxxxxxxx
```
**Verificar:** `supabase secrets list` mostra `GH_TOKEN`.

## 3. RLS da tabela `perfis`
A função lê o perfil com *service role* (não depende da RLS). **Mas o CMS**, ao entrar, lê o próprio perfil com o login do utilizador — por isso a RLS tem de permitir que **cada utilizador leia o seu próprio perfil**.
**Verificar/activar** (SQL no Supabase, se ainda não existir):
```sql
alter table perfis enable row level security;
create policy "ler o proprio perfil"
  on perfis for select
  using (auth.uid() = id);
```
**Testar:** entrar no CMS com uma conta de teste — o nome e o papel devem aparecer no topo.

## 4. Permissões do token GitHub
Já coberto no ponto 2 (Contents: Read and write nos **dois** repositórios). Se faltar, o commit falha com 403.

## 5. A branch `main` aceita commits directos do token
Se os repositórios tiverem **Branch protection** com *Require a pull request before merging* na `main`, o `PATCH` da referência será rejeitado.
**Verificar:** GitHub → repositório → Settings → Branches. Para estes repositórios, a `main` deve **permitir commits directos** (sem exigir PR) — ou o token/app tem de estar autorizado a contornar.
*(A função já devolve uma mensagem clara se isto bloquear.)*

## 6. Testar a publicação no repositório de TESTE
1. Abrir `https://insmisau.github.io/manual-surtos-teste/cms.html`
2. Entrar com uma conta **publicador** ou **admin**
3. Editar um título/secção → **Guardar**
4. **Publicar** → deve aparecer **"✓ Publicação concluída"** (sem downloads, sem token)

## 7. Confirmar que o GitHub Pages actualiza
Após publicar, abrir `https://insmisau.github.io/manual-surtos-teste/index.html` e confirmar a alteração (1–2 min de propagação). Botão **"Ver versão publicada"** leva lá directamente.

## 8. Repetir exactamente o mesmo no repositório REAL
Só depois de tudo validado no teste: subir o mesmo `cms.html` ao `manual-surtos`, e repetir os passos 6 e 7 em `https://insmisau.github.io/manual-surtos/`.

---

## Nota sobre dependência do GitHub (ponto 6 da revisão)
Ao publicar, o CMS descarrega o `content.js` e o `ddata.js` **actuais** do GitHub para construir a nova versão (preserva prefácio, figuras, glossário e ícones). Se esses ficheiros não puderem ser obtidos nesse instante (ex.: limite de pedidos do GitHub), a publicação é **cancelada com aviso** e nada é alterado — comportamento correcto e seguro. Garantir apenas que `content.js`, `assets/js/content.js` e `ddata.js` existem em cada repositório.

## Endurecimentos já aplicados no código (revisão técnica)
- **Permissão via service role** — a verificação de papel não depende da RLS de `perfis`.
- **CORS restrito** — só origens conhecidas (`insmisau.github.io`, `ins.ologa.app`, localhost), já não `*`.
- **Concorrência** — duas publicações simultâneas devolvem mensagem amigável para repetir.
