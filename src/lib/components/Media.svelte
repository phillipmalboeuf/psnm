<script lang="ts">
  import type { Asset } from 'contentful'

  let {
    media,
    mobileMedia,
    alt,
    width = 1666,
    ar = undefined,
    focalPoint,
    rounded = false,
    eager = false,
    dialog = false
  } : {
    media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
    mobileMedia?: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
    alt?: string
    width?: number
    ar?: number
    focalPoint?: { x: number, y: number }
    rounded?: boolean
    eager?: boolean
    dialog?: boolean
  } = $props()

  let dialogEl: HTMLDialogElement = $state()

  function openDialog() {
    if (dialog && dialogEl) {
      dialogEl.showModal()
    }
  }

  function cdn(url: string) {
    return url
  }

  function getNormalizedFocalPoint(fp: { x: number, y: number }, width: number, height: number) {
    return {
      x: fp.x / width,
      y: fp.y / height
    }
  }
</script>

{#snippet render()}
  {#if media?.fields.file}
    {#if media.fields.file.contentType.startsWith('video/')}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        onclick={openDialog}
        class:rounded 
        src="{cdn(media.fields.file.url)}" 
        controls 
        autoplay={eager} 
        muted={eager} 
        loop={eager}
      ></video>
    {:else if media.fields.file.contentType.startsWith('audio/')}
      <!-- svelte-ignore a11y-media-has-caption -->
      <audio 
        class:rounded 
        src="{cdn(media.fields.file.url)}" 
        controls
      ></audio>
    {:else}
      {@const normalizedFP = focalPoint ? getNormalizedFocalPoint(
        focalPoint,
        media.fields.file.details.image.width,
        media.fields.file.details.image.height
      ) : undefined}
      <!-- {JSON.stringify(media, null, 2)} -->
      <picture onclick={openDialog}>
        <source srcSet="{cdn(mobileMedia ? mobileMedia.fields.file.url : media.fields.file.url)}?h={Math.round(width * 0.333)}{ar ? `&fit=fill&w=${Math.round(width * 0.333 * ar)}` : ''}" media="(max-width: 900px)" />
        <source srcSet="{cdn(media.fields.file.url)}?w={Math.round(width * 0.666)}{ar ? `&fit=fill&h=${Math.round(width * 0.666 * ar)}` : ''}" media="(max-width: 1200px)" />
        <source srcSet="{cdn(media.fields.file.url)}?w={Math.round(width * 1.333)}{ar ? `&fit=fill&h=${Math.round(width * 1.333 * ar)}` : ''}" media="(min-width: 1500px)" />
        <img class:rounded src="{cdn(media.fields.file.url)}?w={width}{ar ? `&fit=fill&h=${Math.round(width * ar)}` : ''}"
          style:--ar={ar ? `${width} / ${Math.round(width * ar)}` : `${media.fields.file.details.image.width} / ${media.fields.file.details.image.height}`}
          style:--mobile-ar={(!ar && mobileMedia) ? `${mobileMedia.fields.file.details.image.width} / ${mobileMedia.fields.file.details.image.height}` : undefined}
          style:--fp-x={normalizedFP ? `${normalizedFP.x * 100}%` : '50%'}
          style:--fp-y={normalizedFP ? `${normalizedFP.y * 100}%` : '50%'}
          alt="{alt || media.fields.title}" loading={eager ? "eager" : "lazy"} />
      </picture>
    {/if}
  {/if}
{/snippet}

{@render render()}

{#if dialog}
  <dialog bind:this={dialogEl} onclick={() => dialogEl.close()}>
    <figure class="padded flex flex--gapped flex--column vert-fonce">
      {@render render()}
      <figcaption class="flex flex--gapped flex--spaced">
        {#if media.fields.title}<p>{@html media.fields.title.replaceAll('\\n', '<br />')}</p>{/if}
        {#if media.fields.description}<p>{@html media.fields.description.replaceAll('\\n', '<br />')}</p>{/if}
      </figcaption>
    </figure>
  </dialog>
{/if}

<style lang="scss">
  img,
  video,
  audio {
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: var(--fp-x) var(--fp-y);
    // border-radius: $radius;

    &.rounded {
      border-radius: $radius;
    }

    aspect-ratio: var(--ar);

    @media (max-width: $mobile) {
      aspect-ratio: var(--mobile-ar, var(--ar));
    }

    &:has(:global(+ dialog)) {
      cursor: pointer;
    }
  }

  picture {
    &:has(:global(+ dialog)) {
      cursor: pointer;
    }
  }

  video {
    // background-color: var(--background-inverse);
    // cursor: pointer;
  }
 
  audio::-webkit-media-controls-enclosure {
    // background-color: var(--background-inverse);
  }

  dialog {

    figure {
      width: auto;
      border-radius: $radius;
      gap: $s-2;
      padding-bottom: $s2;
      max-width: 66vw;
      max-height: 90vh;
    }

    img,
    video,
    audio {
      width: 100% !important;
      
      // width: auto;
      height: auto !important;
      max-height: 80lvh;
      object-fit: contain;
      background-color: $noir;
      margin: auto;
      border-radius: $radius !important;
    }
  }
</style>