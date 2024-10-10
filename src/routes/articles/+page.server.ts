import type { TypeArticleSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

export async function load() {
  try {
    const response = await content.getEntries<TypeArticleSkeleton>({
      content_type: 'article',
      include: 2,
      locale: 'fr-CA',
    });

    const articles = response.items

    return {
      articles,
    };
  } catch (error) {
    throw error(500, {
      message: 'Error fetching articles',
    });
  }
}