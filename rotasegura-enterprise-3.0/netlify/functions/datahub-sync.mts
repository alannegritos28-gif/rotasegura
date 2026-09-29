import type {Config} from '@netlify/functions';import {syncAllSources} from '../../lib/datahub/sync';
export default async()=>{const results=await syncAllSources();console.log('RotaSegura Data Hub',JSON.stringify(results));};
export const config:Config={schedule:'*/10 * * * *'};
