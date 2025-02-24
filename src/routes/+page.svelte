<script lang="ts">
  import { isTypeHero, isTypeList, isTypeText, isTypeFormulaire, isTypeGallerie } from '$lib/clients/content_types'

  import Hero from '$lib/components/Hero.svelte'
  import List from '$lib/components/List.svelte'
  import Text from '$lib/components/Text.svelte'
  import Form from '$lib/components/Form.svelte'
  import Gallerie from '$lib/components/Gallerie.svelte'
  import Popup from '$lib/components/Popup.svelte'
  
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

{#if data.page.fields.popup}
<Popup item={data.page.fields.popup} />
{/if}

{#if data.page.fields.contenu?.length}
{#each data.page.fields.contenu as item, i}
<section>
  {#if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List item={(item.fields.id === 'plus-profils' && ['etre-et-devenir', 'musique-etudes', 'danse-etudes', 'formule-flex'].includes(data.page.fields.id)) ? {
    ...item,
    fields: {
      ...item.fields,
      items: item.fields.items?.filter(listItem => listItem.fields.id !== data.page.fields.id)?.map(listItem => ({
        ...listItem,
        fields: {
          ...listItem.fields,
          sousTitre: 'Profil d\'étude',
          media: undefined,
          corps: []
        }
      }))
    }
  } : item} />
  {:else if isTypeGallerie(item)}
  <Gallerie {item} />
  {:else if isTypeHero(item)}
  <Hero {item} first={i === 0} />
  {:else if isTypeFormulaire(item)}
  <Form {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    margin: $s5 0;
  }
</style>