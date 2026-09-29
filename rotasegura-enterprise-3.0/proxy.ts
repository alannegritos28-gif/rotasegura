import {createServerClient} from '@supabase/ssr';
import {NextResponse,type NextRequest} from 'next/server';
const protectedPrefixes=['/dashboard','/planejar','/monitoramento','/frota','/motoristas','/ocorrencias','/alertas','/integracoes','/seguranca','/app-motorista'];
export async function proxy(request:NextRequest){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key)return NextResponse.next();
 let response=NextResponse.next({request});
 const supabase=createServerClient(url,key,{cookies:{getAll:()=>request.cookies.getAll(),setAll(items){items.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});items.forEach(({name,value,options})=>response.cookies.set(name,value,options))}}});
 const {data:{user}}=await supabase.auth.getUser();
 const path=request.nextUrl.pathname;const needsAuth=protectedPrefixes.some(p=>path===p||path.startsWith(p+'/'));
 if(needsAuth&&!user){const to=request.nextUrl.clone();to.pathname='/login';to.searchParams.set('next',path);return NextResponse.redirect(to)}
 if(path==='/login'&&user){const to=request.nextUrl.clone();to.pathname='/dashboard';to.search='';return NextResponse.redirect(to)}
 return response;
}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']};
