# Go-live RotaSegura Professional 2.0

## Infra
- [ ] Supabase produção criado
- [ ] SQL 001 e 002 executados
- [ ] Site URL/redirects de Auth corretos
- [ ] GitHub main protegido
- [ ] Netlify conectado ao GitHub
- [ ] variáveis de produção configuradas no Netlify
- [ ] domínio + HTTPS ativos
- [ ] `/api/health` = ok

## Segurança
- [ ] MFA para owner/admin
- [ ] e-mail confirmado
- [ ] service role somente no Netlify
- [ ] secret scanning do GitHub
- [ ] Dependabot/renovação de dependências
- [ ] pentest
- [ ] rate limiting distribuído para tráfego alto
- [ ] logs/alertas

## Dados
- [ ] separar claramente OFICIAL x COMUNIDADE
- [ ] validar licenças/termos de cada fonte
- [ ] política de retenção de GPS
- [ ] LGPD/termos de uso
- [ ] backup e restore testados

## Roteamento
- [ ] substituir OSRM público antes de alto volume
- [ ] substituir geocoder público antes de alto volume
- [ ] testar caminhões/peso/gabarito com fontes adequadas
- [ ] validar rotas críticas em campo
