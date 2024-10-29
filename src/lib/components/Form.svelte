<script lang="ts">
  import type { TypeFormulaireSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'

  let { item, first }: {
    item: Entry<TypeFormulaireSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
  } = $props()
</script>

<section class="flex flex--gapped {item.fields.couleur || ''}" class:padded={!!item.fields.couleur}>
  <div class="col col--12of12 corps flex flex--column flex--gapped">
    {#if item.fields.titre}
    <div class="titre">
      <h3>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h3>
    </div>
    {/if}

    {#if item.fields.corps}
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.corps} />
    </div>
    {/if}

    <form class="form flex flex--gapped" action={item.fields.action} method="POST">
      {#if item.fields.champs}
        {#each item.fields.champs as champ}
          <div class="form-field col col--6of12" class:col--12of12={!champ.fields.half}>
            {#if champ.fields.type === 'Text'}
              <input type="text" name={champ.fields.id} placeholder={champ.fields.titre} required>
            {:else if champ.fields.type === 'Textarea'}
              <textarea name={champ.fields.id} placeholder={champ.fields.titre} required></textarea>
            {:else if champ.fields.type === 'Email'}
              <input type="email" name={champ.fields.id} placeholder={champ.fields.titre} required>
            {:else if champ.fields.type === 'Phone'}
              <input type="tel" name={champ.fields.id} placeholder={champ.fields.titre} required>
            {:else if champ.fields.type === 'Options' && champ.fields.options}
              <select name={champ.fields.id} required>
                <option value="">{champ.fields.titre}</option>
                {#each champ.fields.options as option}
                  <option value={option}>{option}</option>
                {/each}
              </select>
            {/if}
          </div>
        {/each}
      {/if}
      <button type="submit" class="button button--full {item.fields.couleur ? 'button--muted' : 'button--accent'}">{item.fields.bouton || 'Submit'}</button>
    </form>
  </div>
</section>

<style lang="scss">
  section {
    &.padded {
      border-radius: $s0;
    }
  }

  form {

    .form-field {
      // width: 100%;

      // &.half {
      //   width: calc(50% - $s0 / 2);
      // }

      // input, textarea, select {
      //   width: 100%;
      //   padding: $s-1;
      //   border: 1px solid currentColor;
      //   border-radius: $s-2;
      //   background: transparent;
      //   color: inherit;
      // }

      // textarea {
      //   min-height: 100px;
      // }
    }

    button {
      margin-top: $s0;
    }
  }
</style>