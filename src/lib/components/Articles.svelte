<script lang="ts">
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { date } from '$lib/formatters'
  
  import Media from './Media.svelte'

  const { articles } : { articles: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[] } = $props()
</script>


{#if articles.length > 0}
  <ul class="articles list--nostyle flex flex--gapped">
    {#each articles as article}
      <li class="col col--3of12 {article.fields.categorie.fields.couleur}" class:col--6of12={article.fields.vedette}>
        <a href="/articles/{article.fields.id}" class="flex">
          <article class="flex flex--gapped flex--spaced padded col" class:col--6of12={article.fields.vedette}>
            <h5>{article.fields.titre}</h5>

            <em>{article.fields.categorie.fields.titre}</em>
            <date>{date(article.fields.date)}</date>
          </article>

          <figure class="col" class:col--6of12={article.fields.vedette}>
            <Media media={article.fields.thumbnail} />
          </figure>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No articles found.</p>
{/if}

<style lang="scss">
  ul.articles {
    margin-bottom: $s5;

    li {
      border-radius: $s0;
      overflow: hidden;

      a {
        align-items: stretch;
      }

      article {

        h5 {
          margin-bottom: $s3;
        }

        em {
          margin-top: auto;
          font-style: normal;
          opacity: 0.5;
        }

        date {
          margin-top: auto;
        }
      }
    }
  }
</style>