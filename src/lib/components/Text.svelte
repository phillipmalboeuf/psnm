<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, full, small, first }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
    full?: boolean
    small?: boolean
  } = $props()

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="flex flex--middle flex--gapped {item.fields.couleur || ''}" id={item.fields.id}>
  <div class:col--5of12={!!item.fields.media} class:col--6of12={!item.fields.media} class="col flex flex--column flex--gapped">
    {#if item.fields.titre}
    <h2>{item.fields.titre}</h2>
    {/if}

    {#if item.fields.corps}
    <Rich body={item.fields.corps} />
    {/if}
  </div>

  {#if item.fields.media && item.fields.media.length > 0}
  <div class="col col--6of12">
    {#each item.fields.media as media}
      <figure>
        <Media {media} rounded />
      </figure>
    {/each}
  </div>
  {/if}
</section>

<style lang="scss">
  section {
    // text-align: center;
    // min-height: 50lvh;
    
    // div {
    //   align-items: center;
    //   margin: 0 auto;
    // }
  }
</style>