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

<section class="flex flex--gapped {item.fields.couleur || ''}" class:padded={!!item.fields.couleur} id={item.fields.id}>
  <div class:col--6of12={!!item.fields.media} class:col--12of12={!item.fields.media} class="corps col flex flex--column flex--gapped">
    {#if item.fields.titre}
    <div class="titre">
      <h3>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h3>
    </div>
    {/if}

    {#if item.fields.corps}
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.corps} />
    </div>
    {/if}

    {#if item.fields.liens?.length}
    <ul class="list--nostyle">
      {#each item.fields.liens as link}
        <li><Link className="button {item.fields.couleur ? 'button--muted' : 'button--accent'}" {link} /></li>
      {/each}
    </ul>
    {/if}
  </div>

  {#if item.fields.media && item.fields.media.length > 0}
  <div class="col col--6of12 media">
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

    &.padded {
      border-radius: $s0;
    }
  }
</style>