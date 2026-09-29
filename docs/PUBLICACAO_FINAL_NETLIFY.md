# Publicação final — GitHub + Supabase + Netlify

1. Extraia o projeto e rode `npm install` e `npm run verify`.
2. Crie um projeto Supabase e execute as 3 migrações SQL na ordem indicada em `supabase/setup.sql`.
3. Suba o projeto para um repositório privado no GitHub.
4. No Netlify, importe o repositório. O `netlify.toml` já contém build e agendamento do Data Hub.
5. Cadastre as variáveis do `.env.example` no Netlify. Nunca envie `SUPABASE_SERVICE_ROLE_KEY` ao GitHub.
6. Configure no Supabase Authentication a URL do site e `/auth/callback`.
7. Faça o deploy. Teste `/api/health`, login, dashboard, planejamento, ocorrência e `/data-hub`.
8. Em **Configurações**, use **Instalar RotaSegura** no Chrome/Edge/Android. No Safari iOS/iPadOS use Compartilhar → Adicionar à Tela de Início.
9. Configure seu domínio e atualize `NEXT_PUBLIC_APP_URL` e `ALLOWED_ORIGIN`.
10. Configure cada conector governamental somente com endpoint aprovado. O Data Hub registrará fontes sem endpoint como `aguardando`, não como dados em tempo real.

## Variáveis essenciais
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_APP_URL
- ALLOWED_ORIGIN
- NEXT_PUBLIC_MAP_STYLE_URL
- OSRM_BASE_URL (para piloto; substitua por infraestrutura com SLA em produção)

## Data Hub
- DAER_WFS_URL: serviço oficial WFS/WMS do DAER.
- DAER_WFS_GEOJSON_URL: consulta WFS específica em GeoJSON/JSON, quando definida.
- CEMADEN_EVENTS_URL e CEMADEN_TOKEN: conforme acesso oficial/autorizado.
- INMET_ALERTS_URL, DNIT_EVENTS_URL, DEFESA_CIVIL_EVENTS_URL: endpoints aprovados para ingestão.

O sistema não inventa um endpoint quando o órgão não publica uma API adequada. Isso evita uma falsa sensação de atualização em tempo real.
