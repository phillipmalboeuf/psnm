<script lang="ts">
  import { type TypeListSkeleton, type TypeTextSkeleton, isTypeArticle, isTypeQuestion, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'
  
  import Text from './Text.svelte'
  import Article from './Article.svelte'
  import Ecole from './Ecole.svelte'
  import Link from './Link.svelte'
  import Question from './Question.svelte'

  let { item }: {
    item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let embla: EmblaCarouselType

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
</script>

<section class="list {item.fields.type}" id={item.fields.id}>
  {#if item.fields.titre}
    <hr />
    <div class="flex flex--gapped">
      <h4 class:h1={item.fields.type === 'Colonnes'} class="col col--6of12">{@html item.fields.titre.replaceAll('\\n', '<br />')}</h4>
      {#if item.fields.liens && item.fields.liens.length > 0}
        <nav class="col col--6of12 flex flex--gapped flex--end">
          {#each item.fields.liens as link}
            <Link className="button button--grey" link={link} />
          {/each}
          {#if item.fields.type === 'Slider'}
            <button class="embla__prev button--none" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" fill="#1C4526"/><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="white" stroke-width="1.41198"/></svg></button>
            <button class="embla__next button--none" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" transform="rotate(-180 16 16.7502)" fill="#1C4526"/><path d="M14.0547 22.4016L19.5187 16.6643L14.0547 10.9271" stroke="white" stroke-width="1.41198"/></svg></button>
          {/if}
        </nav>
      {/if}
    </div>
  {/if}

  {#if item.fields.items && item.fields.items.length > 0}
    {#if item.fields.type === 'Slider'}
    <div class="embla" use:emblaCarouselSvelte={{ options: { ...options }, plugins, }} onemblaInit={e => embla = e.detail}>
      <ul class="embla__container">
        {#each item.fields.items as listItem, index}
        <li class="embla__slide" style:--slide-width={isTypeText(listItem)
          ? '80%'
          : isTypeArticle(listItem)
          ? listItem.fields.vedette ? '60%' : '30%'
          : '100%'}>
          {#if isTypeText(listItem)}
            <Text item={listItem} first={index === 0} />
          {:else if isTypeArticle(listItem)}
            <Article article={listItem} />
          {/if}
        </li>
        {/each}
      </ul>
    </div>
    {:else}
    <ul class="list--nostyle flex flex--gapped">
      {#each item.fields.items as listItem, index}
        {#if item.fields.type === 'Pilules' || item.fields.type === 'Italics' || item.fields.type === 'Accordeon'}
          <li>
            <details class={item.fields.type} name={item.sys.id} open={item.fields.type !== 'Accordeon' &&index === 0}>
              <summary class="{isTypeText(listItem) ? listItem.fields.couleur : ''} h3"
               class:h4={item.fields.type === 'Accordeon'}>
                {listItem.fields.titre}
                {#if item.fields.type === 'Accordeon'}
                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="13.25" y1="0.525635" x2="13.25" y2="25.5256" stroke="currentColor" stroke-width="1.5"/>
                  <line x1="25" y1="13.7756" x2="-6.55671e-08" y2="13.7756" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                {/if}
              </summary>
              <article>
                {#if isTypeText(listItem)}
                  <Text item={listItem} first={index === 0} />
                {:else if isTypeArticle(listItem)}
                  <Article article={listItem} />
                {:else if isTypeQuestion(listItem)}
                  <Question item={listItem} id={item.sys.id} />
                {/if}
              </article>

              {#if item.fields.type === 'Pilules'}
                <Ecole type="two" />
              {/if}
            </details>
          </li>
        {:else}
          {#if isTypeText(listItem)}
          <li class="col" class:col--6of12={item.fields.type === 'Colonnes'}>
            <Text item={listItem} first={index === 0} />
          </li>
          {:else if isTypeArticle(listItem)}
            <Article article={listItem} />
          {:else if isTypeQuestion(listItem)}
          <li class="col col--3of12 question">
            <Question item={listItem} id={item.sys.id} />
          </li>
          {/if}
        {/if}
      {/each}
    </ul>
    {/if}
  {/if}
</section>

<style lang="scss">
  .list {
    padding: $s1 0;

    h4 {
      margin-bottom: $s2;
    }
    

    ul {

      &:has(details.Italics),
      &:has(details.Pilules) {
        display: flex;
        flex-direction: column;
        // gap: $s1;
        gap: $s-1;
        position: relative;
      }

       &:has(details.Italics) {
        border-left: 1px solid;
        padding-left: $s0;
        min-height: 50lvh;
      }

      &:has(details.Accordeon) {
        flex-direction: column;
        gap: 0;

        :global(li) {
          width: 100%;
        }
      }
    }

    &.Colonnes {
      > hr {
        display: none;
      }

      h4 {
        text-align: center;
        margin: $s3 auto;
      }

      ul {
        li {

          &:nth-child(even) {
            margin-top: 20vw;
          }

          :global(section) {
            padding: $s-1;

            :global(.corps) {
              width: 100%;
            }

            :global(.media) {
              order: -1;
              width: 100%;

              :global(img) {
                border-radius: 0;
                border-top-left-radius: $s-1;
                border-top-right-radius: $s-1;
              }
            }
          }
        }
      }
    }

    details {
      summary {
        cursor: pointer;
      }

      &.Pilules,
      &.Italics {
        article {
          position: absolute;
          top: 0;
          right: 0;
          width: calc(100% - 425px - $s1);
          height: 100%;
        }

        &[open] {
          summary {
            pointer-events: none;
          }
        }
      }

      &.Pilules {
        summary {
          padding: $s2;
          border-radius: $s4;
          width: 425px;
          text-align: center;
        }

        &:not([open]) {
          summary {
            color: $noir;
            background-color: $beige-pale;
          }
        }

        :global(svg) {
          position: absolute;
          top: -1px;
          right: -1px;
          height: calc(100% + 2px);
          width: auto;
          color: $blanc;
        }

        :global(.titre) {
          display: none;
        }

        :global(section) {
          height: 100%;
        }

        :global(section .corps) {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 50%;

          :global(hr) {
            margin-top: auto;
          }
        }
      }

      &.Italics {
        
        &[open] {
          summary {
            font-style: italic;
          }

          article {
            border-left: 1px solid;
            padding-left: $s0;
          }
        }

        :global(.titre) {
          display: none;
        }

        :global(.media) {
          margin-top: auto;
        }

        :global(section) {
          height: 100%;
        }

        :global(figure) {
          max-width: 200px;

          :global(img) {
            border-radius: 0;
            border-top-right-radius: $s5;
          }
        }

        :global(section div) {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
      }

      &.Accordeon {
        width: 100%;
        border-top: 1px solid rgba($accent, 0.25);
        // border-bottom: 1px solid;

        :global(.titre) {
          display: none;
        }

        summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: $s-2 0;
          margin-bottom: 0;
        }

        article {
          @media (min-width: $mobile) {
            padding-left: 50%;
          }
        }
      }
    }

    .embla {
      overflow: hidden;
      margin: 0 calc(-1 * $s1);

      .embla__container {
        display: flex;
        
      }

      .embla__slide {
        flex: 0 0 var(--slide-width);
        min-width: 0;
        max-width: none;
        width: var(--slide-width);
        padding-left: $s0;
      }
    }

    :has(.question) {
      justify-content: center;
    }

    .question {
      margin: $s-2;
      
    }
  }
</style>