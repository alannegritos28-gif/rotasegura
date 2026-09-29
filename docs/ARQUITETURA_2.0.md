# Arquitetura RotaSegura Professional 2.0

## Camadas
1. Experience: Control Center, App Motorista, PWA.
2. TMS: frota, planejamento, viagens, custos, ETA.
3. DMS: execução, telemetria, ocorrências, confirmações.
4. Intelligence: risco geográfico, clima, eventos oficiais, histórico.
5. Geo: MapLibre + PostGIS + roteador configurável.
6. Data: Supabase PostgreSQL, RLS, Realtime e Auth.
7. Integration: DAER, DNIT, meteorologia, Defesa Civil/Cemaden quando houver canal oficial compatível.

## Multi-tenant
Todas as entidades corporativas carregam `organization_id`. O acesso é validado por RLS. A service role só é usada em processos de integração/administrativos no servidor.

## Confiança dos eventos
- COMUNIDADE / Em validação
- COMUNIDADE / Confirmada por usuários
- OFICIAL / importado por conector auditável
- Descartada

Nunca converter automaticamente um relato comunitário em “oficial”.

## Roteamento
O endpoint `/api/route` geocodifica, pede alternativas ao roteador, cruza o corredor com ocorrências e retorna a menor exposição estimada. Em fases posteriores, pesos de ponte, AET, gabarito, restrições por eixo e modelos hidrometeorológicos podem compor a função de custo.

## Escala
Para alto volume:
- roteador próprio ou comercial
- geocoder próprio/comercial
- cache distribuído
- fila para ingestão de fontes oficiais
- rate limiting distribuído
- observabilidade centralizada
- testes de carga por região e horário
