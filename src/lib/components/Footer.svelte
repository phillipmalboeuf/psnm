<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Ecole from './Ecole.svelte'
  import Icon from './Icon.svelte'
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
    <div class="col col--mobile--12of12 flex flex--column flex--gapped">
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

    <div class="col col--3of12 col--mobile--12of12 flex flex--gapped">
      <form action="https://psnm.us17.list-manage.com/subscribe/post" method="POST" target="_blank" class="flex flex--gapped">
        <input type="hidden" name="u" value="08608c364a75a76fb4045c585">
        <input type="hidden" name="id" value="43b1b07b61">
        <h5>Abonnez-vous à l’infolettre<br>pour ne rien manquer</h5>
        <!-- <input class="col col--6of12" name="nom" placeholder="Votre nom"> -->
        <input class="col col--12of12 input--underline" name="MERGE0" type="email" placeholder="Votre courriel">
        <input class="col col--6of12 input--underline" name="MERGE1" type="text" placeholder="Votre prénom">
        <input class="col col--6of12 input--underline" name="MERGE2" type="text" placeholder="Votre nom">
        <!-- <textarea name="message" id="message" placeholder="Votre message"></textarea> -->
        
        <input type="hidden" name="ht" value="0b9970e5c8e3df3e0a228a48eb40aa9af8a348c7:MTc0Mzc4NjAyNS4yNTA2">
        <input type="hidden" name="mc_signupsource" value="hosted">
        <button type="submit">Je m’abonne</button>
      </form>

      <h5>Suivez-nous sur les réseaux sociaux</h5>
      <nav class="flex flex--gapped sociaux">
        {#if sociaux.fields.liens?.length}
          {#each sociaux.fields.liens as link}
            <a href={link.fields.destination} target="_blank" rel="noopener noreferrer">
              {#if link.fields.destination.includes('instagram')}
                <Icon icon="instagram" label="Instagram" />
              {:else if link.fields.destination.includes('facebook')}
                <Icon icon="facebook" label="Facebook" />
              {:else if link.fields.destination.includes('youtube')}
                <Icon icon="youtube" label="YouTube" />
              {:else if link.fields.destination.includes('linkedin')}
                <Icon icon="linkedin" label="LinkedIn" />
              {/if}
            </a>
          {/each}
        {/if}
      </nav>
    </div>
  </nav>


  <nav class="sub-nav flex flex--gapped flex--bottom">
    {#if politiques.fields.liens?.length}
    <div class="col col--9of12 col--mobile--12of12 flex flex--gapped">
      <div class="col col--3of12 col--mobile--12of12">
        <Link link={politiques.fields.liens[0]} />
      </div>
      <div class="col col--6of12 col--mobile--12of12">
        {#each politiques.fields.liens.slice(1) as link, index}
          <Link {link} />
        {/each}
      </div>
      <div class="col col--3of12 col--mobile--12of12">
        <a href="https://maps.app.goo.gl/AWsZC3DNoPLsdDsWA" target="_blank" rel="noopener noreferrer">
          Pensionnat du Saint-Nom-de-Marie<br>
          628, chemin de la Côte-Sainte-Catherine<br>
          Outremont (Québec) H2V 2C5
        </a>
      </div>
    </div>
    {/if}

    <a href="/" class="logo col col--3of12 col--mobile--12of12">
      <Ecole />
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

    

    :global(.h5), h5 {
      margin-bottom: $s3;

      @media (max-width: $mobile) {
        margin-bottom: $s1;
      }
    }

    h5:has(+ .sociaux) {
      margin-bottom: 0;
    }

    .main-nav {
      position: relative;
      z-index: 1;
      padding: $s1 0;

      align-items: stretch;

      @media (min-width: $mobile) {
        flex-wrap: nowrap;
      }

      div {
        @media (min-width: $mobile) {
          flex: 1;

          &:last-child {
            flex: 1.5;
          }
        }
      }

      ul,
      form {
        margin-bottom: $s3;

        @media (max-width: $mobile) {
          margin-bottom: $s-1;
        }
      }

      form {
        @media (max-width: $mobile) {
          margin-bottom: $s3;
        }

        button {
          // border: 1px dotted;
        }
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
        margin: 0;
        width: 1px;
        height: auto;
        // border-left: 1px dotted;
        // background: transparent;
	      background-image: repeating-linear-gradient(0deg, currentColor, currentColor 2px, transparent 2px, transparent 5px);

        margin-left: auto;
        opacity: 0.5;

        @media (max-width: $mobile) {
          width: 100%;
          height: 1px;
          margin-top: $s2;
        }
      }
    }

    .sub-nav {
      div {
        // padding: $s1 0;
        font-size: calc($s0 - 2px);
        line-height: 1.33;

        &.col--6of12 {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: $tablet_landscape) {
          &.col--9of12 {
            width: 100%;
          }
        }
      }

      .logo {
        margin-top: $s2;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: $s0;

        @media (max-width: $tablet_landscape) {
          width: 100%;
          margin-top: $s1;
        }

        @media (max-width: $mobile) {
          gap: $s-2;
        }

        :global(svg) {
          &:first-child {
            width: 124px;
            height: auto;
          }

          @media (max-width: $mobile) {
            &:first-child {
              width: 100px;
            }

            &:last-child {
              width: 200px;
            }
          }
        }
    
      }
    }
  }
</style>