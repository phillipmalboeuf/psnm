import type { TypeArticleSkeleton, TypePageSkeleton, TypeCategorieSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

export async function load({ url }) {
  try {
    const filter = url.searchParams.get("categorie")

    const [articlesResponse, pageResponse, categoriesResponse] = await Promise.all([
      content.getEntries<TypeArticleSkeleton>({
        content_type: 'article',
        include: 2,
        locale: 'fr-CA',
        ...filter
        ? { "fields.categorie.fields.id": filter, "fields.categorie.sys.contentType.sys.id": "categorie" }
        : {}
      }),
      content.getEntries<TypePageSkeleton>({
        content_type: 'page',
        include: 2,
        'fields.id': 'articles',
        locale: 'fr-CA',
      }),
      content.getEntries<TypeCategorieSkeleton>({
        content_type: 'categorie',
        order: ['fields.titre'],
        locale: 'fr-CA',
      })
    ]);

    const articles = articlesResponse.items;
    const page = pageResponse.items[0];
    const categories = categoriesResponse.items;

    return {
      filter,
      articles,
      page,
      categories,
    }
  } catch (error) {
    throw error(500, {
      message: 'Error fetching content',
    })
  }
}