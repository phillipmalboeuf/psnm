<script lang="ts">
  import type { TypeQuestionSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  import { page } from '$app/stores'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, id="question" }: {
    item: Entry<TypeQuestionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    id?: string
  } = $props()
</script>

<section class="flex flex--gapped padded {$page.data.page?.fields.couleur ? `blanc ${$page.data.page?.fields.couleur}` : item.fields.couleur || ''}" id={item.fields.id}>
  <details name={id} class="question col flex flex--column flex--gapped">
    <summary>
      {#if item.fields.titre}
        <h5>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h5>
      {/if}

      <svg width="32" height="31" class="button button--accent button--circle" viewBox="0 0 32 31">
        <!-- <rect x="0.5" y="0.000244141" width="31" height="31" rx="15.5" fill="#1B3244"/> -->
        <line x1="16.0921" y1="8.00024" x2="16.0921" y2="23.0002" stroke="white" stroke-width="1.18421"/>
        <line x1="23.5" y1="15.5923" x2="8.5" y2="15.5923" stroke="white" stroke-width="1.18421"/>
      </svg>
    </summary>

    <article class="flex flex--column flex--gapped">
      {#if item.fields.corps}
      <div class="flex flex--column flex--gapped">
        <hr>
        <Rich body={item.fields.corps} />
      </div>
      {/if}

      {#if item.fields.liens?.length}
      <ul class="list--nostyle flex flex--gapped">
        {#each item.fields.liens as link}
          <li><Link className="button {item.fields.couleur ? 'button--muted' : 'button--accent'}" {link} /></li>
        {/each}
      </ul>
      {/if}
    </article>
  </details>

  <!-- {#if item.fields.media && item.fields.media.length > 0}
  <div class="col col--6of12 media">
    {#each item.fields.media as media}
      <figure>
        <Media {media} rounded />
      </figure>
    {/each}
  </div>
  {/if} -->
</section>

<style lang="scss">
  section {
    // text-align: center;
    // min-height: 50lvh;
    
    details {
      summary {
        cursor: pointer;

        svg {
          margin-top: $s3;
        }
      }

      &[open] {
        summary {
          svg {
            display: none;
          }
        }
      }

      article {
        margin-top: $s2;

        > div {
          :global(ul.long) {
            column-count: unset;
          }
        }
      }

      :global(hr) {
        margin: 0;
      }
    }

    &.padded {
      border-radius: $s0;
    }

    &.blanc { background-color: $blanc; }
    &.blanc:has(details[open]) {
      color: $blanc; background-color: $noir;
    }

    &.aqua:has(details[open]) { background-color: $aqua-pale; color: $noir; }
    &.aqua-pale:has(details[open]) { background-color: $aqua; color: $noir; }
    &.beige:has(details[open]) { background-color: $beige-pale; color: $noir; }
    &.beige-pale:has(details[open]) { background-color: $beige; color: $noir; }
    &.bleu:has(details[open]) { background-color: $bleu-pale; color: $noir; }
    &.bleu-fonce:has(details[open]) { background-color: $bleu-pale; color: $noir; }
    &.bleu-pale:has(details[open]) { color: $blanc; background-color: $bleu-fonce; }
    &.bourgogne:has(details[open]) { background-color: $bourgogne; color: $noir; }
    &.brun:has(details[open]) { background-color: $brun; color: $noir; }
    &.jaune:has(details[open]) { color: $blanc; background-color: $brun; }
    &.mauve:has(details[open]) { color: $blanc; background-color: $mauve-fonce; }
    &.mauve-fonce:has(details[open]) { background-color: $mauve-pale; color: $noir; }
    &.mauve-pale:has(details[open]) { background-color: $mauve; color: $noir; }
    &.noir:has(details[open]) { background-color: $blanc; color: $noir; }
    &.rose:has(details[open]) { background-color: $rose-pale; color: $noir; }
    &.rose-pale:has(details[open]) { background-color: $rose; color: $noir; }
    &.sarcelle:has(details[open]) { background-color: $vert; color: $noir; }
    &.vert:has(details[open]) { color: $blanc; background-color: $vert-fonce; }
    &.vert-fonce:has(details[open]) {  background-color: $vert-pale; color: $noir; }
    &.vert-pale:has(details[open]) { color: $blanc; background-color: $vert-fonce; }
  }
</style>