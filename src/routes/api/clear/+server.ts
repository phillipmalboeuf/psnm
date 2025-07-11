import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types';
import { redis } from '$lib/clients/redis'

export const POST: RequestHandler = async () => {
  await redis.flushAll()
  return json({ success: true })
}
