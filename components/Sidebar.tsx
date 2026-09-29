'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {LayoutDashboard,Route,RadioTower,Truck,Users,TriangleAlert,MapPinned,PlugZap,ShieldCheck,Settings,Smartphone,DatabaseZap,ChevronRight} from 'lucide-react';

const nav=[
  ['/dashboard','Painel',LayoutDashboard],
  ['/planejar','Planejar rota',Route],
  ['/monitoramento','Monitoramento',RadioTower],
  ['/frota','Veículos',Truck],
  ['/motoristas','Motoristas',Users],
  ['/alertas','Alertas',TriangleAlert],
  ['/ocorrencias','Ocorrências',MapPinned],
  ['/integracoes','Integrações',PlugZap],
  ['/data-hub','Data Hub',DatabaseZap],
  ['/seguranca','Segurança',ShieldCheck],
  ['/app-motorista','App motorista',Smartphone],
] as const;

export default function Sidebar(){
  const p=usePathname();
  return <aside className="sidebar">
    <div className="brand"><img src="/rota-segura-logo.png" alt="Rota Segura"/></div>
    <nav className="side-nav">
      {nav.map(([href,label,I])=><Link key={href} href={href} className={p===href?'active':''}><I size={18} strokeWidth={1.85}/><span>{label}</span>{p===href&&<ChevronRight className="side-arrow" size={15}/>}</Link>)}
    </nav>
    <div className="side-bottom">
      <div className="company"><div className="company-icon">MZ</div><div><b>MZ Cargas Transportes</b><small>Plano Enterprise</small></div></div>
      <Link href="/configuracoes" className={p==='/configuracoes'?'active':''}><Settings size={18} strokeWidth={1.85}/><span>Configurações</span></Link>
    </div>
  </aside>
}
