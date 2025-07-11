// import { PREVIEW } from '$env/static/private'
import { dev } from '$app/environment'
import { createClient, type EntriesQueries, type EntryCollection, type EntrySkeletonType } from 'contentful'
import { redis } from './redis'
import { waitUntil } from '@vercel/functions'

const preview = !!dev
export const content = createClient({
  space: 'cgv311bfeziq',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'ZQmD9fdEsZuQbJHQBFO4rPvK80m9Ov08isdCOwcvomQ' : 'M7YVRmivmU67nnCUtGVQ5tO-b5csOktHIh84-v3cnY0',
}).withoutUnresolvableLinks

export const cachedEntries = async <T extends EntrySkeletonType>(q: EntriesQueries<T, "WITHOUT_UNRESOLVABLE_LINKS">): Promise<EntryCollection<T, "WITHOUT_UNRESOLVABLE_LINKS", string>> => {
  const key = JSON.stringify(q)
  const cached = await redis.get(key)
  if (cached) {
    console.log('cache hit', key)
    return JSON.parse(cached as string)
  }
  console.log('cache miss', key)
  const entries = await content.getEntries(q)
  waitUntil(redis.set(key, JSON.stringify(entries)))
  return entries
}