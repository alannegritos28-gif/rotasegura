'use client';
import {useState} from 'react';
import {ArrowRight,MapPin,Route,ShieldCheck,Truck,RefreshCw,Save,CheckCircle2,SlidersHorizontal} from 'lucide-react';
import ProfessionalMap from './ProfessionalMap';
import {incidents} from '@/lib/data';
type Result=React.ComponentProps<typeof ProfessionalMap>['initialRoute'];

export default function RoutePlanner(){
 const [origin,setOrigin]=useState('Bento Gonçalves - RS');const [destination,setDestination]=useState('Porto Alegre - RS');const [vehicle,setVehicle]=useState('Caminhão 6 eixos');const [route,setRoute]=useState<Result>(null);const [loading,setLoading]=useState(false);const [saving,setSaving]=useState(false);const [saved,setSaved]=useState('');const [error,setError]=useState('');
 async function plan(){setLoading(true);setError('');setSaved('');try{const u=new URL('/api/route',location.origin);u.searchParams.set('origin',origin);u.searchParams.set('destination',destination);u.searchParams.set('vehicle',vehicle);const r=await fetch(u,{cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error(d.error||'Falha ao calcular rota');setRoute(d)}catch(e:any){setError(e.message)}finally{setLoading(false)}}
 async function save(){if(!route)return;setSaving(true);setSaved('');setError('');try{const r=await fetch('/api/trips',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({originLabel:route.origin.label,destinationLabel:route.destination.label,origin:{lon:route.origin.lon,lat:route.origin.lat},destination:{lon:route.destination.lon,lat:route.destination.lat},geometry:route.geometry,distanceKm:route.distanceKm,durationMin:route.durationMin,riskScore:route.riskScore||0,riskLevel:route.risk||'baixo',provider:route.source||'osrm'})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Não foi possível salvar');setSaved(`Viagem ${d.id.slice(0,8)} criada.`)}catch(e:any){setError(e.message)}finally{setSaving(false)}}
 return <div className="planner-layout">
   <section className="planner-panel card">
     <div className="planner-title"><div className="title-icon"><Route size={20}/></div><div><h2>Nova rota</h2><p>Planejamento operacional</p></div></div>
     <label>Origem<div className="input-icon"><MapPin size={16}/><input value={origin} onChange={e=>setOrigin(e.target.value)}/></div></label>
     <label>Destino<div className="input-icon red"><MapPin size={16}/><input value={destination} onChange={e=>setDestination(e.target.value)}/></div></label>
     <label>Perfil do veículo<div className="input-icon"><Truck size={16}/><select value={vehicle} onChange={e=>setVehicle(e.target.value)}><option>Caminhão 6 eixos</option><option>Bitrem 7 eixos</option><option>Rodotrem 9 eixos</option><option>VUC / utilitário</option><option>Ônibus</option></select></div></label>
     <button className="planner-options" type="button"><SlidersHorizontal size={16}/> Preferências da rota <span>Padrão</span></button>
     {route&&<div className="route-summary"><div><small>Distância</small><b>{route.distanceKm} km</b></div><div><small>Tempo</small><b>{Math.floor(route.durationMin/60)}h {route.durationMin%60}min</b></div><div><small>Risco</small><b className={`risk-${route.risk||'baixo'}`}>{route.risk||'baixo'}</b></div></div>}
     {error&&<div className="form-error">{error}</div>}{saved&&<div className="success-msg"><CheckCircle2 size={15}/> {saved}</div>}
     <button className="primary wide planner-cta" onClick={plan} disabled={loading}>{loading?<><RefreshCw className="spin" size={17}/> Calculando…</>:<>Calcular rota <ArrowRight size={17}/></>}</button>
     {route&&<button className="secondary wide" onClick={save} disabled={saving}><Save size={16}/>{saving?'Salvando…':'Salvar viagem'}</button>}
     <div className="planner-security"><ShieldCheck size={14}/><span>Risco, clima e ocorrências considerados no cálculo.</span></div>
   </section>
   <section className="planner-map"><ProfessionalMap incidents={incidents} initialRoute={route}/></section>
 </div>
}
