<script lang="ts">
  import { onMount } from 'svelte'
  import { isTypeFormulaire, isTypeGallerie, isTypeList, isTypeText } from '$lib/clients/content_types'
  
  import { date } from '$lib/formatters'
  import List from '$lib/components/List.svelte'
  import Gallerie from '$lib/components/Gallerie.svelte'
  import Form from '$lib/components/Form.svelte'
  import Text from '$lib/components/Text.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

{#key data.item.sys.id}
<section class="flex flex--gapped" id={data.item.fields.id}>
  <hr>
  
  {#if data.item.fields.titre}
  <h1 class="col col--6of12 col--mobile--12of12 h2">{data.item.fields.titre}</h1>
  {/if}

  <aside class="col col--6of12 col--mobile--12of12 flex flex--gapped flex--end">
    {#if data.item.fields.categorie}
      <a href="/actualites?categorie={data.item.fields.categorie.fields.id}">
        {data.item.fields.categorie.fields.titre}
      </a>
    {/if}
    
    {#if data.item.fields.date}
      <date>{date(data.item.fields.date)}</date>
    {/if}
  </aside>

  <!-- <div class="col col--4of12 flex flex--column flex--gapped">
    

    {#if data.item.fields.description}
    <Rich body={data.item.fields.description} />
    {/if}
  </div> -->

  {#if data.item.fields.image}
  <figure class="col col--12of12">
    <Media media={data.item.fields.media || data.item.fields.image} focalPoint={data.item.fields.focalPoint?.focalPoint} />
    {#if data.item.fields.media}
    {#if data.item.fields.media.fields.description}
    <figcaption>{data.item.fields.media.fields.description}</figcaption>
    {/if}
    {:else if data.item.fields.image.fields.description}
    <figcaption>{data.item.fields.image.fields.description}</figcaption>
    {/if}
  </figure>
  {/if}
</section>
{/key}
{#if data.item.fields.contenu?.length}
{#each data.item.fields.contenu as item, i}
<section>
  {#if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List {item} />
  {:else if isTypeGallerie(item)}
  <Gallerie {item} />
  {:else if isTypeFormulaire(item)}
  <Form {item} />
  {/if}
</section>
{/each}
{/if}




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
      @media (max-width: $mobile) {
        margin-top: $s2;
        justify-content: space-between !important;
      }

      > a {
        // margin: 0 auto;
      }
    }

    figure {
      margin: $s2 0;

      @media (max-width: $mobile) {
        margin-top: 0;
      }

      :global(img),
      :global(video) {
        max-height: 66lvh;
      }
    }
  }
</style>