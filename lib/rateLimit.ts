type Bucket={count:number;reset:number};
const buckets=new Map<string,Bucket>();
export function rateLimit(key:string,limit=30,windowMs=60_000){
 const now=Date.now();const b=buckets.get(key);
 if(!b||b.reset<now){buckets.set(key,{count:1,reset:now+windowMs});return {ok:true,remaining:limit-1};}
 if(b.count>=limit)return {ok:false,remaining:0};b.count++;return {ok:true,remaining:limit-b.count};
}
