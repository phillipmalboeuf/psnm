<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'
  import { fly } from 'svelte/transition'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Media from './Media.svelte';
  import Ecole from './Ecole.svelte';
  // import NoScroll from './NoScroll.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let visible = $state(false)

  function toggleMenu() {
    visible = !visible
  }
</script>

<header class="flex flex--spaced flex--middle padded">
  <a href="/" class="logo" onclick={() => visible = false}>
    <Logo />
  </a>
  <button class="menu-button button--accent" onclick={toggleMenu}>
    {visible ? 'Close' : 'Menu'}
  </button>
  {#if visible}
    <nav class="flex flex--gapped" transition:fly={{ y: '-100%', duration: 666 }}>
      {#if navigation.fields.liens?.length}
        {#each navigation.fields.liens as link, index}
          <div>
            <Link {link} className={`h5${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
            {#if link.fields.sousLiens?.length}
              <ul class="list--nostyle">
                {#each link.fields.sousLiens as sousLink}
                  <li>
                    <Link link={sousLink} />
                    {#if sousLink.fields.sousLiens?.length}
                      <ul class="list--nostyle">
                        {#each sousLink.fields.sousLiens as sousSousLink}
                          <li>
                            <Link link={sousSousLink} />
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
          {#if index < navigation.fields.liens.length - 1}
            <hr />
          {/if}
        {/each}
      {/if}
      <div class="col col--12of12"></div>
      <Ecole />

      <a class="button button--accent">
        Visite virtuelle
      </a>
      <a class="button button--accent">
        Calendrier
      </a>
    </nav>
  {/if}
</header>

<style lang="scss">
  header {
    padding: $s1;
    position: sticky;
    z-index: 8;
  }

  .menu-button,
  .logo {
    position: relative;
    z-index: 10;
  }

  nav {
    position: absolute;
    top: 0;
    right: 0;
    background: $blanc;

    align-items: stretch;

    width: 100%;
    padding: $s1;
    padding-top: $s5;

    hr {
      width: 1px;
      height: auto;
      border-left: 1px dotted $accent;
      margin: 0;
      background: transparent;
    }

    div {

      &:has(ul) {
        flex: 1;
      }

      > ul {
        margin-top: $s3;
      }
    }

    > :global(svg) {
      margin-right: auto;
    }

    > a {
      align-self: flex-end;
    }
  }
</style>