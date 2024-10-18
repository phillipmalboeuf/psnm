<script lang="ts">
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { date } from '$lib/formatters'
  
  import Media from './Media.svelte'
  import Article from './Article.svelte'

  const { articles } : { articles: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[] } = $props()
</script>


{#if articles.length > 0}
  <ul class="articles list--nostyle flex flex--gapped">
    {#each articles as article}
      <Article {article} />
    {/each}
  </ul>
{:else}
  <p>No articles found.</p>
{/if}

<style lang="scss">
  ul.articles {
    margin-bottom: $s5;
  }
</style>