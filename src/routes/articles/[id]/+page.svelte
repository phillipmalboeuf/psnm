<script lang="ts">
  import { onMount } from 'svelte'
  import { } from '$lib/clients/content_types'
  
  import Text from '$lib/components/Text.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>


<section class="flex flex--center flex--middle flex--gapped" id={data.item.fields.id}>
  {#if data.item.fields.titre}
  <h1 class="col col--12of12">{data.item.fields.titre}</h1>
  {/if}

  <!-- <div class="col col--4of12 flex flex--column flex--gapped">
    

    {#if data.item.fields.description}
    <Rich body={data.item.fields.description} />
    {/if}
  </div> -->

  {#if data.item.fields.thumbnail}
  <figure class="col col--6of12">
    <Media media={data.item.fields.thumbnail} />
  </figure>
  {/if}
</section>




<style lang="scss">
  section {
    padding: $s3 $s1;
    color: $blanc;
    background-color: $accent;

    h1,
    div {
      text-align: center;
    }
  }
</style>