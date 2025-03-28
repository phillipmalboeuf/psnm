<script lang="ts">
  import { type TypeGallerieSkeleton, type TypeTextSkeleton, isTypeArticle, isTypeQuestion, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'
  
  // import Text from './Text.svelte'
  // import Article from './Article.svelte'
  import Link from './Link.svelte'
  import Media from './Media.svelte'
  import Dots from './Dots.svelte';

  let { item }: {
    item: Entry<TypeGallerieSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let embla: EmblaCarouselType = $state()

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    skipSnaps: true,
    align: 'start'
  }
  const plugins: EmblaPluginType[] = [
    // Autoplay({
    //   delay: 0,
    //   stopOnInteraction: false,
    // })
  ]
</script>

<section class="gallerie" id={item.fields.id}>
  {#if item.fields.titre}
    <hr />
    <div class="flex flex--gapped">
      <h4 class="col col--6of12 h--alt">{@html item.fields.titre.replaceAll('\\n', '<br />')}</h4>
      
      <nav class="col col--6of12 flex flex--gapped flex--end">
        {#if item.fields.liens && item.fields.liens.length > 0}
          {#each item.fields.liens as link}
            <Link className="button button--grey" link={link} />
          {/each}
        {/if}

        {#if item.fields.type === 'Icons'}
        <button class="embla__prev button--accent button--circle" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="32" viewBox="0 0 32 33"><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="currentColor" stroke-width="1.41198"/></svg></button>
        <button class="embla__next button--accent button--circle" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="32" height="32" viewBox="0 0 32 33"><path d="M14.0547 22.4016L19.5187 16.6643L14.0547 10.9271" stroke="currentColor" stroke-width="1.41198"/></svg></button>
        {/if}
      </nav>
    </div>
  {/if}

  {#if item.fields.media && item.fields.media.length > 0}
    {#if item.fields.type === 'Slider' || item.fields.type === 'Icons'}
    <div class="embla" class:icons={item.fields.type === 'Icons'} use:emblaCarouselSvelte={{ options: {
      ...options,
      ...item.fields.type === 'Icons' ? {
        slidesToScroll: 3
      } : {}
    }, plugins, }} onemblaInit={e => embla = e.detail}>
      <ul class="list--nostyle embla__container">
        {#each item.fields.media as media}
        <li class="embla__slide" class:description={media.fields.description}>
          <figure style:--ar={`${media.fields.file.details.image.width} / ${media.fields.file.details.image.height}`}>
            {#if item.fields.type === 'Icons'}
              <a href={media.fields.description} class="icon" target="_blank" rel="noopener noreferrer external">
                <Media {media} />
              </a>
            {:else}
              <Media {media} dialog />
              {#if media.fields.description}
                <figcaption class="small">{@html media.fields.description.replaceAll('\\n', '<br />')}</figcaption>
              {/if}
            {/if}
            
          </figure>
        </li>
        {/each}
      </ul>

      {#if item.fields.type === 'Slider'}
      <button class="embla__prev button--none" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" fill="white" opacity="0.5"/><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="currentColor" stroke-width="1.41198"/></svg></button>
      <button class="embla__next button--none" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" transform="rotate(-180 16 16.7502)" fill="white" opacity="0.5"/><path d="M14.0547 22.4016L19.5187 16.6643L14.0547 10.9271" stroke="currentColor" stroke-width="1.41198"/></svg></button>
      {/if}

      {#if embla && item.fields.media.length < 8}
        <Dots dots={item.fields.media.length} slider={embla} />
      {/if}
    </div>
    {:else}
    <ul class="list--nostyle flex flex--gapped descriptions">
      {#each item.fields.media as media, index}
        <li class="media-item col col--3of12 col--mobile--6of12" class:description={media.fields.description}>
          <figure>
            <Media {media} />
            <figcaption class="padded beige-pale flex flex--column flex--gapped">
              {#if media.fields.title}<p>{@html media.fields.title.replaceAll('\\n', '<br />')}</p>{/if}
              {#if media.fields.description}<p>{@html media.fields.description.replaceAll('\\n', '<br />')}</p>{/if}
            </figcaption>
          </figure>
        </li>
      {/each}
    </ul>
    {/if}
  {/if}
</section>

<style lang="scss">
  .gallerie {
    margin: $s3 0;

    h4 {
      margin-bottom: $s2;
    }

    @media (max-width: $mobile) {
      
      hr {
        margin-bottom: $s-2;
      }
    }

    .embla {
      overflow: hidden;
      margin: 0 calc(-1 * $s1);
      position: relative;

      @media (max-width: $mobile) {
        margin: 0 calc(-1 * $s0);
      }

      .embla__container {
        display: flex;
      }

      .embla__slide {
        --slide-width: auto;
        flex: 0 0 var(--slide-width);
        min-width: 0;
        max-width: none;
        width: var(--slide-width);
        // height: 50lvh;
        
        padding: 0 calc($s0 / 2);

        @media (max-width: $mobile) {
          --slide-width: 90%;
        }

        figure {
          aspect-ratio: var(--ar);
          height: 50lvh;
        }

        &.description {
          figure {
            @media (min-width: $mobile) {
              height: calc(50lvh - $s2);
            }
          }
        }

        :global(img),
        :global(video),
        :global(picture) {
          width: auto;
          height: 100%;

          @media (max-width: $mobile) {
            width: 100%;
            height: 100%;
          }
        }

        &:nth-child(2n) {
          @media (min-width: $mobile) {
            margin-top: $s5;
          }
        }
      }

      > button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &.embla__prev {
          left: calc(1 * $s1);
        }

        &.embla__next {
          right: calc(1 * $s1);
        }
      }

      &.icons {
        margin: 0;

        .embla__slide {
          margin: 0 calc($s1);
          --slide-width: 12%;

          @media (max-width: $mobile) {
            margin: 0 calc($s-1);
            --slide-width: 30%;
          }

          figure {
            aspect-ratio: 1;
            height: 20lvh;

            :global(img) {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
      }
    }

    .media-item {
      // flex: 1;
      :global(img),
      :global(video),
      :global(picture) {
        width: 100%;
        height: auto;
      }
    }

    .descriptions {
      li {
        border-radius: $s-1;
        overflow: hidden;

        figcaption {
          :global(p + p) {
            opacity: 0.5;
            margin-top: calc($s-1 * -1);
          }
        }
      }
    }
  }
</style>