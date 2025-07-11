import type { TypeArticleSkeleton, TypePageSkeleton, TypeCategorieSkeleton } from '$lib/clients/content_types'
import { cachedEntries, content } from '$lib/clients/contentful'

export async function load({ url }) {
  const filter = url.searchParams.get("categorie")

  const [articlesResponse, pageResponse, categoriesResponse] = await Promise.all([
    cachedEntries<TypeArticleSkeleton>({
      content_type: 'article',
      include: 2,
      locale: 'fr-CA',
      order: ['-fields.date'],
      ...filter
      ? { "fields.categorie.fields.id": filter, "fields.categorie.sys.contentType.sys.id": "categorie" }
      : {}
    }),
    cachedEntries<TypePageSkeleton>({
      content_type: 'page',
      include: 2,
      'fields.id': 'actualites',
      locale: 'fr-CA',
    }),
    cachedEntries<TypeCategorieSkeleton>({
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
}