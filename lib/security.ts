import {NextRequest} from 'next/server';
export function isSameOrigin(req:NextRequest){const origin=req.headers.get('origin');if(!origin)return true;const expected=process.env.ALLOWED_ORIGIN||process.env.NEXT_PUBLIC_APP_URL||new URL(req.url).origin;try{return new URL(origin).origin===new URL(expected).origin}catch{return false}}
