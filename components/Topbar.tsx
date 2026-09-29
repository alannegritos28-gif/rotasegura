'use client';
import {Bell,HelpCircle,Search,Wifi,LogOut,ChevronDown} from 'lucide-react';
import {useEffect,useState} from 'react';
import {getBrowserSupabase} from '@/lib/supabaseBrowser';

export default function Topbar(){
 const [online,setOnline]=useState(true);
 const [user,setUser]=useState<{name:string;role:string}>({name:'Operador',role:'Operações'});
 useEffect(()=>{const f=()=>setOnline(navigator.onLine);f();addEventListener('online',f);addEventListener('offline',f);fetch('/api/me').then(r=>r.ok?r.json():null).then(d=>{if(d?.user?.email)setUser({name:d.user.email.split('@')[0],role:d.membership?.role||'membro'})}).catch(()=>{});return()=>{removeEventListener('online',f);removeEventListener('offline',f)}},[]);
 async function logout(){const sb=getBrowserSupabase();await sb?.auth.signOut();location.href='/login'}
 return <header className="topbar">
   <div className="search"><Search size={17}/><input aria-label="Busca global" placeholder="Buscar cidade, rodovia ou destino..."/></div>
   <div className="top-actions">
     <span className={online?'net online':'net offline'}><Wifi size={13}/>{online?'Online':'Offline'}</span>
     <button className="icon-btn notification" aria-label="Notificações"><Bell size={19}/><i>3</i></button>
     <button className="icon-btn" aria-label="Ajuda"><HelpCircle size={19}/></button>
     <div className="top-divider"/>
     <button className="user user-button" type="button">
       <div className="avatar">{user.name.slice(0,2).toUpperCase()}</div>
       <div><b>{user.name}</b><small>{user.role}</small></div>
       <ChevronDown size={15}/>
     </button>
     <button className="icon-btn logout" onClick={logout} aria-label="Sair"><LogOut size={18}/></button>
   </div>
 </header>
}
