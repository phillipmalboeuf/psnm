<script lang="ts">
  import { page } from '$app/stores'
  import Icon from './Icon.svelte'
  // import { languageTag } from '$lib/paraglide/runtime'

  let timeout: NodeJS.Timeout
  let form: HTMLFormElement
</script>

<form class="flex flex--tight_gapped flex--middle" action="/recherche" bind:this={form} on:input={e => {
  // clearTimeout(timeout)
  // timeout = setTimeout(() => {
  //   form.requestSubmit()
  // }, 666)
}}>
  <fieldset>
    <!-- <label for="q">Recherche</label> -->
    <input type="text" name="q" id="q" value={$page.url.searchParams.get("q")} autofocus={!!$page.url.searchParams.get("q")} placeholder="Recherche">
  </fieldset>
  <button class="button--accent button--circle" type="submit"><Icon icon="search" label="Rechercher" /></button>
</form>

<style lang="scss">
  form {
    fieldset {
      width: auto;
      flex: 1;
    }

    input {
      background-color: $beige-pale;
      border-radius: $s0;
      // padding: $s0;
    }

  }
</style>