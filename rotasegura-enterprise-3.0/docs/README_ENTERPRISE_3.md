# RotaSegura Enterprise 3.0

Plataforma logística instalável (PWA) com TMS, DMS, mapa operacional, colaboração de motoristas, PostGIS e Data Hub para ingestão automática de fontes externas.

## Componentes
- RotaSegura Control: torre de controle, frota, viagens, motoristas, alertas.
- RotaSegura Driver: interface móvel, GPS, ocorrências e navegação operacional.
- RotaSegura Intelligence: Data Hub, risco, fontes oficiais, geofencing e histórico.
- PWA instalável em Windows/macOS/Android/iOS/tablets. O botão de instalação fica em **Configurações** quando o navegador permite `beforeinstallprompt`. Em iPhone/iPad, o sistema mostra instruções do Safari.

## Atualização automática
O arquivo `netlify/functions/datahub-sync.mts` roda a cada 10 minutos em produção no Netlify. Cada fonte é um adaptador configurável por variável de ambiente. Eventos normalizados são gravados em `official_events`; cada execução é registrada em `integration_runs` para que o painel mostre saúde e defasagem.

A integração automática só deve usar endpoints públicos/licenciados ou credenciais obtidas legitimamente. Não faça scraping frágil de páginas operacionais quando existir API/WFS/WMS oficial.

## Banco
Execute, em ordem:
1. `supabase/001_initial.sql`
2. `supabase/migrations/002_professional.sql`
3. `supabase/migrations/003_enterprise_datahub.sql`

## Netlify
- Build: `npm run build`
- Publish: `.next`
- Node 22
- Scheduled Function: `datahub-sync`, a cada 10 minutos.

## Produção
Antes de uso operacional crítico, contrate/auto-hospede roteamento e geocodificação com SLA, configure endpoints oficiais, monitore logs, ative MFA no provedor de identidade, faça pentest e crie política de resposta a incidentes.
