'use client';
import {useState} from 'react';import {Bell,Route,RadioTower,TriangleAlert,CloudRain,Map,Truck,Navigation,ShieldCheck,Camera,Menu,UserRound,ChevronRight} from 'lucide-react';import ProfessionalMap from '@/components/ProfessionalMap';import {incidents} from '@/lib/data';
export default function Page(){const [showMap,setShowMap]=useState(false);return <div className="driver-app">
<header><img src="/rota-segura-logo.png" alt="Rota Segura"/><div><button className="driver-icon"><Bell size={19}/><i>2</i></button><button className="driver-icon"><Menu size={21}/></button></div></header>
<main>
  <div className="driver-welcome"><div><small>Olá, Carlos</small><h1>Sua próxima viagem</h1></div><span className="live"><i/>online</span></div>
  <section className="driver-trip">
    <div className="driver-trip-title"><b>Próxima viagem</b><span>Baixo risco</span></div>
    <div className="driver-points"><p><i className="green-dot"/>Bento Gonçalves - RS</p><p><i className="red-dot"/>Porto Alegre - RS</p></div>
    <div className="driver-meta"><b>121 km</b><b>2h 11min</b><em>BR-470 / BR-116</em></div>
    <button onClick={()=>setShowMap(!showMap)}><Navigation size={18}/> {showMap?'Ocultar mapa':'Iniciar navegação'}</button>
  </section>
  {showMap&&<section className="driver-live-map"><ProfessionalMap incidents={incidents}/></section>}
  <section className="driver-actions"><button><Route/><span>Planejar rota</span></button><button><Truck/><span>Minhas viagens</span></button><button><TriangleAlert/><span>Alertas</span></button><button><Map/><span>Rodovias</span></button><button><CloudRain/><span>Clima</span></button><a href="/ocorrencias"><Camera/><span>Reportar</span></a></section>
  <section className="driver-status"><ShieldCheck/><div><b>Monitoramento ativo</b><small>Sem alertas críticos na rota atual.</small></div><ChevronRight size={18}/></section>
</main>
<nav><button className="active"><Map/><span>Início</span></button><button><Route/><span>Rotas</span></button><button><RadioTower/><span>Viagens</span></button><button><TriangleAlert/><span>Alertas</span></button><button><UserRound/><span>Perfil</span></button></nav>
</div>}
