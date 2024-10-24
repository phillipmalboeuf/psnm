<script lang="ts">
  import { date } from '$lib/formatters'

  import Page from '../+page.svelte'
  
  import Text from '$lib/components/Text.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>


<Page {data} />


<style lang="scss">
  section {
    // hr {
    //   width: 100%;
    //   margin: 0;
    // }

    // aside {

    //   > a {
    //     margin: 0 auto;
    //   }
    // }

    // figure {
    //   margin: $s2 0;
    // }
  }
</style>