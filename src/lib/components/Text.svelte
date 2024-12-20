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

<section class="flex flex--gapped {item.fields.couleur || ''}" class:no-media={!item.fields.media} class:padded={!!item.fields.couleur} class:full={item.fields.full} class:vertical={item.fields.vertical} class:alt={item.fields.alt} id={item.fields.id}>
  {#if !item.fields.couleur}
  <hr />
  {/if}
  <div class:col--6of12={!!item.fields.media} class:col--8of12={item.fields.vertical} class:col--12of12={item.fields.full || !item.fields.media} class:flex--column={!item.fields.full} class:flex--spaced={item.fields.full} class="corps col col--mobile--12of12 flex flex--gapped">
    {#if item.fields.titre}
    <div class="titre flex flex--column flex--gapped col col--mobile--12of12" class:col--5of12={item.fields.full}>
      {#if item.fields.sousTitre}
        <small>{@html item.fields.sousTitre.replaceAll('\\n', '<br />')}</small>
      {/if}
      <h3 class:h2={item.fields.media && item.fields.full} class:h4={item.fields.alt}>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h3>
    </div>
    {/if}

    {#if item.fields.corps}
    <div class="flex flex--column flex--gapped col col--mobile--12of12" class:col--4of12={item.fields.full} class:col--7of12={item.fields.full && !item.fields.media}>
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

  {#if item.fields.media && item.fields.media.length > 0}
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
    }

    &.padded {
      border-radius: $s0;
    }

    &.full {
      .media {
        margin-top: $s3;
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
  }

  :global(section:has(> .no-media)) {
    text-align: center;
  }
</style>