-- ══════════════════════════════════════════════════════════
-- KONNECT — Supabase / PostgreSQL Schema (spec §16.2)
-- Run in the Supabase SQL editor or via `supabase db push`.
-- ══════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- USERS ------------------------------------------------------
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  auth_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  role text not null check (role in ('writer','producer')),
  writer_type text,
  plan text not null default 'free',
  genres text[] default '{}',
  languages text[] default '{}',
  badge_level text default 'free',
  verified boolean default false,
  joined_at timestamptz default now()
);

-- PRODUCERS --------------------------------------------------
create table if not exists producers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  company_name text not null,
  contact_name text,
  verified boolean default false,
  genres text[] default '{}',
  budget_range text[] default '{}',
  languages text[] default '{}',
  formats text[] default '{}',
  target_ott text[] default '{}',
  plan text default 'studio_free'
);

-- PITCHES ----------------------------------------------------
create table if not exists pitches (
  id uuid primary key default uuid_generate_v4(),
  writer_id uuid references users(id) on delete cascade,
  title text not null,
  format text not null,
  genre text[] default '{}',
  languages text[] default '{}',
  logline text,
  synopsis_encrypted text,          -- NDA-gated; encrypt at rest
  budget text,
  target_ott text[] default '{}',
  status text default 'draft' check (status in
    ('draft','submitted','under_review','nda','narration','offer','declined')),
  nda_signed boolean default false,
  ip_certificate boolean default false,
  view_count int default 0,
  submitted_at timestamptz
);

-- DEALS (13-stage pipeline) ---------------------------------
create table if not exists deals (
  id uuid primary key default uuid_generate_v4(),
  pitch_id uuid references pitches(id) on delete cascade,
  producer_id uuid references producers(id) on delete cascade,
  writer_id uuid references users(id) on delete cascade,
  stage int default 1 check (stage between 1 and 13),
  nda1_hash text,
  nda1_at timestamptz,
  synopsis_read_at timestamptz,
  deadline_at timestamptz,           -- synopsis_read_at + 7 days
  narr_mode text check (narr_mode in ('online','offline')),
  narr_date timestamptz,
  narr_meet_url text,
  nda2_hash text,
  nda2_at timestamptz,
  agreement_at timestamptz,
  greenlit_at timestamptz,
  status text default 'active' check (status in ('active','declined','expired','completed'))
);

-- NOTIFICATIONS ----------------------------------------------
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  type text,
  title text,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

-- WRITERS ROOMS ----------------------------------------------
create table if not exists rooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  owner_id uuid references users(id) on delete cascade,
  members uuid[] default '{}',
  scripts uuid[] default '{}',
  ip_splits jsonb default '{}',      -- locked at creation
  created_at timestamptz default now()
);

-- MEMBERSHIPS ------------------------------------------------
create table if not exists memberships (
  user_id uuid references users(id) on delete cascade primary key,
  plan text not null,
  starts_at timestamptz default now(),
  expires_at timestamptz,
  razorpay_sub_id text
);

-- ── ROW LEVEL SECURITY (NDA enforcement, spec §16.3) ───────
alter table pitches enable row level security;
alter table deals enable row level security;
alter table notifications enable row level security;

-- Writers see their own pitches
create policy "writers own pitches" on pitches
  for all using (writer_id = auth.uid());

-- Producers can read a pitch synopsis ONLY after NDA-1 (stage >= 4)
create policy "nda gated synopsis" on pitches
  for select using (
    exists (
      select 1 from deals d
      where d.pitch_id = pitches.id
        and d.producer_id = auth.uid()
        and d.stage >= 4
        and d.nda1_hash is not null
    )
  );

-- Deal parties see their own deals
create policy "deal parties" on deals
  for all using (writer_id = auth.uid() or producer_id = auth.uid());

create policy "own notifications" on notifications
  for all using (user_id = auth.uid());

-- ── 7-DAY TIMER (spec §16.5) — run as a pg_cron job ─────────
-- select cron.schedule('konnect-deal-expiry', '0 */6 * * *', $$
--   update deals set status = 'expired'
--   where deadline_at < now() and stage <= 6 and status = 'active';
-- $$);
