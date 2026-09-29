# Segurança 2.0

Controles já previstos/implementados:
- segredos fora do Git
- Supabase Auth
- sessão via cookies SSR
- multi-tenant/RLS
- RBAC
- validação backend com Zod
- rate limiting básico
- checagem de Origin em operações mutáveis
- SQL parametrizado/PostgREST/RPC
- mitigação de IDOR via RLS
- service role somente no servidor
- headers de segurança
- PWA sem cache de páginas autenticadas
- popup do mapa sem `innerHTML` de conteúdo de usuário
- auditoria no schema
- conectores externos com URLs controladas no servidor

Pendências obrigatórias antes de ambiente crítico:
- MFA policy
- SMTP corporativo
- pentest
- SAST/DAST no pipeline
- secret scanning no GitHub
- rate limiting distribuído
- central de logs e alertas
- plano de resposta a incidentes
- política de retenção/LGPD
- revisão de dependências contínua
