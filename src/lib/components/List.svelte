<script lang="ts">
  import { type TypeListSkeleton, type TypeTextSkeleton, isTypeArticle, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Text from './Text.svelte'
  import Article from './Article.svelte'
  import Ecole from './Ecole.svelte';

  let { item }: {
    item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<section class="list" id={item.fields.id}>
  {#if item.fields.titre}
    <hr />
    <h4>{item.fields.titre}</h4>
  {/if}

  {#if item.fields.items && item.fields.items.length > 0}
    <ul class="list--nostyle">
      {#each item.fields.items as listItem, index}
        {#if item.fields.type === 'Pilules' || item.fields.type === 'Italics'}
          <li>
            <details class={item.fields.type} name={item.sys.id} open={index === 0}>
              <summary class="{isTypeText(listItem) ? listItem.fields.couleur : ''} h3"
              >{listItem.fields.titre}</summary>
              <article>
                {#if isTypeText(listItem)}
                  <Text item={listItem} first={index === 0} />
                {:else if isTypeArticle(listItem)}
                  <Article article={listItem} />
                {/if}
              </article>

              {#if item.fields.type === 'Pilules'}
                <Ecole type="two" />
              {/if}
            </details>
          </li>
        {:else}
          <li>
            {#if isTypeText(listItem)}
              <Text item={listItem} first={index === 0} />
            {:else if isTypeArticle(listItem)}
              <Article article={listItem} />
            {/if}
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  .list {
    padding: $s1 0;

    h4 {
      margin-bottom: $s2;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: $s1;

      &:has(details) {
        gap: $s-1;
        position: relative;
      }

       &:has(details.Italics) {
        border-left: 1px solid;
        padding-left: $s0;
        min-height: 50lvh;
      }
    }

    details {
      summary {
        cursor: pointer;
      }

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

        :global(section div) {
          display: flex;
          flex-direction: column;
          height: 100%;

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
    }
  }
</style>