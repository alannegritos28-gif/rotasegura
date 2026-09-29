# Segurança

O projeto inclui validação server-side, rate limiting básico, headers de segurança, isolamento de segredos, RLS/RBAC no esquema Supabase e trilha de auditoria preparada.

Antes de uso crítico: MFA administrativo, pentest, SAST/DAST, WAF/rate limiting distribuído, CSP ajustada, gestão de sessão, rotação de segredos, backup/PITR, teste de restauração, observabilidade, política LGPD, plano de resposta a incidentes e revisão independente de segurança.

Nunca coloque `SUPABASE_SERVICE_ROLE_KEY` em variável `NEXT_PUBLIC_*`.
