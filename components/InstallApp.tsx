'use client';
import {useEffect,useState} from 'react';
import {Download,CheckCircle2,MonitorSmartphone,Share2} from 'lucide-react';

type PromptEvent=Event & {prompt:()=>Promise<void>; userChoice:Promise<{outcome:'accepted'|'dismissed'}>};
export default function InstallApp(){
 const [prompt,setPrompt]=useState<PromptEvent|null>(null); const [installed,setInstalled]=useState(false); const [ios,setIos]=useState(false);
 useEffect(()=>{
  const standalone=window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone===true; setInstalled(standalone);
  setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
  const before=(e:Event)=>{e.preventDefault();setPrompt(e as PromptEvent)}; const done=()=>{setInstalled(true);setPrompt(null)};
  window.addEventListener('beforeinstallprompt',before); window.addEventListener('appinstalled',done);
  return()=>{window.removeEventListener('beforeinstallprompt',before);window.removeEventListener('appinstalled',done)};
 },[]);
 async function install(){if(!prompt)return;await prompt.prompt();const c=await prompt.userChoice;if(c.outcome==='accepted')setPrompt(null)}
 return <section className="card install-card">
  <div className="install-icon">{installed?<CheckCircle2/>:<MonitorSmartphone/>}</div>
  <div className="install-copy"><div className="eyebrow">APLICATIVO</div><h2>RotaSegura no seu dispositivo</h2>
   <p>Instale como software no Windows/macOS ou como app no Android/iPhone. A mesma conta, dados e políticas de segurança continuam válidos.</p>
   <div className="install-badges"><span>Desktop</span><span>Android</span><span>iPhone/iPad</span><span>Tablet</span></div>
  </div>
  <div className="install-action">
   {installed?<span className="success-msg"><CheckCircle2 size={16}/>Já instalado neste dispositivo</span>:
    prompt?<button className="primary" onClick={install}><Download size={17}/>Instalar RotaSegura</button>:
    ios?<div className="ios-help"><Share2 size={17}/><span>No Safari, toque em <b>Compartilhar</b> → <b>Adicionar à Tela de Início</b>.</span></div>:
    <div className="ios-help"><Download size={17}/><span>Abra pelo Chrome/Edge em HTTPS. Quando o navegador liberar a instalação, o botão aparecerá aqui.</span></div>}
  </div>
 </section>
}
