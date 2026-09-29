# RotaSegura Enterprise Premium 4.0

Plataforma SaaS logística multiempresa para planejamento, monitoramento e inteligência de risco rodoviário.

## Stack
- Next.js 16 + React 19
- Supabase Auth + PostgreSQL + PostGIS + Realtime
- MapLibre GL
- Netlify + Scheduled Functions
- PWA instalável em desktop, Android e iOS/iPadOS

## Produtos
- **RotaSegura Control** — torre de controle, TMS, viagens, frota e monitoramento.
- **RotaSegura Driver** — interface dedicada para motoristas.
- **RotaSegura Intelligence** — Data Hub, risco, fontes oficiais e saúde das integrações.

## Premium 4.0
A versão 4.0 refaz a interface do produto mantendo a arquitetura de produção. O design prioriza mapa, dados operacionais e ações, reduzindo textos explicativos e elementos visuais genéricos.

Consulte:
- `docs/REDESIGN_PREMIUM_4.0.md`
- `docs/PUBLICACAO_FINAL_NETLIFY.md`
- `docs/GO_LIVE_CHECKLIST.md`
- `docs/SEGURANCA.md`

## Desenvolvimento
```bash
npm install
npm run dev
```

## Produção
```bash
npm run build
npm start
```
