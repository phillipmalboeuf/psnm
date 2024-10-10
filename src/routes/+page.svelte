<script lang="ts">
  import { isTypeHero, isTypeList, isTypeText } from '$lib/clients/content_types'

  import Hero from '$lib/components/Hero.svelte'
  import List from '$lib/components/List.svelte'
  import Text from '$lib/components/Text.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>


{#if data.page.fields.contenu?.length}
{#each data.page.fields.contenu as item, i}
<section>
  {#if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List {item} />
  {:else if isTypeHero(item)}
  <Hero {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    margin: $s1 0;
  }
</style>