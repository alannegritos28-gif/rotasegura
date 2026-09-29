-- Opcional: dados públicos de demonstração. Não execute em produção se não quiser conteúdo fictício.
insert into public.incidents(type,road,place,description,lat,lon,severity,source,status,official_source,confirmations,updated)
values
('Deslizamento','ERS-431','Serra Gaúcha','Demonstração de incidente georreferenciado.',-29.130,-51.540,'alta','COMUNIDADE','Em validação',null,2,'demonstração'),
('Alagamento','BR-470','Serra Gaúcha','Demonstração de risco hidrológico.',-29.240,-51.500,'media','COMUNIDADE','Em validação',null,1,'demonstração')
on conflict do nothing;
