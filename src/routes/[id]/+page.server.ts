import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { email } from '$lib/clients/postmark'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  const [items] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ 
      content_type: 'page', 
      include: 3, 
      "fields.id": params.id, 
      locale: 'fr-CA' 
    }),
  ])

  if (items.items.length === 0) {
    throw error(404, 'Page non trouvée')
  }

  return {
    page: items.items[0],
  }
}
const contacts = {
  "Absence": "absence@psnm.qc.ca",
  "Admission": "admission@psnm.qc.ca",
  "Administration": "administration@psnm.qc.ca",
  "Communications": "communications@psnm.qc.ca",
  "Finances": "finances@psnm.qc.ca",
  "Fondation": "fondation@psnm.qc.ca",
  "Locations": "location@psnm.qc.ca",
  "Ressources humaines": "rh@psnm.qc.ca",
}

export const actions = {
	contact: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    return await email.sendEmailWithTemplate({
      From: 'communications@psnm.qc.ca',
      To: contacts[data.sujet as string] || 'phil@phils.computer',
      // To: 'phil@phils.computer',
      MessageStream: 'broadcast',
      ReplyTo: data.email as string,
      TemplateAlias: 'base',
      TemplateModel: {
        subject: `[psnm.qc.ca] ${data.sujet as string}`,
        body: `${data.message}<br><br>${data.prenom} ${data.nom} – ${data.email} – ${data.phone}`,
        product_url: "https://psnm.qc.ca",
        product_name: "https://psnm.qc.ca",
        company_name: "PSNM",
        company_address: "PSNM"
      }
    })
	},
  location: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    return await email.sendEmailWithTemplate({
      From: 'communications@psnm.qc.ca',
      To: 'location@psnm.qc.ca',
      MessageStream: 'broadcast',
      ReplyTo: data.email as string,
      TemplateAlias: 'base',
      TemplateModel: {
        subject: `[psnm.qc.ca] Demande de location`,
        body: `${JSON.stringify(data, null, 2)}<br><br>${data.prenom} ${data.nom} – ${data.email} – ${data.phone}`,
        product_url: "https://psnm.qc.ca",
        product_name: "https://psnm.qc.ca",
        company_name: "PSNM",
        company_address: "PSNM"
      }
    })
	},
  association: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    return await email.sendEmailWithTemplate({
      From: 'communications@psnm.qc.ca',
      To: 'associationparents@psnm.qc.ca',
      MessageStream: 'broadcast',
      ReplyTo: data.email as string,
      TemplateAlias: 'base',
      TemplateModel: {
        subject: `[psnm.qc.ca] Demande devenir bénévole`,
        body: `${JSON.stringify(data, null, 2)}<br><br>${data.prenom} ${data.nom} – ${data.email} – ${data.phone}`,
        product_url: "https://psnm.qc.ca",
        product_name: "https://psnm.qc.ca",
        company_name: "PSNM",
        company_address: "PSNM"
      }
    })
  }
}