<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  import { onMount, type Snippet } from 'svelte'

  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Dots from './Dots.svelte';

  let { item, full, small, first }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
    full?: boolean
    small?: boolean
  } = $props()

  let petitMedia = $derived((item.fields.petitMedia && item.fields.media?.length) ? item.fields.media[0] : undefined)
  let media = $derived((!item.fields.petitMedia && item.fields.media?.length) ? item.fields.media[0] : undefined)

  let embla: EmblaCarouselType = $state()

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    align: 'start'
  }
  const plugins: EmblaPluginType[] = [
    // Autoplay({
    //   delay: 0,
    //   stopOnInteraction: false,
    // })
  ]

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="flex flex--gapped {item.fields.couleur || ''}" class:no-media={!media} class:padded={!!item.fields.couleur} class:full={item.fields.full} class:half={item.fields.full && item.fields.id === 'une-question'} class:vertical={item.fields.vertical} class:alt={item.fields.alt} class:inverse={item.fields.inverse} id={item.fields.id}>
  {#if !item.fields.couleur}
  <hr />
  {/if}
  <div class:col--6of12={!!media} class:col--8of12={item.fields.vertical} class:col--12of12={item.fields.full || !media} class:flex--column={!item.fields.full} class:flex--spaced={item.fields.full} class="corps col col--mobile--12of12 flex flex--gapped">
    {#if item.fields.titre}
    <div class="titre flex flex--column flex--gapped col col--mobile--12of12" class:col--5of12={item.fields.full}>
      {#if item.fields.sousTitre}
        <small>{@html item.fields.sousTitre.replaceAll('\\n', '<br />')}</small>
      {/if}
      <h3 class="col" class:col--mobile--6of12={petitMedia} class:h2={media && item.fields.full} class:h4={item.fields.alt}>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h3>

      {#if petitMedia}
      <figure class="col col--mobile--6of12">
        <Media media={petitMedia} />
      </figure>
      {/if}
    </div>
    {/if}

    {#if item.fields.corps || item.fields.liens?.length}
    <div class="inside flex flex--column flex--gapped col col--mobile--12of12" class:col--4of12={item.fields.full} class:col--7of12={item.fields.full && !media}>
      {#if item.fields.corps}
      {#if item.fields.plus && item.fields.corps.content.length > 1}
      <Rich body={{
        ...item.fields.corps,
        content: item.fields.corps.content.slice(0, 1)
      }} />
      <details>
        <summary class="button button--accent"></summary>
        <div class="flex flex--column flex--gapped">
          <Rich body={{
            ...item.fields.corps,
            content: item.fields.corps.content.slice(1)
          }} />
        </div>
      </details>
      {:else}
      <Rich body={item.fields.corps} />
      {/if}
      {/if}

      {#if item.fields.liens?.length}
      <ul class="list--nostyle flex flex--gapped">
        {#each item.fields.liens as link}
          <li><Link className="button {item.fields.couleur ? 'button--muted' : 'button--accent'}" {link} /></li>
        {/each}
      </ul>
      {/if}
    </div>
    {/if}
  </div>

  {#if media}
  <div class="col media" class:col--6of12={!item.fields.vertical} class:col--mobile--12of12={!item.fields.vertical} class:col--4of12={item.fields.vertical} class:col--mobile--8of12={item.fields.vertical} class:col--12of12={item.fields.full}>
    {#if item.fields.media.length > 1}
     <div class="embla" use:emblaCarouselSvelte={{ options: { ...options }, plugins, }} onemblaInit={e => embla = e.detail}>
      <ul class="list--nostyle embla__container">
        {#each item.fields.media as media}
        <li class="embla__slide" style:--slide-width="100%">
          <Media {media} dialog />
        </li>
        {/each}
      </ul>

      {#if embla}
      <Dots dots={item.fields.media.length} slider={embla} />
      {/if}
    </div>
    {:else}
    <figure>
      <Media {media} dialog />
    </figure>
    {/if}
  </div>
  {/if}
</section>

<style lang="scss">
  section {
    position: relative;
    // text-align: center;
    // min-height: 50lvh;
    
    // div {
    //   align-items: center;
    //   margin: 0 auto;
    // }

    hr {
      width: 100%;
      margin-bottom: 0;
    }

    :global(.dots) {
      display: flex !important;
    }

    &:has(ul:first-child) {
      width: 100%;
    }

    &.vertical {
      align-items: stretch;

      .corps {
        padding-left: $s1;

        > div {
          justify-content: space-between;
          height: 100%;
        }

        @media (max-width: $mobile) {
          padding-left: $s-1;
        }
      }

      .media {
        margin-left: auto;
      }

      hr {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        border-top: none;
        border-left: 1px solid $sarcelle;
        // margin-left: -20px;
        height: 100%;
      }
    }

    &.no-media {
      display: inline-flex;
      width: auto;
      margin: 0 auto;
      justify-content: center;
      text-align: left;

      &.full {
        width: 100%;
      }

      &.half {
        width: 50%;

        @media (max-width: $mobile) {
          width: 100%;
        }

        .inside {
          padding-left: $s1;
          border-left: 1px dotted;
        }
      }
    }

    &.padded {
      border-radius: $s0;
      max-width: calc($max - $s5);
      align-items: stretch;

      .media.col--6of12 {
        order: -1;
      }

      .corps.col--6of12 {
        justify-content: space-between;

        ul {
          margin-top: $s2;
        }
      }
    }

    &.full:not(.padded) {
      .media {
        margin-top: $s3;
      }
    }

    .corps {
      align-items: stretch;
    }

    .titre {
      @media (max-width: $mobile) {
        margin-bottom: $s1;

        &:has(> .col--mobile--6of12) {
          flex-direction: row;
        }
      }

      figure {
        margin-top: auto;
        max-width: 240px;
      }
    }

    &.alt {
      :global(h1),
      :global(h2),
      :global(h3),
      :global(h4),
      :global(h5),
      :global(h6) {
        font-family: $body_font;
        font-weight: normal;
        letter-spacing: -0.01em;
      }
    }

    ul:not(.embla__container) {
      @media (max-width: $mobile) {
        margin-top: $s1;
      }

      &:first-child {
        margin-top: $s2;
      }
    }

    &.inverse {
      flex-direction: column-reverse;

      .corps {
        flex-direction: column-reverse;
      }

      .titre {
        flex-direction: column-reverse;
        gap: $s-2;
      }
    }

    details {
      summary {
        cursor: pointer;
        width: auto;

        &:after {
          content: 'En lire plus';
        }
      }

      &[open] {
        summary {
          &.button {
            background: transparent;
            border-color: currentColor;
            color: currentColor;
          }
          
          margin-bottom: $s0;

          &:after {
            content: 'En lire moins';
          }
        }
      }
    }
  }

  :global(section:has(> .no-media)) {
    text-align: center;
  }

  

  .embla {
    overflow: hidden;
    // margin: 0 calc(-1 * $s1);

    // @media (max-width: $mobile) {
    //   margin: 0 calc(-1 * $s0);
    // }

    .embla__container {
      display: flex;
      
    }

    .embla__slide {
      flex: 0 0 var(--slide-width);
      min-width: 0;
      max-width: none;
      width: var(--slide-width);
      // padding-left: $s0;

      // @media (max-width: $mobile) {
      //   --slide-width: 90% !important;
      // }
    }
  }
</style>