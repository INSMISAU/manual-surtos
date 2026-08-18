# Acta de Entrega Técnica — Plataforma "Manual de Surtos"

**Cliente:** Instituto Nacional de Saúde (INS) · MISAU  ·  **Fornecedor:** OLOGA
**Componente:** 1 — Digitalização do Manual (leitor + gestor de conteúdos)  ·  **Data:** 18/08/2026

---

## 1. Arquitectura implementada
- **Leitor público** — site estático em **GitHub Pages** (HTML/CSS/JS, PWA). Lê `content.js` e `ddata.js`. Nunca depende de base de dados em tempo de execução.
- **Gestor de conteúdos (CMS)** — `cms.html`, ligado ao **Supabase** (autenticação, perfis e conteúdo). Papéis: editor, revisor, publicador, admin. Fluxo: rascunho → revisão → aprovado → publicado.
- **Publicação (solução A′)** — o CMS lê o token de publicação da tabela `system_settings` (protegida por RLS) e faz o **commit directamente ao GitHub**. O repositório (teste/real) é escolhido automaticamente pelo endereço. Sem servidor próprio, sem Edge Function.

## 2. Componentes entregues
- `cms.html` (gestor) e o leitor (`index.html`, `doenca.html`, `seccao.html`, … + `app.js`, `content.js`, `ddata.js`).
- `migracao_system_settings.sql` — tabela de definições + políticas RLS.
- `CHECKLIST_MIGRACAO_publicacao_A_linha.md` e `CHECKLIST_GO_LIVE_Publicacao.md`.
- `Descricao_Plataforma_INS_contexto.md` (documento de contexto).

## 3. Dependências
- **Supabase** (Postgres + Auth) — projecto `watlfdjcgfxmzymztmvc`.
- **GitHub** — repositórios `INSMISAU/manual-surtos` e `INSMISAU/manual-surtos-teste` + GitHub Pages.
- Nenhuma outra infraestrutura.

## 4. Limitações conhecidas
- **Token de publicação (PAT fine-grained)** guardado em `system_settings`. Por o commit ser feito no navegador, um **publicador autenticado** consegue tecnicamente lê-lo (não é mostrado, mas está em memória). Compromisso de arquitectura aceite — poucos utilizadores autorizados e de confiança.
- A publicação depende de o **GitHub estar disponível** nesse instante; se falhar, é cancelada com aviso e nada é alterado.

## 5. Evolução recomendada
- Substituir o PAT por um **GitHub App** (gera tokens temporários; sem token permanente). É a abordagem recomendada pelo GitHub para integrações institucionais. Não bloqueia esta entrega.

## 6. Checklist de instalação (resumo)
1. Correr `migracao_system_settings.sql` no Supabase.
2. Inserir o token **fine-grained** (Contents: Read and write nos **dois** repositórios) em `system_settings`.
3. Confirmar RLS de `perfis` (cada utilizador lê o próprio perfil).
4. Subir o `cms.html` ao **teste** → validar → subir ao **real**.
5. Apagar a pasta `supabase/functions` (não utilizada).

## 7. Recuperação em caso de troca de token
1. Gerar novo token fine-grained (Contents: Read and write nos 2 repositórios).
2. No Supabase: `update public.system_settings set github_token='NOVO_TOKEN' where id=1;`
3. Nada mais — sem deploy, sem CLI. Confirmar com um "Publicar" no teste.

## 8. Recomendação para UAT (registada)
Antes da entrada definitiva em produção, realizar um **teste de concorrência**: dois publicadores a publicar quase em simultâneo, para confirmar na prática que o conflito (409/422) é tratado e que a mensagem ao utilizador é suficiente. O código já trata o cenário.

---

**Entregue por (OLOGA):** ______________________  **Data:** ____/____/______

**Recebido por (INS):** ______________________  **Data:** ____/____/______
