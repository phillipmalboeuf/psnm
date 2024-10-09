<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  // import Star from './Star.svelte'

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

<section class="flex flex--center flex--middle flex--gapped" class:dark={item.fields.dark} id={item.fields.id}>
  <div class:col--5of12={!!item.fields.media} class:col--6of12={!item.fields.media} class="col flex flex--column flex--gapped">
    {#if item.fields.titre}
    <h2>{item.fields.titre}</h2>
    {/if}

    {#if item.fields.corps}
    <Rich body={item.fields.corps} />
    {/if}

    {#if item.fields.liens?.length}
    <nav class="flex flex--gapped flex--center">
      {#each item.fields.liens as link}
      <Link {link} className="button" />
      {/each}
    </nav>
    {/if}
  </div>

  {#if item.fields.media}
  <figure class="col col--6of12">
    <Media media={item.fields.media} rounded />
  </figure>
  {/if}
</section>

<style lang="scss">
  section {
    text-align: center;
    min-height: 50lvh;

    &.dark {
      color: $accent-dark;
    }
    
    div {
      align-items: center;
      margin: 0 auto;
    }
  }
</style>