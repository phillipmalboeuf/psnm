<script lang="ts">
  import type { EmblaCarouselType } from 'embla-carousel'
  import { onMount } from 'svelte'

  const { dots, slider }: { dots: number, slider: EmblaCarouselType } = $props()

  let active = $state()

  onMount(() => {
    const onSelect = () => active = slider.selectedScrollSnap()
    onSelect()
    slider.on("select", onSelect)

    return () => {
      slider.off("select", onSelect)
    }
  })
</script>

{#if dots}
<nav class="dots">
  {#each Array(dots) as d, i}
  <button class="dot" class:active={active === i} onclick={() => {
    slider.scrollTo(i)
    // @ts-ignore
    slider.plugins().autoplay?.reset()
  }}>{i}</button>
  {/each}
</nav>
{/if}

<style lang="scss">
  .dots {
    display: flex;
    gap: $s-2;
    margin-top: $s2;
    justify-content: center;

    @media (min-width: $mobile) {
      display: none;
    }

    button.dot {
      font-size: 0;
      padding: calc($s-1 / 4);
      border-radius: 50%;
      background-color: currentColor;
      opacity: 0.25;
      transition: opacity 0.333s;

      &.active {
        opacity: 1;
      }
    }
  }
</style>