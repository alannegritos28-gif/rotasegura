import {z} from 'zod';
const schema=z.object({
 NEXT_PUBLIC_SUPABASE_URL:z.string().url().optional().or(z.literal('')),
 NEXT_PUBLIC_SUPABASE_ANON_KEY:z.string().optional(),
 SUPABASE_SERVICE_ROLE_KEY:z.string().optional(),
 NEXT_PUBLIC_MAP_STYLE_URL:z.string().url().default('https://tiles.openfreemap.org/styles/liberty'),
 ROUTING_PROVIDER:z.enum(['osrm']).default('osrm'),
 OSRM_BASE_URL:z.string().url().default('https://router.project-osrm.org'),
 NOMINATIM_USER_AGENT:z.string().default('RotaSegura/2.0'),
});
export const env=schema.parse({
 NEXT_PUBLIC_SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL||'',
 NEXT_PUBLIC_SUPABASE_ANON_KEY:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||'',
 SUPABASE_SERVICE_ROLE_KEY:process.env.SUPABASE_SERVICE_ROLE_KEY||'',
 NEXT_PUBLIC_MAP_STYLE_URL:process.env.NEXT_PUBLIC_MAP_STYLE_URL||undefined,
 ROUTING_PROVIDER:process.env.ROUTING_PROVIDER||undefined,
 OSRM_BASE_URL:process.env.OSRM_BASE_URL||undefined,
 NOMINATIM_USER_AGENT:process.env.NOMINATIM_USER_AGENT||undefined,
});
export const supabaseConfigured=Boolean(env.NEXT_PUBLIC_SUPABASE_URL&&env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
