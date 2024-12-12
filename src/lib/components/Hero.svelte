<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, first = false }: {
    item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
  } = $props()
</script>

<section class="hero flex flex--bottom" id={item.fields.id} class:full={item.fields.full} class:first={first}>
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
      <Media media={item.fields.media} mobileMedia={item.fields.mobileMedia} rounded={!item.fields.full} />
    </figure>
  {/if}
</section>

<style lang="scss">
  .hero {
    min-height: 100lvh;
    text-align: left;
    position: relative;
    overflow: hidden;

    &.full {
      margin: 0 calc($s1 * -1);
      width: calc(100% + ($s1 * 2));

      @media (max-width: $mobile) {
        margin: 0 calc($s0 * -1);
        width: calc(100% + ($s0 * 2));
      }

      &.first {
        margin-top: calc(($s5 * -1) - ($s1 * 1) - 78px);
        margin-bottom: calc(($s3 * -1));

        @media (max-width: $mobile) {
          margin-top: calc(($s5 * -1) - ($s0 * 1) - 64px);
        }
      }
    }
    
    &__content {
      align-items: flex-start;
      position: relative;
      z-index: 1;
      padding: $s2;
      color: $blanc;

      h1 {
        @media (min-width: $mobile) {
          margin-bottom: $s0;
        }
      }

      @media (max-width: $mobile) {
        padding: $s0 $s0 $s3;
      }
    }

    &__media {
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $vert-fonce;

      :global(img), :global(video), :global(picture) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>