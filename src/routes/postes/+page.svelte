<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Page from '../+page.svelte'
  import Postes from '$lib/components/Postes.svelte'

  import { date } from '$lib/formatters'

  import type { PageData } from './$types'
  const { data } = $props<{ data: PageData }>()

  const postes = $derived(data.postes)

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

{#if data.types && data.types.length > 0}
  <nav class="types-nav">
    <ul class="list--nostyle flex flex--gapped">
      <li>
        <a href="/postes" class="button" class:button--accent={!data.filter}>Tous les postes</a>
      </li>
      {#each data.types as type}
        <li>
          <a href="/postes?type={type}" class:active={data.filter === type} class="button">
            {type}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<Postes {postes} />

<Page data={rest} />

<style lang="scss">
  nav.types-nav {
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