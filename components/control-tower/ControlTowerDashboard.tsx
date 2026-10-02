import Link from 'next/link';
import Image from 'next/image';
import {
  AlertTriangle,
  Bell,
  Boxes,
  Building2,
  ChevronDown,
  CircleDollarSign,
  CloudRain,
  Gauge,
  Home,
  Layers3,
  Map,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Warehouse,
  Wind,
  Waves,
  Clock3,
  Route,
  CalendarClock,
  ArrowUpRight,
  CircleDot,
} from 'lucide-react';
import LiveOperationsMap from '@/components/LiveOperationsMap';
import { incidents } from '@/lib/data';
import styles from './ControlTowerDashboard.module.css';

const navigation = [
  ['Início', Home, '/dashboard'],
  ['Mapa 4D', Map, '/mapa-4d'],
  ['Operações', PackageCheck, '/monitoramento'],
  ['Fretes', Truck, '/fretes'],
  ['Frota', Truck, '/frota'],
  ['Motoristas', Users, '/motoristas'],
  ['Armazéns', Warehouse, '/armazens'],
  ['Estoque', Boxes, '/estoque'],
  ['Alertas', Bell, '/alertas'],
  ['Financeiro', CircleDollarSign, '/financeiro'],
  ['Marketplace', ShoppingCart, '/marketplace'],
  ['Configurações', Settings, '/configuracoes'],
] as const;

const freightRows = [
  ['Caxias do Sul → São Paulo', 'Carga geral · 28 t', 'R$ 7.800'],
  ['Porto Alegre → Curitiba', 'Alimentos · 22 t', 'R$ 6.450'],
  ['Bento Gonçalves → Florianópolis', 'Bebidas · 18 t', 'R$ 5.200'],
];

const dockRows = [
  ['08:00', 'TransLog', 'Carga', 'Concluída'],
  ['10:00', 'JSL', 'Descarga', 'Em operação'],
  ['13:00', 'Aurora', 'Carga', 'Agendada'],
  ['15:00', 'BRF', 'Descarga', 'Agendada'],
  ['17:00', 'Nestlé', 'Carga', 'Agendada'],
];

export default function ControlTowerDashboard() {
  const highAlerts = incidents.filter((i) => i.severity === 'alta').length;

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <Image
            src="/rota-segura-logo.png"
            alt="Rota Segura"
            width={178}
            height={60}
            className={styles.logo}
            priority
          />
        </div>

        <nav className={styles.nav}>
          {navigation.map(([label, Icon, href], index) => (
            <Link
              key={label}
              href={href}
              className={`${styles.navItem} ${index === 0 ? styles.navActive : ''}`}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
              {label === 'Alertas' && <em>{incidents.length}</em>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarPromo}>
          <span>ROTA SEGURA</span>
          <strong>Resiliência logística em tempo real.</strong>
          <small>Control Tower 4D</small>
        </div>
        <div className={styles.version}>v4.0 · ambiente de desenvolvimento</div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.searchBox}>
            <Search size={17} />
            <input placeholder="Buscar cargas, motoristas, rotas, armazéns, documentos..." />
            <kbd>⌘ K</kbd>
          </div>

          <div className={styles.topActions}>
            <div className={styles.systemStatus}>
              <span className={styles.statusOrb}><i /></span>
              <div>
                <small>Sistema Operacional</small>
                <strong>online</strong>
              </div>
            </div>
            <button className={styles.iconButton} aria-label="Notificações">
              <Bell size={18} />
              <b>{incidents.length}</b>
            </button>
            <div className={styles.userBlock}>
              <div className={styles.avatar}>OP</div>
              <div>
                <strong>Operador</strong>
                <small>Gerente de Operações</small>
              </div>
              <ChevronDown size={15} />
            </div>
          </div>
        </header>

        <div className={styles.dashboard}>
          <section className={styles.mapPanel}>
            <div className={styles.mapPanelHeader}>
              <div>
                <span className={styles.sectionIcon}><Layers3 size={18} /></span>
                <div>
                  <h1>Mapa Operacional 4D</h1>
                  <p>Tráfego · clima · risco · frota · infraestrutura logística</p>
                </div>
              </div>
              <div className={styles.mapTabs}>
                <button className={styles.tabActive}>Tráfego</button>
                <button>Clima</button>
                <button>Risco</button>
                <button>Frota</button>
                <button>Infraestrutura</button>
              </div>
            </div>

            <div className={styles.mapBody}>
              <div className={styles.mapWrap}>
                <LiveOperationsMap />
              </div>

              <div className={styles.mapFilters}>
                {[
                  'Frota em tempo real',
                  'Rotas e tráfego',
                  'Clima (chuva/vento)',
                  'Risco de alagamento',
                  'Interdições',
                  'Centros logísticos',
                  'Armazéns / CDs',
                  'Postos e apoio',
                ].map((item, i) => (
                  <label key={item}>
                    <input type="checkbox" defaultChecked={i < 7} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className={styles.timeline}>
                <button className={styles.playButton}>▶</button>
                <div className={styles.timelineTrack}>
                  {['-24h', '-6h', 'Agora', '+6h', '+12h', '+24h', '+72h'].map((time) => (
                    <span key={time} className={time === 'Agora' ? styles.now : ''}>{time}</span>
                  ))}
                </div>
                <div className={styles.timelineDate}>
                  <Clock3 size={14} /> Agora
                </div>
              </div>
            </div>
          </section>

          <aside className={styles.rightColumn}>
            <section className={styles.panel}>
              <div className={styles.panelTitle}>
                <div><AlertTriangle size={17} /><strong>Alertas em Tempo Real</strong></div>
                <Link href="/alertas">Ver todos ({incidents.length})</Link>
              </div>
              <div className={styles.alertList}>
                {incidents.map((incident) => (
                  <div key={incident.id} className={styles.alertRow}>
                    <span className={`${styles.alertDot} ${incident.severity === 'alta' ? styles.high : incident.severity === 'media' ? styles.medium : styles.low}`}>
                      <AlertTriangle size={13} />
                    </span>
                    <div>
                      <strong>{incident.type}</strong>
                      <small>{incident.road} · {incident.place}</small>
                    </div>
                    <time>{incident.updated}</time>
                    <b className={incident.severity === 'alta' ? styles.highText : incident.severity === 'media' ? styles.mediumText : styles.lowText}>{incident.severity}</b>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelTitle}>
                <div><CloudRain size={17} /><strong>Clima Logístico</strong></div>
                <button>Previsão</button>
              </div>
              <div className={styles.weatherGrid}>
                <div><CloudRain size={24}/><span>Chuva</span><strong>Moderada</strong><small>Serra Gaúcha</small></div>
                <div><Wind size={24}/><span>Vento</span><strong>26 km/h</strong><small>rajadas em observação</small></div>
                <div className={styles.weatherDanger}><Waves size={24}/><span>Risco hídrico</span><strong>{highAlerts ? 'Elevado' : 'Moderado'}</strong><small>monitoramento ativo</small></div>
                <div><ShieldCheck size={24}/><span>Risco operacional</span><strong>Médio</strong><small>região serrana</small></div>
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelTitle}>
                <div><Gauge size={17} /><strong>Resumo da Operação</strong></div>
                <button>24 horas</button>
              </div>
              <div className={styles.summaryGrid}>
                <div><span>Cargas</span><strong>128</strong><small>em trânsito</small></div>
                <div><span>Veículos</span><strong>46</strong><small>ativos</small></div>
                <div><span>Entregas</span><strong>94%</strong><small>no prazo</small></div>
                <div><span>Risco</span><strong>Médio</strong><small>operacional</small></div>
              </div>
            </section>

            <section className={`${styles.panel} ${styles.aiPanel}`}>
              <div className={styles.panelTitle}>
                <div><Sparkles size={17} /><strong>IA Rota Segura</strong></div>
                <button>Nova análise</button>
              </div>
              <div className={styles.aiContent}>
                <span>ANÁLISE OPERACIONAL</span>
                <strong>Há ocorrências de alto impacto próximas a corredores monitorados.</strong>
                <p>O motor de risco deverá cruzar clima, interdições, tipo de veículo e janela de entrega antes de recomendar qualquer desvio.</p>
                <button className={styles.aiAction}>Abrir análise <ArrowUpRight size={14}/></button>
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelTitle}>
                <div><ShieldCheck size={17} /><strong>Score Operacional</strong></div>
                <button>Detalhes</button>
              </div>
              <div className={styles.scoreBlock}>
                <div className={styles.scoreRing}><strong>87</strong><small>de 100</small></div>
                <div className={styles.scoreBars}>
                  {[['Segurança',92],['Pontualidade',88],['Eficiência',84],['Uso da frota',76],['Gestão de risco',90]].map(([label, value]) => (
                    <div key={label as string}>
                      <span>{label}</span>
                      <i><b style={{width:`${value}%`}} /></i>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </aside>

          <section className={styles.bottomGrid}>
            <article className={styles.bottomCard}>
              <div className={styles.bottomHeader}><div><ShoppingCart size={16}/><strong>Marketplace de Fretes</strong></div><Link href="/marketplace">Ver mais</Link></div>
              <div className={styles.freightList}>
                {freightRows.map(([routeName, detail, price]) => (
                  <div key={routeName}>
                    <span className={styles.freightIcon}><Truck size={14}/></span>
                    <div><strong>{routeName}</strong><small>{detail}</small></div>
                    <b>{price}</b>
                    <button>Contratar</button>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.bottomCard}>
              <div className={styles.bottomHeader}><div><Building2 size={16}/><strong>Armazéns / Estoque</strong></div><Link href="/armazens">Ver todos</Link></div>
              <div className={styles.warehouseCard}>
                <div className={styles.warehouseVisual}><Warehouse size={44}/></div>
                <div className={styles.warehouseInfo}>
                  <strong>CD Serra Gaúcha</strong>
                  <small>Bento Gonçalves · RS</small>
                  <span>Ocupação</span>
                  <b>78%</b>
                  <i><em /></i>
                  <div><span>Entradas hoje <b>24</b></span><span>Saídas hoje <b>18</b></span></div>
                </div>
              </div>
            </article>

            <article className={styles.bottomCard}>
              <div className={styles.bottomHeader}><div><CalendarClock size={16}/><strong>Docas Agendadas</strong></div><Link href="/operacoes">Ver todas</Link></div>
              <div className={styles.dockTable}>
                {dockRows.map(([time, company, op, status]) => (
                  <div key={`${time}-${company}`}>
                    <span>{time}</span><strong>{company}</strong><span>{op}</span><b className={status === 'Concluída' ? styles.done : status === 'Em operação' ? styles.running : styles.scheduled}>{status}</b>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
