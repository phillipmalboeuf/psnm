<script lang="ts">
  import { page } from '$app/stores'
  import { isTypeArticle } from '$lib/clients/content_types';
  // import Collection from '$lib/components/Collection.svelte'
  import Search from '$lib/components/Search.svelte'
  // import { languageTag } from '$lib/paraglide/runtime'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<nav class="padded flex flex--gapped flex--spaced">
  <div class="col col--12of12">
    <hr>
    <h2>Recherche</h2>
  </div>
  <div class="col col--4of12 col--mobile--12of12">
    <Search />
  </div>
</nav>

{#if $page.url.searchParams.get("q")}
<main class="padded">
  <hr>
  <h4>Résultats pour "{ $page.url.searchParams.get("q") }"</h4>
  
  {#if data.pages?.items?.length || data.articles?.items?.length}
    <table>
      <tbody>
      {#each [...(data.pages?.items || []), ...(data.articles?.items || [])]
        .sort((a, b) => new Date(b.sys.updatedAt).getTime() - new Date(a.sys.updatedAt).getTime()) as item}
        <tr>
          <td>
            <h5 class="flex flex--gapped flex--spaced">
              <a href="/{isTypeArticle(item) ? 'actualités/' : ''}{item.fields.id}">{item.fields.titre}</a>
              <a class="button button--grey" href="/{isTypeArticle(item) ? 'actualités/' : ''}{item.fields.id}">Voir plus</a>
            </h5>
            <!-- {#if item.fields.description}
              <p>{@html item.fields.description.replaceAll('\\n', '<br />')}</p>
            {/if} -->
            <!-- <small>{new Date(item.sys.createdAt).toLocaleDateString()}</small> -->
          </td>
        </tr>
      {/each}
      </tbody>
    </table>
  {:else}
    <p>Aucun résultat trouvé</p>
  {/if}
</main>
{/if}

<style lang="scss">
  nav {
    h2 {
      margin-bottom: $s3;
    }
  }

  main {
    
    table,
    p {
      margin: $s2 0;
    }
  }
</style>