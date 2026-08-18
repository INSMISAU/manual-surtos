-- ============================================================================
-- Migração para a solução A' — token de publicação no Supabase
-- Executar no Supabase → SQL Editor. Uma única vez.
-- ============================================================================

-- 1) Tabela de definições do sistema (uma só linha)
create table if not exists public.system_settings (
  id integer primary key default 1,
  github_token text,
  github_repo text default 'INSMISAU/manual-surtos',
  github_test_repo text default 'INSMISAU/manual-surtos-teste',
  github_branch text default 'main',
  ultima_publicacao timestamptz,
  constraint uma_linha check (id = 1)
);
-- (Se a tabela já existia sem a coluna de teste, garantir que existe:)
alter table public.system_settings
  add column if not exists github_test_repo text default 'INSMISAU/manual-surtos-teste';

-- 2) Activar Row Level Security
alter table public.system_settings enable row level security;

-- 3) LEITURA: publicador e admin (o CMS precisa do token para publicar)
drop policy if exists "ler definicoes publicador admin" on public.system_settings;
create policy "ler definicoes publicador admin"
  on public.system_settings for select
  to authenticated
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid() and p.papel in ('publicador','admin')
    )
  );

-- 4) GESTÃO (inserir/actualizar o token): só admin
drop policy if exists "gerir definicoes admin" on public.system_settings;
create policy "gerir definicoes admin"
  on public.system_settings for all
  to authenticated
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid() and p.papel = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid() and p.papel = 'admin'
    )
  );

-- 5) Criar a linha única (sem token ainda)
insert into public.system_settings (id, github_repo, github_test_repo, github_branch)
values (1, 'INSMISAU/manual-surtos', 'INSMISAU/manual-surtos-teste', 'main')
on conflict (id) do nothing;

-- 6) Colar o token real. Substituir o texto entre plicas por um token GitHub
--    fine-grained com permissão Contents: Read and write nos DOIS repositórios
--    (INSMISAU/manual-surtos e INSMISAU/manual-surtos-teste).
--    Pode fazer-se aqui, ou no Table Editor (Supabase), ou por um ecrã de admin.
update public.system_settings
   set github_token = 'COLAR_TOKEN_FINE_GRAINED_AQUI'
 where id = 1;

-- 7) (Se ainda não existir) Garantir que cada utilizador lê o próprio perfil,
--    necessário para o CMS mostrar nome/papel e para as políticas acima.
-- alter table public.perfis enable row level security;
-- drop policy if exists "ler o proprio perfil" on public.perfis;
-- create policy "ler o proprio perfil" on public.perfis for select using (auth.uid() = id);
