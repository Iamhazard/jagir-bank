import { Redis } from '@upstash/redis'

let redisUrl=process.env.UPSTASH_REDIS_REST_URL
let token=process.env.UPSTASH_REDIS_REST_TOKEN
export const redisdb = new Redis({
    
 url:redisUrl || '',
 token:token || '', 
});


