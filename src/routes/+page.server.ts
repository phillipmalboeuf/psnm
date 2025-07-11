
import type { TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { cachedEntries, content } from '$lib/clients/contentful'



export const load = async ({ request, cookies }) => {

  const [page] = await Promise.all([
    cachedEntries<TypePageSkeleton>({ content_type: 'page', include: 3, "fields.id": "accueil", locale: 'fr-CA' }),
  ])

  return {
    page: page.items[0],
  }
}