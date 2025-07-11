import type { TypePosteSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { cachedEntries, content } from '$lib/clients/contentful'

export const load = async ({ params }) => {
  const [items, page] = await Promise.all([
    cachedEntries<TypePosteSkeleton>({ 
      content_type: 'poste', 
      include: 2, 
      "fields.id": params.id, 
      locale: 'fr-CA' 
    }),
    cachedEntries<TypePageSkeleton>({
      content_type: 'page',
      include: 2,
      "fields.id": 'poste',
      locale: 'fr-CA'
    })
  ])

  // console.log(page.items[0])

  return {
    item: items.items[0],
    page: page.items[0]
  }
} 