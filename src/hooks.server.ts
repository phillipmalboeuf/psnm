import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

	const response = await resolve(event);

  response.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600000');
  response.headers.set('Cache-Control', 'max-age=3600000');
  response.headers.set('Etag', `"${process.env.VERCEL_URL || 'dev'}"`);

	return response;
};