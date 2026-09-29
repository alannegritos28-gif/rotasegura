import type {LucideIcon} from 'lucide-react';
export default function Kpi({icon:I,label,value,detail,tone='green'}:{icon:LucideIcon,label:string,value:string,detail:string,tone?:string}){return <div className="kpi"><div className={'kpi-icon '+tone}><I size={22}/></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></div>}
