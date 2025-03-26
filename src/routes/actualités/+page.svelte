<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Page from '../+page.svelte'

  import { date } from '$lib/formatters'

  import type { PageData } from './$types'
  import Articles from '$lib/components/Articles.svelte';
  const { data } : { data: PageData } = $props()

  const articles = $derived(data.articles)

  const first = $derived({
    ...data,
    page: {
      ...data.page,
      fields: {
        ...data.page.fields,
        contenu: data.page.fields.contenu.slice(0, 1)
      }
    }
  })
  const rest = $derived({
    ...data,
    page: {
      ...data.page,
      fields: {
        ...data.page.fields,
        contenu: data.page.fields.contenu.slice(1)
      }
    }
  })
</script>

<Page data={first} />

{#if data.categories && data.categories.length > 0}
  <nav class="categories-nav">
    <ul class="list--nostyle flex flex--tight_gapped">
      <li>
        <a href="/actualites" class="button category-link" class:button--accent={!data.filter}>Toutes les actualités</a>
      </li>
      {#each data.categories as category}
        <li>
          <a href="/actualites?categorie={category.fields.id}" class:active={data.filter === category.fields.id} class="button {category.fields.couleur}">
            {category.fields.titre}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<Articles {articles} />

<Page data={rest} />

<style lang="scss">
  nav.categories-nav {
    margin-top: $s5;
    margin-bottom: $s2;

    ul {
      li {
        a.button:not(.button--accent) {
          border-color: transparent;

          &:not(.active):not(:hover, :focus) {
            color: $sarcelle;
            background: $grey;
          }
        }
      }
    }
  }
</style>