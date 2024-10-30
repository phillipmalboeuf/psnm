<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Ecole from './Ecole.svelte';
  // import Flower from './Flower.svelte'
  // import Aliments from './Aliments.svelte'

  let { navigation, politiques, sociaux }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    politiques: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    sociaux: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<footer class="flex flex--gapped flex--bottom padded {$page.data.page?.fields.couleur ? $page.data.page?.fields.couleur.replaceAll('-pale', '-fonce') : 'vert-fonce'}">

  <nav class="main-nav flex flex--gapped">
    {#if navigation.fields.liens?.length}
    {#each navigation.fields.liens as link, index}
    <div class="flex flex--column flex--gapped">
      <Link {link} className={`h5${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
      {#if link.fields.sousLiens?.length}
        <ul class="list--nostyle">
          {#each link.fields.sousLiens as sousLink}
            <li>
              <Link link={sousLink} />
            </li>
          {/each}
        </ul>
      {/if}
      {#if link.fields.extraBouton}
        <Link className="button button--muted" link={link.fields.extraBouton} />
      {/if}
    </div>
    <!-- {#if index < navigation.fields.liens.length - 1}
      <hr />
    {/if} -->
    <hr />
    {/each}
    {/if}

    <!-- <span class="button">
      FR | EN
    </span> -->

    <div class="col col--3of12 flex flex--gapped">
      <form class="flex flex--gapped">
        <h5>Abonnez-vous à l’infolettre<br>pour ne rien manquer</h5>
        <!-- <input class="col col--6of12" name="nom" placeholder="Votre nom"> -->
        <input class="col col--12of12 input--underline" name="email" type="email" placeholder="Votre courriel">
        <!-- <textarea name="message" id="message" placeholder="Votre message"></textarea> -->
        
        <button type="submit">Je m’abonne</button>
      </form>

      <h5>Suivez-nous sur les réseaux sociaux</h5>
    </div>
  </nav>


  <nav class="sub-nav flex flex--gapped flex--bottom">
    {#if politiques.fields.liens?.length}
    <div class="col col--3of12">
      <Link link={politiques.fields.liens[0]} />
    </div>
    <div class="col col--6of12">
      {#each politiques.fields.liens.slice(1) as link, index}
        <Link {link} />
      {/each}
    </div>
    {/if}

    <a href="/" class="logo col col--3of12">
      <Ecole /><br>
      <Logo />
    </a>
  </nav>
  
  <!-- <nav class:visible class:scrolled={scrollY > innerWidth * 0.2} class="flex flex--center">
    {#each navigation.fields.liens as link}
    <Link {link} className={`padded${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
    {/each}
  </nav> -->
</footer>

<style lang="scss">
  footer {
    position: relative;
    // color: $blanc;
    // background-color: $accent;
    // min-height: 100lvh;
    overflow: hidden;
    padding: $s1;

    .logo {
      margin-top: $s2;
    }

    :global(.h5), h5 {
      margin-bottom: $s3;
    }

    .main-nav {
      position: relative;
      z-index: 1;
      padding: $s1 0;

      align-items: stretch;
      flex-wrap: nowrap;

      div {
        flex: 1;

        &:last-child {
          flex: 1.5;
        }
      }

      ul,
      form {
        margin-bottom: $s3;
      }

      ul {
        li {
          margin-bottom: $s-3;
        }
      }

      :global(.button--muted) {
        margin-top: auto;
      }

      hr {
        width: 1px;
        height: auto;
        border-left: 1px dotted;
        margin: 0;
        background: transparent;
        margin-left: auto;
        opacity: 0.5;
      }
    }

    .sub-nav {
      div {
        // padding: $s1 0;

        &.col--6of12 {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }

      .logo {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    }
  }
</style>