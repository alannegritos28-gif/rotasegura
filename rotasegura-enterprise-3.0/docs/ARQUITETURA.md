# Arquitetura RotaSegura 1.0 Beta

## Camadas
1. **RotaSegura Control (web/desktop/tablet)**: torre de controle TMS + DMS.
2. **RotaSegura Driver (PWA)**: execução da viagem, alertas e relatos.
3. **Next.js Server**: proxy seguro para geocodificação, roteamento, clima e conectores oficiais.
4. **PostgreSQL/PostGIS (Supabase)**: usuários, organizações, frota, viagens, ocorrências, geometrias e auditoria.
5. **MapLibre GL**: mapa vetorial profissional. O estilo é configurável por `NEXT_PUBLIC_MAP_STYLE_URL`.
6. **Motor de rota beta**: OSRM + pontuação de proximidade a ocorrências. Em produção, usar serviço com SLA/self-host (Valhalla, GraphHopper ou motor contratado) e restrições de caminhão reais.

## TMS
- planejamento de rotas;
- veículos e perfis físicos;
- motoristas;
- viagens;
- custo/tempo/risco;
- relatórios e auditoria.

## DMS
- execução e monitoramento;
- app do motorista;
- ocorrências de campo;
- confirmações;
- alertas e recálculo;
- status da viagem.

## Fontes externas
- DAER-RS WFS/WMS: conector oficial geoespacial configurável;
- DNIT Dados Abertos: bases federais;
- meteorologia: Open-Meteo no beta, conector INMET recomendado para alertas oficiais;
- CEMADEN/Defesa Civil: implementar por feed/API/parceria conforme disponibilidade e termos.
