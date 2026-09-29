import AppShell from '@/components/AppShell';
import LiveOperationsMap from '@/components/LiveOperationsMap';
import LiveIncidentList from '@/components/LiveIncidentList';
import LiveTripsTable from '@/components/LiveTripsTable';
import OpsKpis from '@/components/OpsKpis';
import IntegrationHealth from '@/components/IntegrationHealth';
import {ArrowRight,Plus} from 'lucide-react';
import Link from 'next/link';

export default function Page(){return <AppShell>
  <div className="page-head compact-head">
    <div><h1>Painel de operações</h1><p>Visão consolidada da operação logística.</p></div>
    <Link className="primary" href="/planejar"><Plus size={17}/> Nova rota</Link>
  </div>
  <OpsKpis/>
  <section className="dashboard-grid">
    <div className="dashboard-main">
      <LiveOperationsMap/>
      <div className="card trips">
        <div className="card-head"><div><h2>Próximas viagens</h2><small>Programação operacional</small></div><Link href="/monitoramento">Ver todas <ArrowRight size={15}/></Link></div>
        <LiveTripsTable/>
      </div>
    </div>
    <aside className="card alerts">
      <div className="card-head"><div><h2>Alertas em tempo real</h2><small>Ocorrências que exigem atenção</small></div><Link href="/alertas">Ver todos</Link></div>
      <LiveIncidentList/>
      <IntegrationHealth/>
    </aside>
  </section>
</AppShell>}
