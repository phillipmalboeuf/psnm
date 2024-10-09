<script lang="ts">
  import type { TypeGammeSkeleton, TypeProduitSkeleton, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  // import Star from './Star.svelte'

  let { item }: {
    item: Entry<TypeProduitSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="flex flex--center flex--gapped" id={item.fields.id}>
  <div class="col col--6of12 flex flex--column flex--gapped">
    <h6>{item.fields.sousTitre}</h6>
    {#if item.fields.titre}
    <h2>{item.fields.titre}</h2>
    {/if}

    {#if item.fields.illustration}
    <figure>
      <Media media={item.fields.illustration} />
    </figure>
    {/if}

    {#if item.fields.description}
    <Rich body={item.fields.description} />
    {/if}

    <aside class="flex flex--gapped flex--spaced">
      <h6>
        {item.fields.gauche}
      </h6>

      <h6>
        {item.fields.droite}
      </h6>
    </aside>

    <!-- <nav class="flex flex--gapped">
      <a href={`/gammes/${item.fields.id}`} class="button">Découvrir la gamme</a>
    </nav> -->
  </div>

  {#if item.fields.media}
  <figure class="col col--6of12">
    <Media media={item.fields.media} rounded />
  </figure>
  {/if}
</section>

<style lang="scss">
  section {
    min-height: 50lvh;
    align-items: stretch;
    padding: $s1;
    background-color: $light;
    border-radius: $s1;
    
    > div {
      align-items: center;
      text-align: center;
      // margin: 0 auto;

      figure {
        margin: auto 0;
      }
    }
  }
</style>