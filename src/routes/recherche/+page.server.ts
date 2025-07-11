import type { TypePageSkeleton, TypeArticleSkeleton } from '$lib/clients/content_types'
import { cachedEntries } from '$lib/clients/contentful'
// import { languageTag } from '$lib/paraglide/runtime.js'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  if (!url.searchParams.has('q')) return
  
  const [pages, articles] = await Promise.all([
    cachedEntries<TypePageSkeleton>({ content_type: "page", include: 2, "query": url.searchParams.get('q'), select: ["sys.id", "sys.contentType", "fields.id", "fields.titre"] }),
    cachedEntries<TypeArticleSkeleton>({ content_type: "article", include: 2, "query": url.searchParams.get('q'), select: ["sys.id", "sys.contentType", "fields.id", "fields.titre"] }),
  ])

  return {
    pages,
    articles
  }
})