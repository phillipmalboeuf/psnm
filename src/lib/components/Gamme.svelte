<script lang="ts">
  import type { TypeGammeSkeleton, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  // import Star from './Star.svelte'

  let { item }: {
    item: Entry<TypeGammeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  // let desktop = $state(false)
  let active = $state(item.fields.produits?.length ? item.fields.produits[0] : undefined)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="flex flex--center flex--gapped {item.fields.couleur}" id={item.fields.id}>
  <div class="col col--5of12 flex flex--column flex--gapped">
    <h6>Gamme</h6>
    {#if item.fields.titre}
    <h2 class="h1">{item.fields.titre}</h2>
    {/if}

    <nav class="flex flex--gapped">
      {#each item.fields.produits as produit}
      <a href={`/gammes/${item.fields.id}#${produit.fields.id}`} class="button" class:active={active?.fields.id === produit.fields.id}
        onmouseenter={() => active = produit}>{produit.fields.titre}</a>
      {/each}
    </nav>

    {#if item.fields.description}
    <Rich body={item.fields.description} />
    {/if}

    <nav class="flex flex--gapped">
      <a href={`/gammes/${item.fields.id}`} class="button">Découvrir la gamme</a>
    </nav>
  </div>

  {#if active?.fields.media}
  <figure class="col col--7of12">
    <Media media={active?.fields.media} rounded />
  </figure>
  {/if}
</section>

<style lang="scss">
  section {
    min-height: 50lvh;
    align-items: stretch;
    padding: $s1;
    color: $light;
    background-color: $accent;
    border-radius: $s1;

    .active {
      background-color: $light;
      color: $accent;
      border: 1px solid transparent;
    }

    &.Dark {
      background-color: $accent-dark;
    }

    &.Light {
      color: $accent;
      background-color: $accent-light;

      .active {
        background-color: $accent;
        color: $light;
      }
    }
    
    div {
      // align-items: center;
      // margin: 0 auto;
    }

    

    nav {
      &:first-of-type {
        margin-top: auto;
      }

      a {
        text-transform: uppercase;
      }
    }
  }
</style>