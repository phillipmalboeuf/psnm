<script lang="ts">
  import type { TypeNavigationSkeleton, TypeLienDeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'
  import { fly } from 'svelte/transition'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Ecole from './Ecole.svelte'
  import Icon from './Icon.svelte'
  // import NoScroll from './NoScroll.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let visible = $state(false)

  function toggleMenu() {
    visible = !visible
  }

  function hide() {
    visible = false
  }

  let scrollY = $state(0)

  function className(link: Entry<TypeLienDeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>) {
    return `${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}${$page.data.pageIds.includes(link.fields.destination.replace('/', '')) ? '' : ' disabled'}`
  }
</script>

<svelte:window bind:scrollY={scrollY} />

<header class="flex flex--spaced flex--middle padded" class:scrolled={scrollY > 0} class:visible>
  <a href="/" class="logo" onclick={hide}>
    <Logo />
  </a>
  <span class="flex flex--gapped flex--middle">
    {#if navigation.fields.liensBonus?.length}
      {#each navigation.fields.liensBonus as link, index}
        {#if link.fields.destination.startsWith('/recherche')}
        <Link className={'button button--none'} {link}>
          <Icon icon="search" label="Rechercher" />
        </Link>
        {:else}
        <Link className={link.fields.externe ? 'button button--none' : 'button button--grey'} {link} />
        {/if}
      {/each}
    {/if}
    <button class="menu-button button--accent" onclick={toggleMenu}>
      {visible ? 'Close' : 'Menu'}
    </button>
  </span>
  {#if visible}
    <nav class="flex flex--gapped" transition:fly={{ y: '-100%', duration: 666 }}>
      {#if navigation.fields.liens?.length}
        {#each navigation.fields.liens as link, index}
          <div>
            <Link {link} {hide} className={`h5 ${className(link)}`} />
            {#if link.fields.sousLiens?.length}
              <ul class="list--nostyle">
                {#each link.fields.sousLiens as sousLink}
                  <li>
                    {#if sousLink.fields.sousLiens?.length}
                      <details>
                        <summary class="flex flex--gapped flex--middle">
                          <Link {hide} link={sousLink} className={className(sousLink)} />
                          <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke="#1C4526"/></svg>
                        </summary>
                        <ul class="list--nostyle">
                          {#each sousLink.fields.sousLiens as sousSousLink}
                            <li>
                              <Link {hide} link={sousSousLink} className={className(sousSousLink)} />
                            </li>
                          {/each}
                        </ul>
                      </details>
                    {:else}
                      <Link {hide} link={sousLink} className={className(sousLink)} />
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
    top: 0;
    z-index: 8;
    transition: color 0.333s, background-color 0.333s, box-shadow 0.333s;

    span {
      width: auto;
    }

    &.scrolled {
      background: $blanc;
      // box-shadow: 0 0 10px rgba($sarcelle, 0.1);
    }

    :global(.button svg) {
      transition: color 0.333s;
    }

    &:not(.scrolled):not(.visible):global(:has(+ main .hero.first.full)) {
      color: $blanc;

      :global(.button svg) {
        color: $accent;
      }
    }
  }

  span,
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

        :global(a) {
          display: block;
          padding: ($s-3) ($s-2);
        }
      }

      > ul {
        margin-top: $s3;
      }

      &:has(details[open]) {
        :global(a:not(.h5)) {
          opacity: 0.5;
        }
      }

      details[open] {
        :global(a) {
          opacity: 1 !important;
        }
      }

      details {
        summary {
          cursor: pointer;
          padding: ($s-3) ($s-2);

          :global(a) {
            display: inline-block;
            padding: 0;
          }

          &:after {
            
          }
        }
      }
    }

    > :global(svg) {
      margin-right: auto;
    }

    > a {
      align-self: flex-end;
    }

    :global(.disabled) {
      color: $noir;
      pointer-events: none;
    }
  }
</style>