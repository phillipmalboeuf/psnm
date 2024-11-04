<script lang="ts">
  import { page } from '$app/stores'
  // import { languageTag } from '$lib/paraglide/runtime'

  let timeout: NodeJS.Timeout
  let form: HTMLFormElement
</script>

<form class="flex flex--tight_gapped" action="/recherche" bind:this={form} on:input={e => {
  // clearTimeout(timeout)
  // timeout = setTimeout(() => {
  //   form.requestSubmit()
  // }, 666)
}}>
  <fieldset>
    <label for="q">Recherche</label>
    <input class="input--underline" type="text" name="q" id="q" value={$page.url.searchParams.get("q")} autofocus={!!$page.url.searchParams.get("q")} placeholder="Recherche">
  </fieldset>
  <button class="button--green" type="submit">Recherche</button>
</form>

<style lang="scss">
  form {
    fieldset {
      width: auto;
      flex: 1;
    }
  }
</style>