<script lang="ts">
  import type { TypeLienDeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'

  // import { openDialog } from '$lib/helpers'

  let { link, className = undefined, more = undefined }: {
    link: Entry<TypeLienDeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    more?: Snippet
    className?: string
  } = $props()
</script>

<a class={className} class:caserne={link.fields.destination?.includes('caserne.com')} class:anchor={link.fields.destination?.startsWith('#') && 'anchor'} href={link.fields.destination} {...link.fields.externe && { target: '_blank', rel: 'external' }}>{@html link.fields.titre.replace('\\n', '<br>')}{#if more}{@render more()}{/if}</a>


<style lang="scss">
  a {
    // &.anchor {
    //   :global(svg) {
    //     transform: rotate(90deg);
    //   }
    // }

    &.caserne {
      opacity: 0.33;
    }
  }
</style>