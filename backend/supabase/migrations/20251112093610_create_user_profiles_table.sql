-- supabase/migrations/20251112_create_user_profiles_table.sql

-- 1. Créer la table user_profiles
create table public.user_profiles (
  user_id uuid references auth.users(id) on delete cascade not null primary key,
  email text not null,
  full_name text not null,
  organization_id text,
  role text not null default 'USER',
  password_changed_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Activer Row Level Security
alter table public.user_profiles enable row level security;

-- 3. Politiques de sécurité
create policy "Users can view own profile"
  on public.user_profiles
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.user_profiles
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.user_profiles
  for update
  using (auth.uid() = user_id);

-- 4. Trigger automatique pour créer le profil
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (user_id, email, full_name, role, password_changed_at)
  values (
    new.id, 
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'USER',
    now()
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
