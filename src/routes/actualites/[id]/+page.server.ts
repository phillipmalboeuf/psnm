import type { TypeArticleSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

export const load = async ({ params }) => {
  const [items] = await Promise.all([
    content.getEntries<TypeArticleSkeleton>({ 
      content_type: 'article', 
      include: 2, 
      "fields.id": params.id, 
      locale: 'fr-CA' 
    }),
  ])

  return {
    item: items.items[0],
  }
}