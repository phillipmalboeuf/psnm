<script lang="ts">
  import type { PageData } from './$types'
  const { data } : { data: PageData } = $props()

  const articles = $derived(data.articles)
</script>

<h1>Articles</h1>

{#if articles.length > 0}
  <ul>
    {#each articles as article}
      <li>
        <a href="/articles/{article.fields.id}">
          <h2>{article.fields.titre}</h2>
          <!-- Add more article details here -->
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No articles found.</p>
{/if}