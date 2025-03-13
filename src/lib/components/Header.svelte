<script lang="ts">
  import type { TypeNavigationSkeleton, TypeLienDeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'
  import { fly } from 'svelte/transition'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Ecole from './Ecole.svelte'
  import Icon from './Icon.svelte'
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  // import NoScroll from './NoScroll.svelte'

  let { navigation, buttons }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    buttons: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let visible = $state(false)
  let scrollY = $state(0)
  let lastScrollY = 0
  let scrolled = $derived(scrollY > lastScrollY)

  function onScroll() {
    lastScrollY = scrollY < 0 ? 0 : scrollY
  }

  function toggleMenu() {
    visible = !visible
  }

  function hide() {
    visible = false
  }

  function className(link: Entry<TypeLienDeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>) {
    return `nav__link ${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}${$page.data.pageIds.includes(link.fields.destination.replace('/', '')) ? '' : ' disabled'}`
  }
</script>

<svelte:window bind:scrollY={scrollY} on:scroll={onScroll} />

<header class="flex flex--spaced padded" class:backed={scrollY > 0} class:scrolled={!visible && scrolled} class:visible>
  <a href="/" class="logo" onclick={hide}>
    <!-- <Ecole /> -->
    <Logo />
  </a>
  <span class="flex flex--gapped flex--middle">
    {#if navigation.fields.liensBonus?.length}
      {#each navigation.fields.liensBonus as link, index}
        {#if link.fields.destination.startsWith('/recherche')}
        <Link className={'button button--none'} {link} {hide}>
          <Icon icon="search" label="Rechercher" />
        </Link>
        {:else if link.fields.destination.startsWith('https://portail.psnm.qc.ca')}
        <Link className={'button button--none portail'} {link} {hide}>
          <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5.5" fill="currentColor" stroke="currentColor"/></svg> {link.fields.titre}
        </Link>
        {:else}
        <Link className={link.fields.externe ? 'button button--none' : 'button button--grey'} {link} {hide} />
        {/if}
      {/each}
    {/if}
    <button class="button menu-button" onclick={toggleMenu}>
      <Icon icon={visible ? 'close' : 'menu'} label={visible ? 'Fermer' : 'Menu'} />
      <span>{visible ? 'Fermer' : 'Menu'}</span>
    </button>
  </span>
  {#if visible}
    <nav class="flex flex--gapped" transition:fly={{ y: '-100%', duration: 666 }}>
      {#if navigation.fields.liens?.length}
        {#each navigation.fields.liens as link, index}
          <div class="col col--mobile--12of12">
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

      <aside>
        {#if navigation.fields.lienDannonce}
          <a href={navigation.fields.lienDannonce} class="annonce padded vert-pale flex flex--gapped" onclick={hide}>
            {#if navigation.fields.textDannonce}
            <div class="flex flex--column">
              <Rich body={navigation.fields.textDannonce} />
            </div>
            {/if}
            {#if navigation.fields.mediaDannonce}
              <Media media={navigation.fields.mediaDannonce} />
            {/if}
          </a>
        {:else}
          <Ecole />
        {/if}
      </aside>

      {#each buttons.fields.liens as button}
        <Link link={button} {hide} className="button button--accent" />
      {/each}
    </nav>
  {/if}
</header>

<style lang="scss">
  header {
    padding: $s1;
    position: sticky;
    top: 0;
    z-index: 8;
    transition: color 0.333s, background-color 0.333s, box-shadow 0.333s, transform 0.666s;

    @media (max-width: $mobile) {
      padding: $s0;
    }

    &.scrolled {
      transform: translateY(-100%);
    }

    &.backed {
      background: $blanc;
      // box-shadow: 0 0 10px rgba($sarcelle, 0.1);
    }

    .logo,
    :global(.button svg),
    :global(.button) {
      transition: color 0.333s;
    }

    &:not(.backed):not(.visible):global(:has(+ main .hero.first.full)) {
      .logo,
      :global(.button--none) {
        color: $blanc;
      }
      // color: $blanc;

      :global(.button:not(.portail) svg) {
        color: $accent;
      }

      // .menu-button {
      //   color: $accent;
      // }
    }
  }

  span,
  .menu-button,
  .logo {
    position: relative;
    z-index: 10;
  }

  span {
    width: auto;

    @media (max-width: $mobile) {
      position: absolute;
      right: 0;
      width: calc(100% - $s1);

      :global(.button:not(.menu-button)) {
        transform: translateY(calc($s5 * -1));
        transition: transform 0.333s;

        &:first-child {
          margin-right: auto;
        }

        .visible & {
          transform: translateY(0);
        }
      }
    }
  }

  .menu-button {
    @media (min-width: $mobile) {
      background-color: currentColor;
      border-color: transparent;

      span {
        color: $blanc;
      }

      :global(svg) {
        display: none;
      }
    }

    @media (max-width: $mobile) {
      border: none;
      padding: 0;
      font-size: 0;
    }
  }

  .logo {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: $s-1;

    // :global(svg:first-child) {
    //   width: 33.3%;
    //   height: auto;
    // }

    @media (max-width: $mobile) {
      z-index: 11;
      
      .visible & {
        z-index: 0;
      }

      width: 66.6%;

      :global(svg) {
        width: 100%;
        height: auto;
      }
    }
  }

  nav {
    position: absolute;
    top: 0;
    right: 0;
    background: $blanc;
    box-shadow: 0px 5px 10px 0px rgba($noir, 0.1);

    align-items: stretch;

    width: 100%;
    max-height: 100lvh;
    overflow-y: auto;
    padding: $s1;
    padding-top: $s5;

    @media (max-width: $mobile) {
      padding: $s6 $s-1;
    }

    :global(.h5) {
      font-family: $heading_font;

      @media (max-width: $mobile) {
        font-size: $s3;
      }
    }

    div {
      :global(.nav__link) {
        padding: $s-3 $s-1;
        border-radius: $s0;
        transition: background-color 0.333s;

        &:hover,
        &:focus {
          background-color: $vert-pale;
        }
      }

      &:nth-of-type(2) {
        :global(.nav__link) {
          &:hover,
          &:focus {
            background-color: $rose-pale;
          }
        }
      }

      &:nth-of-type(3) {
        :global(.nav__link) {
          &:hover,
          &:focus {
            background-color: $bleu-pale;
          }
        }
      }

      &:nth-of-type(4) {
        :global(.nav__link) {
          &:hover,
          &:focus {
            background-color: $mauve-pale;
          }
        }
      }

      &:nth-of-type(5) {
        :global(.nav__link) {
          &:hover,
          &:focus {
            background-color: $beige-pale;
          }
        }
      }

      &:nth-of-type(6) {
        :global(.nav__link) {
          &:hover,
          &:focus {
            background-color: $aqua-pale;
          }
        }
      }
    }

    hr {
      width: 1px;
      height: auto;
      // border-left: 1px dotted $accent;
      background-image: repeating-linear-gradient(0deg, currentColor, currentColor 2px, transparent 2px, transparent 5px);
      margin: 0;

      @media (max-width: $mobile) {
        width: 100%;
        height: 1px;
      }
    }

    div {

      &:has(ul) {
        @media (min-width: $mobile) {
          flex: 1;
        }

        :global(a) {
          display: block;
          padding: ($s-3) ($s-2);
        }
      }

      > ul {
        margin-top: $s3;

        @media (max-width: $mobile) {
          margin-top: 0;
        }
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
          flex-wrap: nowrap;
          cursor: pointer;
          // padding: ($s-3) ($s-2);

          :global(a) {
            display: inline-block;
            padding: 0;
          }

          &:after {
            
          }
        }
      }
    }

    aside {
      margin-right: auto;

      @media (max-width: $mobile) {
        order: 99;
      }

      .annonce {
        border-radius: $s-1;
        margin-top: $s2;

        @media (min-width: $mobile) {
          flex-wrap: nowrap;
        }

        :global(picture) {
          width: auto;

          @media (max-width: $mobile) {
            margin-left: auto;
          }
        }
        
        :global(img),
        :global(video) {
          width: 220px;
          height: auto;
        }
      }
    }

    :global(> a) {
      align-self: flex-end;
    }

    :global(.disabled) {
      color: $noir;
      pointer-events: none;
    }
  }
</style>