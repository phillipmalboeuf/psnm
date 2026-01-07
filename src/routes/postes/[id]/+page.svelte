<script lang="ts">
  import { onMount } from 'svelte'
  import { isTypeFormulaire, isTypeGallerie, isTypeList, isTypeText, type TypeText, type TypeList, type TypeGallerie, type TypeFormulaire } from '$lib/clients/content_types'
  
  import { date } from '$lib/formatters'
  import List from '$lib/components/List.svelte'
  import Gallerie from '$lib/components/Gallerie.svelte'
  import Form from '$lib/components/Form.svelte'
  import Text from '$lib/components/Text.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'
  import Page from '../../+page.svelte'

  import type { PageData } from './$types'
  const { data } = $props<{ data: PageData }>()
</script>


<section class="flex flex--gapped" id={data.item.fields.id}>
  <hr>
  
  {#if data.item.fields.titre}
  <h1 class="col col--6of12 col--mobile--12of12 h2">{data.item.fields.titre}</h1>
  {/if}

  <aside class="col col--6of12 col--mobile--12of12 flex flex--gapped">
    {#if data.item.fields.type}
      <a href="/postes?type={data.item.fields.type}">
        {data.item.fields.type}
      </a>
    {/if}
    
    {#if data.item.fields.date}
      <date>{date(data.item.fields.date)}</date>
    {/if}
  </aside>
</section>

{#if data.item.fields.contenu?.length}
{#each data.item.fields.contenu as item, i}
<section>
  {#if isTypeText(item)}
  <Text item={item as TypeText<"WITHOUT_UNRESOLVABLE_LINKS">} />
  {:else if isTypeList(item)}
  <List item={item as TypeList<"WITHOUT_UNRESOLVABLE_LINKS">} />
  {:else if isTypeGallerie(item)}
  <Gallerie item={item as TypeGallerie<"WITHOUT_UNRESOLVABLE_LINKS">} />
  {:else if isTypeFormulaire(item)}
  <Form item={item as TypeFormulaire<"WITHOUT_UNRESOLVABLE_LINKS">} />
  {/if}
</section>
{/each}
{/if}

<Page {data} />


<style lang="scss">
  section {
    margin: $s5 0;

    @media (max-width: $mobile) {
      margin: $s2 0;
    }

    hr {
      width: 100%;
      margin: 0;
    }

    aside {
      @media (min-width: $mobile) {
        justify-content: flex-end;
      }

      > a {
        // margin: 0 auto;
      }
    }
  }
</style> 