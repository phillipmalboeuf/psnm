// import { PREVIEW } from '$env/static/private'
import { createClient } from 'contentful'

const preview = false
export const content = createClient({
  space: 'cgv311bfeziq',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'ZQmD9fdEsZuQbJHQBFO4rPvK80m9Ov08isdCOwcvomQ' : 'M7YVRmivmU67nnCUtGVQ5tO-b5csOktHIh84-v3cnY0',
}).withoutUnresolvableLinks