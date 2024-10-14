<script lang="ts">
  import { onMount } from 'svelte'
  import { } from '$lib/clients/content_types'
  
  import Text from '$lib/components/Text.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  import { date } from '$lib/formatters';
  let { data }: { data: PageData } = $props()
</script>


<section class="flex flex--gapped" id={data.item.fields.id}>
  <hr>
  
  {#if data.item.fields.titre}
  <h1 class="col col--6of12 h2">{data.item.fields.titre}</h1>
  {/if}

  <aside class="col col--6of12 flex flex--gapped flex--end">
    {#if data.item.fields.categorie}
      <a href="/articles?categorie={data.item.fields.categorie.fields.id}">
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

  {#if data.item.fields.thumbnail}
  <figure class="col col--12of12">
    <Media media={data.item.fields.thumbnail} />
  </figure>
  {/if}
</section>




<style lang="scss">
  section {
    hr {
      width: 100%;
      margin: 0;
    }

    aside {

      > a {
        margin: 0 auto;
      }
    }

    figure {
      margin: $s2 0;
    }
  }
</style>