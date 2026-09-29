# Deploy final: GitHub + Supabase + Netlify

## 1. Pré-requisitos
- GitHub
- Supabase
- Netlify
- Node 22 local
- domínio opcional

## 2. Supabase
Crie um projeto novo. No SQL Editor execute, nesta ordem:
1. `supabase/001_initial.sql`
2. `supabase/migrations/002_professional.sql`

Em Authentication > URL Configuration:
- Site URL: URL final do Netlify, depois substitua pelo domínio próprio.
- Redirect URLs: inclua `https://SEU-SITE.netlify.app/auth/callback` e o domínio próprio.

O onboarding cria perfil, organização e membership owner automaticamente quando o cadastro envia `organization_name`.

## 3. GitHub
Na raiz:
```bash
git init
git add .
git commit -m "RotaSegura Professional 2.0"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/rotasegura.git
git push -u origin main
```
Nunca envie `.env.local`.

## 4. Netlify
No Netlify: Add new project > Import an existing project > GitHub > escolha o repositório.

O `netlify.toml` já define:
- build: `npm run build`
- publish: `.next`
- Node 22
- skew protection do Next.js

## 5. Variáveis no Netlify
Project configuration > Environment variables.

Obrigatórias:
```
NEXT_PUBLIC_APP_NAME=Rota Segura
NEXT_PUBLIC_APP_URL=https://SEU-SITE.netlify.app
NEXT_PUBLIC_MAP_STYLE_URL=https://tiles.openfreemap.org/styles/liberty
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NOMINATIM_USER_AGENT=RotaSegura/2.0 (contato@seudominio.com.br)
ROUTING_PROVIDER=osrm
OSRM_BASE_URL=https://router.project-osrm.org
ALLOWED_ORIGIN=https://SEU-SITE.netlify.app
DAER_WFS_URL=https://mapa.daer.rs.gov.br/i3geo/ogc.php
```

Para produção com tráfego relevante, substitua `OSRM_BASE_URL` por instância própria ou provedor contratado; o servidor público é útil para desenvolvimento/baixo volume, não é infraestrutura dedicada do RotaSegura.

Você também pode instalar a integração Supabase do Netlify para vincular projetos e facilitar configuração de variáveis.

## 6. Primeiro deploy
Clique Deploy. Depois confira:
- `/login`
- `/api/health`
- criação de conta
- `/dashboard`
- `/planejar`
- salvar viagem
- `/ocorrencias`
- instalação PWA

## 7. Domínio
No Netlify > Domain management > Add a domain. Depois atualize:
- `NEXT_PUBLIC_APP_URL`
- `ALLOWED_ORIGIN`
- Supabase Site URL
- Supabase Redirect URLs

Faça novo deploy após alterar as variáveis.

## 8. Checklist de produção
- [ ] MFA obrigatório para owner/admin no Supabase
- [ ] confirmação de e-mail habilitada
- [ ] SMTP próprio configurado
- [ ] backups/PITR conforme plano
- [ ] logs e alertas do Netlify
- [ ] monitoramento de erros
- [ ] WAF/rate limiting adicional para alto volume
- [ ] OSRM/geocoder com SLA ou self-host
- [ ] testes de carga
- [ ] pentest externo
- [ ] política LGPD e termos de uso
- [ ] política de retenção de telemetria
- [ ] canal de resposta a incidentes
- [ ] validação jurídica/licenças de uso dos dados de terceiros

## 9. Rollback
Netlify mantém deploys imutáveis. Se uma publicação falhar, use Deploys e restaure uma versão anterior. Banco de dados deve ser migrado sempre por arquivos versionados em `supabase/migrations`.
