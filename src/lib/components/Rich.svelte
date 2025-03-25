<script lang="ts">
  import type { Document } from '@contentful/rich-text-types'
  import Media from './Media.svelte'
  import type { Asset } from 'contentful'

  let { body, collapsable, open }: { body: Document, collapsable?: boolean, open?: boolean } = $props()

  let hover = $state<Asset<"WITHOUT_UNRESOLVABLE_LINKS">>()
  let mouse = $state<{x: number, y: number}>()
</script>

{#snippet m(mark)}
{#if mark.nodeType === 'text'}
{#if mark.marks.length > 0}
  {#if mark.marks[0].type === 'italic'}
  <em>{@render m({ ...mark, marks: mark.marks.slice(1) })}</em>
  {:else if mark.marks[0].type === 'bold'}
  <strong>{@render m({ ...mark, marks: mark.marks.slice(1) })}</strong>
  {:else if mark.marks[0].type === 'underline'}
  <u>{@render m({ ...mark, marks: mark.marks.slice(1) })}</u>
  {:else if mark.marks[0].type === 'subscript'}
  <small class="sub">{@render m({ ...mark, marks: mark.marks.slice(1) })}</small>
  {:else if mark.marks[0].type === 'superscript'}
  <small class="sup">{@render m({ ...mark, marks: mark.marks.slice(1) })}</small>
  {:else if mark.marks[0].type === 'code'}
  {@html mark.value}
  {/if}
{:else}
{mark.value}
{/if}
{:else if mark.nodeType === 'hyperlink'}
<a href="{((mark.data.uri?.startsWith('http') || mark.data.uri?.startsWith('mailto:') || mark.data.uri?.startsWith('/') || mark.data.uri?.startsWith('#')) ? mark.data.uri : `/${mark.data.uri}`)}" target="{mark.data.uri.indexOf('http') === 0 ? '_blank' : '_self'}">
  {#each mark.content as _mark}{@render m(_mark)}{/each}
</a>
{:else if mark.nodeType === 'asset-hyperlink'}
<a href="{mark.data.target.fields.file.url}" target="_blank" onmouseenter={() => hover = mark.data.target} onmouseleave={() => hover = undefined} onmousemove={e => mouse = {x: e.clientX, y: e.clientY}}>
  {#each mark.content as _mark}{@render m(_mark)}{/each}
</a>{#if hover && hover.fields.file.contentType.startsWith('image/')}<div class="hover" style="left: {mouse.x}px; top: {mouse.y}px;"><Media media={hover} width={300} /></div>{/if}
{/if}
{/snippet}

{#snippet n(node)}
{#if node.nodeType === 'heading-1'}
  <h1>{#each node.content as mark}{@render m(mark)}{/each}</h1>
{:else if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}{@render m(mark)}{/each}</h2>
{:else if node.nodeType === 'heading-3'}
  <h3>{#each node.content as mark}{@render m(mark)}{/each}</h3>
{:else if node.nodeType === 'heading-4'}
  <h4>{#each node.content as mark}{@render m(mark)}{/each}</h4>
{:else if node.nodeType === 'heading-5'}
  <h5>{#each node.content as mark}{@render m(mark)}{/each}</h5>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}{@render m(mark)}{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  {#if collapsable}
  <details name={!open ? "accordeon" : undefined} {open}>
    <summary></summary>
    <p>{#each node.content as mark}{@render m(mark)}{/each}</p>
  </details>
  {:else}
  <p>{#each node.content as mark}{@render m(mark)}{/each}</p>
  {/if}
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul class:long={node.content.length > 6}>
    {#each node.content as item}<li>{#each item.content as node}{@render n(node)}{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'ordered-list'}
  <ol>
    {#each node.content as item}<li>{#each item.content as node}{@render n(node)}{/each}</li>{/each}
  </ol>

{:else if node.nodeType === 'table'}
  <table class="table--fixed">
    <tbody>
    {#each node.content as item}<tr>{#each item.content as node}{@render n(node)}{/each}</tr>{/each}
    </tbody>
  </table>
{:else if node.nodeType === 'table-header-cell'}
  <th data-content="{node.content[0]?.content[0]?.value}">{#each node.content as item}{@render n(item)}{/each}</th>
{:else if node.nodeType === 'table-cell'}
  <td>{#each node.content as item}{@render n(item)}{/each}</td>

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each node.content as code}{@render n(code)}{/each}</blockquote>

{:else if node.nodeType === 'embedded-asset-block'}
  <figure>
    <Media media={node.data.target} />
    {#if node.data.target.fields.description}
    <figcaption>{node.data.target.fields.description}</figcaption>
    {/if}
  </figure>
{:else if node.nodeType === 'embedded-entry-block'}
{/if}
{/snippet}

{#each body.content as node}
{@render n(node)}
{/each}

<style lang="scss">
  hr {
    margin: 0;
  }

  figure {
    margin: $s3 0;
    max-width: 66ch;

    @media (max-width: $mobile) {
      margin: $s2 0;
    }
  }

  ul {
    &.long {

      @media (min-width: $mobile) {
        column-count: 2;
        column-gap: $s1;

        :global(*) {
          break-inside: avoid-column;
        }
      }
    }

    li {
      margin: $s-2 0;

      &::marker {
        font-size: 0.75em;
      }
    }
  }

  .hover {
    position: fixed;
    z-index: 1000;
    transform: translate(-50%, calc(-100% - 10px));
  }
</style>
