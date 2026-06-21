// import { PREVIEW } from '$env/static/private'
import { dev } from '$app/environment'
import { createClient, type Asset, type AssetQueries, type EntriesQueries, type EntryCollection, type EntrySkeletonType } from 'contentful'
import { redis } from './redis'
import { waitUntil } from '@vercel/functions'

const preview = !!dev
export const content = createClient({
  space: 'cgv311bfeziq',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'ZQmD9fdEsZuQbJHQBFO4rPvK80m9Ov08isdCOwcvomQ' : 'M7YVRmivmU67nnCUtGVQ5tO-b5csOktHIh84-v3cnY0',
}).withoutUnresolvableLinks

const cached = async <T>(key: string, fetch: () => Promise<T>): Promise<T> => {
  const hit = await redis.get(key)
  if (hit) {
    console.log('cache hit', key)
    return JSON.parse(hit as string)
  }
  console.log('cache miss', key)
  const value = await fetch()
  waitUntil(redis.set(key, JSON.stringify(value)))
  return value
}

export const cachedEntries = async <T extends EntrySkeletonType>(q: EntriesQueries<T, "WITHOUT_UNRESOLVABLE_LINKS">): Promise<EntryCollection<T, "WITHOUT_UNRESOLVABLE_LINKS", string>> => {
  return cached(JSON.stringify(q), () => content.getEntries(q))
}

export const cachedTags = (): Promise<Awaited<ReturnType<typeof content.getTags>>> => {
  return cached('getTags', () => content.getTags())
}

export const cachedAsset = (id: string, query?: AssetQueries<'WITHOUT_UNRESOLVABLE_LINKS'>): Promise<Asset> => {
  return cached(`getAsset:${id}:${JSON.stringify(query ?? {})}`, () => content.getAsset(id, query))
}