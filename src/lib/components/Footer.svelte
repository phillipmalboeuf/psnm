<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  // import Flower from './Flower.svelte'
  // import Aliments from './Aliments.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<footer class="flex flex--gapped flex--bottom padded">

  <nav class="flex flex--spaced">
    {#if navigation.fields.liens?.length}
    {#each navigation.fields.liens as link}
    <Link {link} className={`button${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
    {/each}
    {/if}

    <span class="button">
      FR | EN
    </span>
  </nav>

  <form action="" class="col col--5of12 flex flex--gapped">
    <input class="col col--6of12" name="nom" placeholder="Votre nom">
    <input class="col col--6of12" name="email" type="email" placeholder="Votre courriel">
    <textarea name="message" id="message" placeholder="Votre message"></textarea>
    
    <button type="submit">Soumettre</button>
  </form>

  <a href="/" class="logo">
    <Logo />
  </a>
  
  <!-- <nav class:visible class:scrolled={scrollY > innerWidth * 0.2} class="flex flex--center">
    {#each navigation.fields.liens as link}
    <Link {link} className={`padded${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
    {/each}
  </nav> -->
</footer>

<style lang="scss">
  footer {
    position: relative;
    color: $blanc;
    background-color: $accent;
    // min-height: 100lvh;
    overflow: hidden;
    padding: $s1;

    .logo {
      margin-top: $s2;
    }

    nav {
      position: relative;
      z-index: 1;
      padding: $s1 0;

      :global(.button) {
        padding: 0;
        border: none;
      }
    }

    :global(> svg) {
      height: 100lvh;
      width: 100lvh;
      opacity: 0.4;

      position: absolute;
      bottom: -5vw;
      right: -5vw;
      z-index: 0;

      color: $accent-light;

      animation-duration: 15s;
      animation-timing-function: linear;
      animation-name: rotate;
      animation-iteration-count: infinite;
    }
  }
</style>