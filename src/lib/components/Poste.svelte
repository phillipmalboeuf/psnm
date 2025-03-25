<script lang="ts">
  import type { TypePosteSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { date } from '$lib/formatters'

  const { poste, index } : { poste: Entry<TypePosteSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>, index: number } = $props()
</script>

<li class="col col--4of12 {['vert-pale', 'bleu-pale', 'jaune', 'mauve-pale'][index % 4]}">
  <a href="/postes/{poste.fields.id}" class="flex flex--column flex--gapped">
    <div class="flex flex--gapped flex--spaced">
      {#if poste.fields.type}
        <span class="type">{poste.fields.type}</span>
      {/if}
      
      {#if poste.fields.date}
        <date>{date(poste.fields.date)}</date>
      {/if}
    </div>

    <h2 class="h3">{poste.fields.titre}</h2>

    <span class="button button--muted">En savoir plus</span>
  </a>
</li>

<style lang="scss">
  li {
    border-radius: $radius;
    
    a {
      padding: $s1;
      // border: 1px solid $grey;
      

      // &:hover,
      // &:focus {
      //   border-color: $sarcelle;
      // }

      // .type {
      //   color: $sarcelle;
      // }

      // h2 {
      //   margin: 0;
      // }

      .button {
        margin-top: $s2;
      }
    }
  }
</style>