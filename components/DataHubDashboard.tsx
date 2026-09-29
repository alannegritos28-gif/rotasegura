'use client';
import {useEffect,useState} from 'react';
import {Activity,CheckCircle2,Clock3,DatabaseZap,RefreshCw,TriangleAlert} from 'lucide-react';

type SourceStatus={provider:string;status:string;started_at?:string|null;finished_at?:string|null;records_seen?:number;records_changed?:number;message?:string|null;metadata?:Record<string,unknown>};
const names=['DAER','CEMADEN','INMET','DNIT','DEFESA_CIVIL'] as const;
export default function DataHubDashboard(){
 const [rows,setRows]=useState<SourceStatus[]>([]);const [loading,setLoading]=useState(true);
 useEffect(()=>{const f=()=>fetch('/api/datahub/status',{cache:'no-store'}).then(r=>r.json()).then(d=>setRows((d.sources||[]) as SourceStatus[])).finally(()=>setLoading(false));f();const id=setInterval(f,60000);return()=>clearInterval(id)},[]);
 const m=new Map<string,SourceStatus>(rows.map(x=>[x.provider,x]));
 return <div className="datahub-grid">{names.map(n=>{const r=m.get(n);const ok=r?.status==='success';return <article className="card source-card" key={n}><div className={ok?'source-icon ok':'source-icon'}>{ok?<CheckCircle2/>:r?<TriangleAlert/>:<DatabaseZap/>}</div><div className="source-main"><div className="source-title"><b>{n.replace('_',' ')}</b><span className={ok?'source-pill ok':'source-pill'}>{loading?'consultando':ok?'operacional':r?.status||'aguardando'}</span></div><p>{r?.message||'Aguardando primeira sincronização ou configuração do endpoint.'}</p><div className="source-meta"><span><Clock3 size={13}/>{r?.finished_at?new Date(r.finished_at).toLocaleString('pt-BR'):'Sem execução'}</span><span><Activity size={13}/>{r?.records_seen??0} lidos</span><span><RefreshCw size={13}/>{r?.records_changed??0} atualizados</span></div></div></article>})}</div>
}
