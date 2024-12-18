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
  import Dots from './Dots.svelte'

  let { item }: {
    item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

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
</script>

<section class="list {item.fields.type}" id={item.fields.id}>
  {#if item.fields.titre}
    <hr />
    <nav class="flex flex--gapped">
      <h4 class:h--alt={item.fields.type !== 'Colonnes'} class:h1={item.fields.type === 'Colonnes'} class="col col--6of12" class:col--12of12={!(item.fields.liens && item.fields.liens.length > 0)}>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h4>
      {#if item.fields.liens && item.fields.liens.length > 0}
        <div class="col col--6of12 flex flex--gapped flex--end">
          {#each item.fields.liens as link}
            <Link className="button button--grey" link={link} />
          {/each}
          {#if item.fields.type === 'Slider'}
            <button class="embla__prev button--none" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" fill="#1C4526"/><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="white" stroke-width="1.41198"/></svg></button>
            <button class="embla__next button--none" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" transform="rotate(-180 16 16.7502)" fill="#1C4526"/><path d="M14.0547 22.4016L19.5187 16.6643L14.0547 10.9271" stroke="white" stroke-width="1.41198"/></svg></button>
          {/if}
        </div>
      {/if}
    </nav>
  {/if}

  {#if item.fields.items && item.fields.items.length > 0}
    {#if item.fields.type === 'Slider'}
    <div class="embla" use:emblaCarouselSvelte={{ options: { ...options }, plugins, }} onemblaInit={e => embla = e.detail}>
      <ul class="list--nostyle embla__container">
        {#each item.fields.items as listItem, index}
        <li class="embla__slide" style:--slide-width={isTypeText(listItem)
          ? '80%'
          : isTypeArticle(listItem)
          ? '30%'
          : '100%'}>
          {#if isTypeText(listItem)}
            <Text item={listItem} first={index === 0} />
          {:else if isTypeArticle(listItem)}
            <Article article={listItem} wide={false} />
          {/if}
        </li>
        {/each}
      </ul>

      {#if embla}
        <Dots dots={item.fields.items.length} slider={embla} />
      {/if}
    </div>
    {:else}
    <ul class="list--nostyle flex flex--center flex--gapped" class:flex--thick_gapped={item.fields.type === 'Colonnes'} class:spaced={item.fields.items.length !== 4}>
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
                <Ecole type={{ 0: "two", 1: "three", 2: "four" }[index] as "two" | "three" | "four" || "two"} />
              {/if}
            </details>
          </li>
        {:else}
          {#if isTypeText(listItem)}
          <li class="col col--mobile--12of12" class:col--6of12={(item.fields.type === 'Colonnes' && (item.fields.items.length < 3 || listItem.fields.media)) || item.fields.type === 'Timeline'} class:col--4of12={item.fields.type === 'Colonnes' && item.fields.items.length === 3} class:col--3of12={!listItem.fields.media && item.fields.type === 'Colonnes' && item.fields.items.length > 3} class:col--mobile--6of12={!listItem.fields.media && item.fields.type === 'Colonnes' && item.fields.items.length > 3}>
            <Text item={listItem} first={index === 0} />
          </li>
          {:else if isTypeArticle(listItem)}
            <Article article={listItem} />
          {:else if isTypeQuestion(listItem)}
          <li class="col col--3of12 col--mobile--12of12 question">
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

    nav {
      margin-bottom: $s3;

      @media (max-width: $mobile) {
        div button {
          display: none;
        }
      }
    }

    ul {

      &:has(details.Italics),
      &:has(details.Pilules) {
        display: flex;
        flex-direction: column;
        // gap: $s1;
        gap: $s-1;
        position: relative;

        @media (max-width: $mobile) {
          width: 100%;

          :global(li) {
            width: 100%;
          }
        }
      }

       &:has(details.Italics) {
        border-left: 1px solid;
        padding-left: $s0;
        min-height: 50lvh;
      }

      &:has(details.Pilules) {
        @media (min-width: $mobile) {
          padding-left: $s3;
        }
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
        margin: 0 auto $s4;
      }

      ul {

        &.spaced {
          &:not(.col--3of12):nth-child(even) {
            margin-top: 20vw;
          }
        }
        li {

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
        @media (max-width: $mobile) {
          position: relative;
          overflow: hidden;
        }

        article {
          position: absolute;
          top: 0;
          right: 0;
          width: calc(100% - 425px - $s1);
          height: 100%;

          @media (max-width: $mobile) {
            position: relative;
            width: 100%;
            height: auto;
            // min-height: 90lvh;
          }
        }

        &[open] {
          summary {
            pointer-events: none;
          }
        }

        :global(section > hr) {
          display: none;
        }
      }

      &.Pilules {
        summary {
          padding: $s2;
          border-radius: $s4;
          width: 425px;
          text-align: center;

          @media (max-width: $mobile) {
            width: 100%;
          }
        }

        article {
          @media (min-width: $mobile) {
            width: calc(100% - 425px - $s1 - $s3);
          }
        }

        &:not([open]) {
          summary {
            color: $noir;
            background-color: $beige-pale;
          }
        }

        &[open] {
          summary {
            position: relative;

            @media (max-width: $mobile) {
              display: none;
            }

            @media (min-width: $mobile) {
              &:before {
                content: '';
                display: block;
                width: $s-2;
                height: $s-2;
                background-color: currentColor;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: calc($s1 * -1);
                transform: translate(-50%, -50%);
              }
            }

            &.aqua:before { background-color: $aqua; }
            &.aqua-pale:before { background-color: $aqua-pale; }
            &.beige:before { background-color: $beige; }
            &.beige-pale:before { background-color: $beige-pale; }
            &.blanc:before { background-color: $blanc; }
            &.bleu:before { background-color: $bleu; }
            &.bleu-fonce:before { background-color: $bleu-fonce; }
            &.bleu-pale:before { background-color: $bleu-pale; }
            &.bourgogne:before { background-color: $bourgogne; }
            &.brun:before { background-color: $brun; }
            &.jaune:before { background-color: $jaune; }
            &.mauve:before { background-color: $mauve; }
            &.mauve-fonce:before { background-color: $mauve-fonce; }
            &.mauve-pale:before { background-color: $mauve-pale; }
            &.noir:before { background-color: $noir; }
            &.rose:before { background-color: $rose; }
            &.rose-pale:before { background-color: $rose-pale; }
            &.sarcelle:before { background-color: $sarcelle; }
            &.vert:before { background-color: $vert; }
            &.vert-fonce:before { background-color: $vert-fonce; }
            &.vert-pale:before { background-color: $vert-pale; }
          }
        }

        :global(svg) {
          position: absolute;
          bottom: -1px;
          right: -1px;
          height: calc(100% + 2px);
          width: auto;
          color: $blanc;

          @media (max-width: $mobile) {
            right: -10%;
            height: auto !important;
            width: 33%;
          }
        }

        :global(svg.three) {
          height: calc(66%);
        }

        :global(svg.four) {
          height: calc(50%);
        }

        :global(.titre) {
          display: none;
        }

        :global(.media) {
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

          @media (max-width: $mobile) {
            width: 100%;
            min-height: 66lvh;
          }

          :global(> div) {
            flex: 1;
          }

          :global(hr) {
            margin-top: auto;
          }

          :global(p:last-child) {
            margin-bottom: auto;
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

            @media (max-width: $mobile) {
              margin: $s1 0;
            }
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

          :global(svg) {
            transition: transform 0.333s;
          }

          :global(svg line) {
            transition: opacity 0.333s;
          }

          @media (max-width: $mobile) {
            font-size: $s1;
            font-family: $body_font;
          }
        }

        &[open] {
          summary {
            :global(svg) {
              transform: rotate(90deg);
            }

            :global(svg line:last-child) {
              opacity: 0;
            }
          }
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

      @media (max-width: $mobile) {
        margin: 0 calc(-1 * $s0);
      }

      .embla__container {
        display: flex;
        
      }

      .embla__slide {
        flex: 0 0 var(--slide-width);
        min-width: 0;
        max-width: none;
        width: var(--slide-width);
        padding-left: $s0;

        @media (max-width: $mobile) {
          --slide-width: 90% !important;
        }
      }
    }

    :has(.question) {
      justify-content: center;
    }

    .question {
      margin: $s-2;
    }

    &.Timeline {
      li {
        :global(section) {
          align-items: stretch;
        }

        :global(.titre) {
          margin-bottom: auto;
        }

        :global(hr) {
          display: none;
        }

        :global(.media) {
          order: -1;

          :global(img),
          :global(video) {
            border-radius: 0;
          }
        }

        &:nth-child(3n) :global(.media) {
          order: 1;
        }

        :global(.corps),
        &:not(:first-child) :global(.media) {
          border-left: 1px solid;
          padding-left: $s0;
        }
      }
    }
  }
</style>