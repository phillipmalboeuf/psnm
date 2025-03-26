<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  import Text from '$lib/components/Text.svelte'

  let { item }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string> } = $props()

  // let dialog: HTMLDialogElement | undefined = $state()
  let visible = $state(false)

  function open() {
    visible = true
  }

  function close() {
    visible = false
    sessionStorage.setItem('popup'+item.sys.updatedAt, 'true')
  }

  onMount(() => {
    if (sessionStorage.getItem('popup'+item.sys.updatedAt) !== 'true') {
      open()
    }
  })
</script>

{#if visible}
<dialog open transition:fade={{ duration: 666 }}>
  <button class="back button--none" onclick={() => close()} aria-label="Fermer"></button>
  <section>
    <button class="close button--none" onclick={() => close()} aria-label="Fermer">
      <svg width="29" height="29" viewBox="0 0 29 29">
      <rect x="14.1406" width="20" height="20" rx="10" transform="rotate(45 14.1406 0)" fill="white" fill-opacity="0.15"/>
      <line x1="17.5906" y1="10.7513" x2="10.7477" y2="17.5943" stroke="white" stroke-width="0.731479"/>
      <line x1="17.5344" y1="17.5941" x2="10.6914" y2="10.7511" stroke="white" stroke-width="0.731479"/>
      </svg>
    </button>
  <Text {item} />
  </section>
  
</dialog>
{/if}

<style lang="scss">
  dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    backdrop-filter: blur(10px);
    z-index: 1000;
    cursor: default;

    section {
      position: relative;
      max-width: calc(100% - $s0 * 2);
    }
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: $s-2;
  }
</style>