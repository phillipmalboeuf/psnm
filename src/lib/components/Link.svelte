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

<a class={className} class:anchor={link.fields.destination?.includes('#')} href={link.fields.destination} {...link.fields.externe && { target: '_blank', rel: 'external' }}>{link.fields.titre}{#if more}{@render more()}{/if}</a>


<style lang="scss">
  // a {
  //   &.anchor {
  //     :global(svg) {
  //       transform: rotate(90deg);
  //     }
  //   }
  // }
</style>