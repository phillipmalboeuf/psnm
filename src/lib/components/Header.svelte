<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Media from './Media.svelte';
  // import NoScroll from './NoScroll.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let visible = $state(true)
  let scrollY = $state<number>(0)
  let innerWidth = $state<number>(0)
</script>

<svelte:window bind:scrollY bind:innerWidth />

<!-- {#if visible}
<NoScroll />
{/if} -->

<header class="flex flex--spaced flex--middle padded">
  <a href="/" class="logo" class:scrolled={scrollY > innerWidth * 0.2} onclick={() => visible = false}>
    <Logo />
  </a>
  <!-- <button class:visible class="button--none h1 col col--4of12" onclick={() => visible = true}>Menu</button> -->
  <nav class:visible class:scrolled={scrollY > innerWidth * 0.2} class="flex flex--center">
    {#if navigation.fields.liens?.length}
    {#each navigation.fields.liens as link}
    <Link {link} className={`padded${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
    {/each}
    {/if}

    <span class="padded">
      FR | EN
    </span>

    <!-- <button class="button--none" onclick={() => visible = false} aria-label="Fermer">
      <svg width="30" height="30" viewBox="0 0 30 30"><line x1="1.06066" y1="1.0995" x2="28.0607" y2="28.0995" stroke="currentColor" stroke-width="3"/><line x1="28.0607" y1="1.06066" x2="1.06066" y2="28.0607" stroke="currentColor" stroke-width="3"/></svg>
    </button> -->
  </nav>
<!-- 
  {#if $page.data.page?.fields.media}
  <figure>
    <Media media={$page.data.page?.fields.media} rounded />

    <figcaption class="flex flex--spaced">
      <h6>{$page.data.page?.fields.media.fields.title}</h6>
      <h6>{$page.data.page?.fields.media.fields.description}</h6>
    </figcaption>
  </figure>
  {/if} -->
</header>

<style lang="scss">
  header {
    // color: $blanc;
    // background-color: $accent;
    // min-height: 50lvh;

    padding: $s1;

    // .logo {
    //   display: block;
    // }

    // > button {
    //   justify-content: flex-start;
    //   transition: opacity 666ms;

    //   &.visible {
    //     opacity: 0;
    //   }
    // }

    nav {
      // position: absolute;
      // z-index: 20;
      // top: 20vw;
      // left: 50%;
      // transform: translateX(-50%);
      width: auto;
      // margin-top: $s0;
      // text-transform: uppercase;
      // background-color: $blanc;
      // border-radius: $s1;
      // overflow: hidden;

      // height: 100lvh;
      // width: 33vw;
      
      // transition: transform 666ms;
      // transform: translateX(100%);
      // will-change: transform;

      // > button {
      //   position: absolute;
      //   top: $s0;
      //   right: $s0;
      // }

      // :global(a),
      // span {
      //   color: $accent;
        
      //   padding: $s-1 $s0;
      //   letter-spacing: 0.05em;

        // &:first-child {
        //   border-top-left-radius: $s1;
        //   border-bottom-left-radius: $s1;
        // }

        // &:last-child {
        //   border-top-right-radius: $s1;
        //   border-bottom-right-radius: $s1;
        // }
      // }

      // :global(.active) {
      //   background-color: $blanc !important;
      // }

      // &:global(:has(.active)) {
      //   backdrop-filter: blur(6px);
      //   -webkit-backdrop-filter: blur(6px);
      //   background-color: $muted;

      //   :global(a),
      //   span {
      //     border-radius: $s1;
      //   }
      // }

      // &.visible {
      //   transform: translateX(0);
      // }

      // &.scrolled {
      //   position: fixed;
      //   top: 0;
      // }
    }
  }
</style>