export type Severity='baixa'|'media'|'alta';
export type Incident={id:string;type:string;road:string;place:string;lat:number;lon:number;severity:Severity;source:'OFICIAL'|'COMUNIDADE';status:'Confirmada'|'Em validação'|'Monitorada';updated:string;description:string;confirmations:number};
export const incidents:Incident[]=[
 {id:'i1',type:'Deslizamento',road:'ERS-431',place:'Serra Gaúcha',lat:-29.135,lon:-51.73,severity:'alta',source:'OFICIAL',status:'Confirmada',updated:'há 12 min',description:'Trecho sinalizado para monitoramento. Consulte a fonte oficial antes da viagem.',confirmations:8},
 {id:'i2',type:'Chuva intensa',road:'BR-470',place:'Bento Gonçalves',lat:-29.17,lon:-51.52,severity:'media',source:'OFICIAL',status:'Monitorada',updated:'há 7 min',description:'Precipitação elevada na região. Risco operacional em acompanhamento.',confirmations:0},
 {id:'i3',type:'Água sobre a pista',road:'ERS-444',place:'Vale dos Vinhedos',lat:-29.19,lon:-51.58,severity:'media',source:'COMUNIDADE',status:'Em validação',updated:'há 4 min',description:'Relato colaborativo aguardando validação por outros usuários ou operador.',confirmations:2},
 {id:'i4',type:'Obra / meia pista',road:'BR-116',place:'Serra',lat:-29.33,lon:-51.18,severity:'baixa',source:'OFICIAL',status:'Monitorada',updated:'há 28 min',description:'Operação com atenção e possível redução de velocidade.',confirmations:0}
];
export const trips=[
 ['Bento Gonçalves - RS','Porto Alegre - RS','ABC-1D23','Carlos M.','Em rota','2h 11min'],
 ['Caxias do Sul - RS','Vacaria - RS','DEF-5G78','Juliana R.','Planejada','2h 04min'],
 ['Farroupilha - RS','Lajeado - RS','GHI-9J12','Roberto S.','Monitorada','2h 36min'],
 ['Garibaldi - RS','Novo Hamburgo - RS','JKL-3M45','Fernanda L.','Concluída','—']
];
export const vehicles=[
 {plate:'ABC-1D23',model:'Volvo FH 540',axles:'6 eixos',status:'Em rota',driver:'Carlos M.',risk:'Baixo'},
 {plate:'DEF-5G78',model:'Scania R450',axles:'6 eixos',status:'Disponível',driver:'Juliana R.',risk:'Baixo'},
 {plate:'GHI-9J12',model:'Mercedes Actros',axles:'7 eixos',status:'Monitorado',driver:'Roberto S.',risk:'Moderado'},
 {plate:'JKL-3M45',model:'DAF XF',axles:'6 eixos',status:'Manutenção',driver:'—',risk:'—'}
];
