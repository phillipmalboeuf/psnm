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

  let petitMedia = $derived((item.fields.petitMedia && item.fields.media?.length) ? item.fields.media[0] : undefined)
  let media = $derived((!item.fields.petitMedia && item.fields.media?.length) ? item.fields.media[0] : undefined)

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="flex flex--gapped {item.fields.couleur || ''}" class:no-media={!media} class:padded={!!item.fields.couleur} class:full={item.fields.full} class:half={item.fields.full && item.fields.id === 'une-question'} class:vertical={item.fields.vertical} class:alt={item.fields.alt} id={item.fields.id}>
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

    {#if item.fields.corps}
    <div class="inside flex flex--column flex--gapped col col--mobile--12of12" class:col--4of12={item.fields.full} class:col--7of12={item.fields.full && !media}>
      <Rich body={item.fields.corps} />

      {#if item.fields.liens?.length}
      <ul class="list--nostyle">
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
    {#each item.fields.media as media}
      <figure>
        <Media {media} dialog />
      </figure>
    {/each}
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
    }

    &.full {
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

    ul {
      @media (max-width: $mobile) {
        margin-top: $s1;
      }

      &:first-child {
        margin-top: $s2;
      }
    }
  }

  :global(section:has(> .no-media)) {
    text-align: center;
  }
</style>