<script lang="ts">
  import type { TypePoste } from '$lib/clients/content_types'
  import { date } from '$lib/formatters'
  import Poste from './Poste.svelte'

  const { postes } = $props<{
    postes: TypePoste<"WITHOUT_UNRESOLVABLE_LINKS">[]
  }>()
</script>

<section class="postes">
  {#if postes?.length}
    <ul class="list--nostyle flex flex--gapped flex--wrap">
      {#each postes as poste, index}
        <Poste {poste} {index} />
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  section.postes {
    margin: $s2 0;

    ul {
      li {
        a {
          text-decoration: none;
          padding: $s2;
          border: 1px solid $grey;
          border-radius: $radius;

          &:hover,
          &:focus {
            border-color: $sarcelle;
          }

          .type {
            color: $sarcelle;
          }

          h2 {
            margin: 0;
          }
        }
      }
    }
  }
</style> 