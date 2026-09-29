export type SourceKey='DAER'|'CEMADEN'|'INMET'|'DNIT'|'DEFESA_CIVIL';
export type NormalizedEvent={provider:SourceKey;external_id:string;event_type:string;road?:string|null;title:string;description?:string|null;severity:'baixa'|'media'|'alta';status:string;lat?:number|null;lon?:number|null;source_url?:string|null;source_published_at?:string|null;raw:unknown};
export type SyncResult={provider:SourceKey;ok:boolean;seen:number;changed:number;message:string;latencyMs:number};
