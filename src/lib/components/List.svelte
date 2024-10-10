<script lang="ts">
  import { type TypeListSkeleton, type TypeTextSkeleton, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Text from './Text.svelte'

  let { item }: {
    item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<section class="list" id={item.fields.id}>
  {#if item.fields.titre}
    <h2>{item.fields.titre}</h2>
  {/if}

  {#if item.fields.items && item.fields.items.length > 0}
    <ul class="list__items list--nostyle">
      {#each item.fields.items as listItem, index}
        <li>
          {#if isTypeText(listItem)}
            <Text item={listItem} first={index === 0} />
          {:else}
            <!-- Handle other types here if needed -->
            <p>Unsupported item type</p>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  .list {
    padding: $s1 0;

    h2 {
      text-align: center;
      margin-bottom: $s1;
    }

    &__items {
      display: flex;
      flex-direction: column;
      gap: $s1;
    }
  }
</style>