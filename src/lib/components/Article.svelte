<script lang="ts">
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { date } from '$lib/formatters'
  
  import Media from './Media.svelte'
  import { page } from '$app/stores';

  const { article, wide=true } : { article: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>, wide?: boolean } = $props()
</script>

{#if article?.fields}
<li class="col col--3of12 col--landscape--4of12 col--portrait--6of12 col--mobile--12of12 {$page.data.page.fields.couleur === article.fields.categorie?.fields.couleur ? 'blanc' : article.fields.categorie?.fields.couleur}" class:col--6of12={wide && article.fields.vedette}>
  <a href="/actualites/{article.fields.id}" class="flex">
    <article class="flex flex--spaced padded col col--mobile--12of12" class:col--6of12={wide && article.fields.vedette}>
      <h5>{article.fields.titre}</h5>

      <em class="col col--6of12">{article.fields.categorie?.fields.titre}</em>
      <date class="col col--6of12">{date(article.fields.date)}</date>
    </article>

    <figure class="col col--mobile--12of12" class:col--6of12={wide && article.fields.vedette}>
      <Media media={article.fields.image} />
    </figure>
  </a>
</li>
{/if}


<style lang="scss">
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
        text-align: right;
      }
    }
  }
</style>