import type { TypePosteSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { cachedEntries, content } from '$lib/clients/contentful'

export async function load({ url }) {
  const filter = url.searchParams.get("type")

  const [postesResponse, pageResponse] = await Promise.all([
    cachedEntries<TypePosteSkeleton>({
      content_type: 'poste',
      include: 2,
      locale: 'fr-CA',
      ...filter
      ? { "fields.type": filter }
      : {}
    }),
    cachedEntries<TypePageSkeleton>({
      content_type: 'page',
      include: 2,
      'fields.id': 'postes',
      locale: 'fr-CA',
    })
  ]);

  const postes = postesResponse.items;
  const page = pageResponse.items[0];
  const types = ["Temps plein", "Temps partiel", "Stage"]

  return {
    filter,
    postes,
    page,
    types,
  }
} 