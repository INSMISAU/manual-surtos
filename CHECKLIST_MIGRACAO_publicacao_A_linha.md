# Migração da publicação para a solução A′ (token no Supabase)

*Da Edge Function para A′: o token vive na tabela `system_settings` (protegida por RLS) e o CMS publica directamente. Menos infra, sem CLI, sem Deno, sem CORS. A experiência do publicador não muda — continua a clicar "Publicar".*

## O que muda
- **Sai:** Edge Function, Deno, deploy por CLI, secrets, CORS, service role.
- **Entra:** uma tabela `system_settings` no Supabase (que já existe) com o token, lida automaticamente ao entrar.
- **Não muda:** o publicador só clica "Publicar" → "✓ Publicação concluída". Sem tokens, sem `?config=1`, sem downloads.

## Passos (uma vez, pela OLOGA antes da entrega)

1. **Correr o SQL.** No Supabase → SQL Editor, executar `migracao_system_settings.sql`. Cria a tabela `system_settings` e as políticas RLS (ler: publicador/admin; gerir: só admin).

2. **Colar o token real.** Substituir `COLAR_TOKEN_FINE_GRAINED_AQUI` por um token GitHub **fine-grained** com **Contents: Read and write** nos dois repositórios (`manual-surtos` e `manual-surtos-teste`). Pode ser no próprio SQL (passo 6), no Table Editor, ou por um ecrã de admin.

3. **Confirmar a RLS de `perfis`.** Cada utilizador tem de conseguir ler o próprio perfil (o CMS mostra nome/papel e as políticas de `system_settings` dependem disso). Ver passo 7 do SQL, se necessário.

4. **Subir o `cms.html` novo ao TESTE.** GitHub → `INSMISAU/manual-surtos-teste` → Add file → Upload files → `cms.html` → commit.

5. **Testar no teste.** Abrir `.../manual-surtos-teste/cms.html`, entrar como **publicador** ou **admin**, editar um título/secção → Guardar → **Publicar** → deve aparecer **"✓ Publicação concluída"** (sem downloads).

6. **Confirmar o GitHub Pages.** Abrir `.../manual-surtos-teste/index.html` e ver a alteração (1–2 min). Botão "Ver versão publicada" leva lá.

7. **Repetir no REAL.** Só depois de validado: subir o mesmo `cms.html` a `INSMISAU/manual-surtos` e repetir 5–6 em `.../manual-surtos/`.

8. **Limpar a Edge Function (se chegou a ser criada).**
   - Se tinha feito deploy: `supabase functions delete publicar` e `supabase secrets unset GH_TOKEN`.
   - Apagar a pasta `supabase/functions` do repositório (não é usada).

## Teste completo do fluxo (antes da entrega)
Testar com três contas de papéis diferentes, para validar o circuito editorial de ponta a ponta:
- **Editor** — edita uma doença/secção e submete para revisão. Não deve conseguir publicar.
- **Revisor** — aprova (ou devolve) o que foi submetido. Não deve conseguir publicar.
- **Publicador** — publica o que está aprovado → **"✓ Publicação concluída"**; confirmar no site.

Fluxo esperado: **edição → revisão → aprovação → publicação**, cada papel só com as acções que lhe competem.

## Segurança (resumo da decisão)
- O token é **fine-grained**, só **Contents: Read and write** nos 2 repositórios. Nada mais.
- **Ler o token:** publicador e admin (necessário para publicar no navegador). **Gerir o token:** só admin.
- O token **nunca é mostrado** em nenhum ecrã do CMS. É lido em memória apenas no momento de publicar.
- Rotação do token no futuro: basta **actualizar uma linha** em `system_settings` (não há deploy nem CLI).

## Evolução futura (para o relatório técnico)
O token de publicação é, nesta entrega, um **PAT fine-grained** guardado em `system_settings`. É adequado para o contexto (poucos utilizadores autorizados e de confiança), mas tem uma limitação conhecida: por o commit ser feito no navegador, um publicador autenticado consegue tecnicamente ler o token (não é mostrado, mas está em memória).

**Recomendação para uma versão futura:** substituir o PAT por um **GitHub App**, que não usa um token permanente — o servidor gera um token temporário quando precisa. É a abordagem recomendada pelo GitHub para integrações institucionais. Não se justifica mudar agora (fase final de entrega); fica registado como evolução.
