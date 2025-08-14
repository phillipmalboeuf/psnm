import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types';
import { redis } from '$lib/clients/redis'

export const POST: RequestHandler = async () => {
  await redis.flushAll()

  await fetch('https://api.vercel.com/v1/integrations/deploy/prj_C770TogCQomhk6bSLnYIDRR0Ll90/i9YHcnBBAi', {
    method: 'POST',
    headers: {
      // 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`
    }
  })
  
  return json({ success: true })
}
