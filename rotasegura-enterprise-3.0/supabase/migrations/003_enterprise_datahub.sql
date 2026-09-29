-- RotaSegura Enterprise 3.0
-- Data Hub, trust/freshness, geofences, route-risk snapshots and device installations
create extension if not exists postgis;
create extension if not exists pgcrypto;

create table if not exists public.source_registry (
 provider text primary key,
 display_name text not null,
 source_type text not null default 'government',
 enabled boolean not null default true,
 expected_interval_minutes integer not null default 10,
 official boolean not null default true,
 notes text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

insert into public.source_registry(provider,display_name,source_type,expected_interval_minutes,official,notes) values
 ('DAER','DAER-RS','government',10,true,'Malha e serviços geoespaciais oficiais do RS'),
 ('CEMADEN','CEMADEN','government',10,true,'Dados ambientais e de monitoramento de desastres'),
 ('INMET','INMET','government',10,true,'Avisos e dados meteorológicos'),
 ('DNIT','DNIT','government',15,true,'Dados rodoviários federais'),
 ('DEFESA_CIVIL','Defesa Civil','government',10,true,'Alertas e ocorrências oficiais')
on conflict(provider) do nothing;

create table if not exists public.risk_zones (
 id uuid primary key default gen_random_uuid(),
 provider text not null,
 external_id text,
 title text not null,
 risk_type text not null,
 severity public.severity_level not null default 'media',
 confidence numeric(5,2) not null default 0.80 check(confidence between 0 and 1),
 geometry geometry(geometry,4326) not null,
 valid_from timestamptz,
 valid_until timestamptz,
 source_url text,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(provider,external_id)
);
create index if not exists risk_zones_geom_gix on public.risk_zones using gist(geometry);
create index if not exists risk_zones_validity_idx on public.risk_zones(valid_until,severity);

create table if not exists public.route_risk_assessments (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid references public.organizations(id) on delete cascade,
 trip_id uuid references public.trips(id) on delete cascade,
 route_hash text not null,
 risk_score numeric(8,2) not null,
 risk_level text not null,
 factors jsonb not null default '[]'::jsonb,
 source_freshness jsonb not null default '{}'::jsonb,
 assessed_at timestamptz not null default now()
);
create index if not exists route_risk_org_idx on public.route_risk_assessments(organization_id,assessed_at desc);

create table if not exists public.geofence_rules (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references public.organizations(id) on delete cascade,
 name text not null,
 rule_type text not null default 'risk_zone_entry',
 active boolean not null default true,
 min_severity public.severity_level not null default 'media',
 channels text[] not null default array['in_app']::text[],
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references public.organizations(id) on delete cascade,
 user_id uuid references auth.users(id) on delete cascade,
 trip_id uuid references public.trips(id) on delete cascade,
 kind text not null,
 title text not null,
 body text not null,
 severity public.severity_level not null default 'baixa',
 read_at timestamptz,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications(user_id,created_at desc);

create table if not exists public.driver_messages (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references public.organizations(id) on delete cascade,
 trip_id uuid references public.trips(id) on delete cascade,
 sender_user_id uuid references auth.users(id) on delete set null,
 recipient_user_id uuid references auth.users(id) on delete set null,
 body text not null check(char_length(body) between 1 and 1500),
 created_at timestamptz not null default now()
);

create table if not exists public.device_installations (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid references public.organizations(id) on delete cascade,
 user_id uuid references auth.users(id) on delete cascade,
 device_name text,
 platform text,
 app_version text,
 push_endpoint_hash text,
 last_seen_at timestamptz not null default now(),
 created_at timestamptz not null default now()
);

alter table public.source_registry enable row level security;
alter table public.risk_zones enable row level security;
alter table public.route_risk_assessments enable row level security;
alter table public.geofence_rules enable row level security;
alter table public.notifications enable row level security;
alter table public.driver_messages enable row level security;
alter table public.device_installations enable row level security;

create policy "authenticated read source registry" on public.source_registry for select to authenticated using(true);
create policy "authenticated read risk zones" on public.risk_zones for select to authenticated using(true);
create policy "members read route risks" on public.route_risk_assessments for select to authenticated using(organization_id is null or public.is_member(organization_id));
create policy "members manage geofences" on public.geofence_rules for all to authenticated using(public.is_member(organization_id)) with check(public.is_member(organization_id));
create policy "members read notifications" on public.notifications for select to authenticated using(public.is_member(organization_id) and (user_id is null or user_id=auth.uid()));
create policy "members update notifications" on public.notifications for update to authenticated using(public.is_member(organization_id) and (user_id is null or user_id=auth.uid()));
create policy "members read messages" on public.driver_messages for select to authenticated using(public.is_member(organization_id));
create policy "members send messages" on public.driver_messages for insert to authenticated with check(public.is_member(organization_id) and sender_user_id=auth.uid());
create policy "user manages device installs" on public.device_installations for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());

do $$ begin
 begin alter publication supabase_realtime add table public.notifications; exception when duplicate_object then null; end;
 begin alter publication supabase_realtime add table public.driver_messages; exception when duplicate_object then null; end;
 begin alter publication supabase_realtime add table public.risk_zones; exception when duplicate_object then null; end;
end $$;

create or replace view public.integration_health as
select s.provider,s.display_name,s.enabled,s.expected_interval_minutes,
 r.status,r.started_at,r.finished_at,r.records_seen,r.records_changed,r.message,r.metadata,
 case when r.finished_at is null then 'unknown'
      when now()-r.finished_at > make_interval(mins=>s.expected_interval_minutes*3) then 'stale'
      when r.status='success' then 'healthy' else 'degraded' end as health
from public.source_registry s
left join lateral (
 select * from public.integration_runs ir where ir.provider=s.provider order by ir.started_at desc limit 1
) r on true;

grant select on public.integration_health to authenticated;
