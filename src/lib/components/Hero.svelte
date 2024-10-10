<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item }: {
    item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<section class="hero flex flex--bottom" id={item.fields.id}>
  <div class="hero__content flex flex--column flex--gapped">
    {#if item.fields.titre}
      <h1>{item.fields.titre}</h1>
    {/if}

    <!-- {#if item.fields.sousTitre}
      <h2>{item.fields.sousTitre}</h2>
    {/if} -->

    {#if item.fields.corps}
      <Rich body={item.fields.corps} />
    {/if}

    <!-- {#if item.fields.cta}
      <Link href={item.fields.cta.fields.url}>
        {item.fields.cta.fields.texte}
      </Link>
    {/if} -->
  </div>

  {#if item.fields.media}
    <figure class="hero__media">
      <Media media={item.fields.media} />
    </figure>
  {/if}
</section>

<style lang="scss">
  .hero {
    min-height: 100lvh;
    text-align: left;
    position: relative;
    overflow: hidden;
    
    &__content {
      align-items: flex-start;
      position: relative;
      z-index: 1;
      padding: $s2;
      color: $blanc;
    }

    &__media {
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      :global(img), :global(video) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>