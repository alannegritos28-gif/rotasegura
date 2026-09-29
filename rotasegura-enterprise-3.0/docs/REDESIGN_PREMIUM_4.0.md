# RotaSegura Enterprise Premium 4.0

Esta versão preserva a arquitetura funcional do Enterprise 3.0 e refaz a experiência visual para um padrão SaaS corporativo mais próximo das referências aprovadas.

## Direção visual
- Sidebar escura e discreta, com ação ativa em verde.
- Topbar compacta com busca, conectividade, notificações e usuário.
- Cards com bordas e sombras mínimas, sem excesso de caixas ou textos.
- Mapa como área principal do produto.
- Tipografia mais compacta e hierarquia visual consistente.
- Ícones exclusivamente Lucide; nenhum emoji operacional.
- App do motorista com interface própria, não uma cópia do desktop.
- Login corporativo com composição editorial, sem excesso de informações técnicas.

## Telas refinadas
- Dashboard / Torre de Controle
- Planejamento de rota
- Monitoramento
- Veículos
- Motoristas
- Alertas
- Ocorrências
- Integrações
- Data Hub
- Segurança
- Configurações / instalação PWA
- App do motorista
- Login

## Manutenção
Toda a lógica de Supabase, APIs, PostGIS, Netlify, PWA e Data Hub foi mantida. O redesign ficou concentrado principalmente em `app/globals.css`, `Sidebar`, `Topbar`, `ProfessionalMap`, `RoutePlanner`, `Dashboard`, `Login` e `App motorista`, tornando futuras alterações visuais mais fáceis sem reescrever o backend.
