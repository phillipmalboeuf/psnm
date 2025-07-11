import type { TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { redirect } from '@sveltejs/kit'
import type { Entry, Tag } from 'contentful'

export const prerender = 'auto'

const redirects = [
  ['/fr', '/'],
  ['/fr/admission/s-inscrire', '/admission'],
  ['/fr/admission/conditions-financieres', '/droits-scolarite'],
  ['/fr/le-psnm/visite-virtuelle', '/pourquoi-choisir-le-psnm'],
  ['/fr/le-psnm/equipe', '/equipe'],
  ['/fr/etre-et-devenir', '/etre-et-devenir'],
  ['/fr/formule-flex1', '/formule-flex'],
  ['/fr/carrieres', '/carriere'],
  ['/fr/nous-joindre', '/contact'],
  ['/fr/le-psnm/pourquoi-choisir-psnm/au-feminin', '/pourquoi-choisir-le-psnm'],
  ['/fr/admission/portes-ouvertes', '/portes-ouvertes'],
  ['/fr/danse-etudes', '/danse-etudes'],
  ['/fr/ma-premiere-annee-au-psnm/materiel-scolaire-et-uniforme', '/premiere-annee-au-psnm'],
  ['/fr/musique-etudes', '/musique-etudes'],
  ['/fr/ma-premiere-annee-au-psnm/une-journee-au-psnm', '/premiere-annee-au-psnm'],
  ['/fr/vie-etudiante/equipes-sportives', '/sports'],
  ['/fr/le-psnm', '/histoire-et-mission'],
  ['/fr/enrichissement-et-projets-particuliers/programme-d-echanges-culturels-et-linguistiques', '/enrichissements'],
  ['/fr/fondation-et-association/fondation', '/fondation'],
  ['/fr/en-savoir-plus/foire-aux-questions', '/foire-aux-questions'],
  ['/fr/le-psnm/nos-anciennes', '/anciennes'],
  ['/fr/vie-etudiante/activites-parascolaires', '/activites-parascolaires'],
  ['/fr/le-psnm/notre-histoire', '/histoire-et-mission'],
  ['/fr/vie-etudiante/voyages', '/voyages'],
  ['/fr/developpement-durable', '/developpement-durable'],
  ['/fr/en-savoir-plus/location-de-salles', '/location-de-salles'],
  ['/fr/le-psnm/*', '/pourquoi-choisir-le-psnm'],
  ['/fr/ma-premiere-annee-au-psnm/*', '/premiere-annee-au-psnm'],
  ['/fr/admission/*', '/admission'],
  ['/fr/enrichissement-et-projets-particuliers/*', '/enrichissements'],
  ['/fr/actualites/*', '/actualites']
]

export const load = async ({ request, cookies, url }) => {
  // Check for exact matches first, then wildcards
  const exactRedirection = redirects.find(r => r[0] === url.pathname)
  if (exactRedirection) {
    return redirect(308, exactRedirection[1])
  }

  // Check for wildcard matches
  const wildcardRedirection = redirects.find(r => {
    if (!r[0].includes('*')) return false
    const pattern = new RegExp('^' + r[0].replace('*', '.*') + '$')
    return pattern.test(url.pathname)
  })
  if (wildcardRedirection) {
    return redirect(308, wildcardRedirection[1])
  }

  if (url.host === 'portesouvertes.psnm.qc.ca') {
    return redirect(308, 'https://www.psnm.qc.ca/portes-ouvertes')
  }

  const [navigations, tags, pages, calendrier] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', include: 3, locale: 'fr-CA' }),
    content.getTags(),
    content.getEntries<TypePageSkeleton>({ content_type: 'page', select: ['fields.id'], locale: 'fr-CA' }),
    content.getAsset('4pjVVDDUJ6ygWJU3UU7XT6', { locale: 'fr-CA' })
  ])

  return {
    navigations: {
      ...navigations.items.reduce((navs, nav) => {
        return {
          ...navs,
          [nav.fields.id]: nav
        }
      }, {} as {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>}),
    },
    tags: tags.items.reduce((ts, tag) => {
      return {
        ...ts,
        [tag.sys.id]: tag
      }
    }, {} as {[id: string]: Tag}),
    pageIds: pages.items.map(page => page.fields.id),
    calendrier
  }
}