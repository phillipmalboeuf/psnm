import type { TypePosteSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

export const load = async ({ params }) => {
  const [items, page] = await Promise.all([
    content.getEntries<TypePosteSkeleton>({ 
      content_type: 'poste', 
      include: 2, 
      "fields.id": params.id, 
      locale: 'fr-CA' 
    }),
    content.getEntries<TypePageSkeleton>({
      content_type: 'page',
      include: 2,
      "fields.id": 'poste',
      locale: 'fr-CA'
    })
  ])

  console.log(page.items[0])

  return {
    item: items.items[0],
    page: page.items[0]
  }
} 