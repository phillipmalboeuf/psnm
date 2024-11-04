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
  <!-- <div class="col">
    <a href="/products" class="button button--green"><svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1 8.5L8 16" stroke="currentColor"/></svg> {languageTag() === 'fr' ? 'Produits' : 'Products'}</a>
  </div> -->
  <div class="col col--4of12 col--mobile--12of12">
    <Search />
  </div>
</nav>

{#if $page.url.searchParams.get("q")}
<main class="padded">
  {#if data.pages?.items?.length || data.articles?.items?.length}
    <ul class="list--nostyle">
      {#each [...(data.pages?.items || []), ...(data.articles?.items || [])]
        .sort((a, b) => new Date(b.sys.updatedAt).getTime() - new Date(a.sys.updatedAt).getTime()) as item}
        <li>
          <article>
            <h5><a href="/{isTypeArticle(item) ? 'articles/' : ''}{item.fields.id}">{item.fields.titre}</a></h5>
            <!-- {#if item.fields.description}
              <p>{@html item.fields.description.replaceAll('\\n', '<br />')}</p>
            {/if} -->
            <!-- <small>{new Date(item.sys.createdAt).toLocaleDateString()}</small> -->
          </article>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Aucun résultat trouvé</p>
  {/if}
</main>
{/if}

<style lang="scss">
  nav,
  main {
    // margin: ($base * 2) 0;
    // padding: 0 $base;
  }
</style>