<script lang="ts">
	import '../styles/styles.scss'

	// import Dialog from '$lib/components/Dialog.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	import { page } from '$app/stores'
	import type { Snippet } from 'svelte'
	import { afterNavigate } from '$app/navigation'

	import type { LayoutData } from './$types'
  let { data, children }: {
		data: LayoutData,
		children: Snippet
	} = $props()

	afterNavigate(() => {
		// @ts-ignore
		window.fbq && window.fbq('track', 'PageView');

		// @ts-ignore
		window.gtag && window.gtag('config', 'G-W348XLSVXW', { 'send_page_view': true, page_path: $page.url.pathname });
	})
</script>

<svelte:head>
	{#if $page.data.page?.fields}
	<title>{$page.data.page.fields.titre}</title>
	<!-- <meta name="description" content={$page.data.page.fields.description} /> -->
	{/if}
</svelte:head>

<div id="container" class="{$page.data.page?.fields.couleur}">
	<div class="{$page.route.id?.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {$page.url.pathname.replaceAll('/', '-')}">
		<!-- <Dialog /> -->

		<!-- <Intro /> -->
		<Header navigation={data.navigations['menu']} buttons={data.navigations['boutons-menu']} />

		<main>
			{@render children()}
		</main>

		<Footer 
			navigation={data.navigations['footer']}
			politiques={data.navigations['politiques']}
			sociaux={data.navigations['sociaux']}
		/>
	<!-- 
		<Footer navigation={data.navigations['navigation']}
			footer={data.navigations['footer']}
			social={data.navigations['social']}
			work={data.navigations['work']}
			disclaimers={data.navigations['disclaimers']} /> -->
	</div>
</div>

<style lang="scss">
	:global(#container) {
		transition: background-color 0.666s, color 0.666s;
	}

	main {
		min-height: 100lvh;
		padding: $s5 $s1 $s1;

		@media (max-width: $mobile) {
			padding: $s0;
		}

		.-gammes-id & {
			padding: 0;
		}
	}
</style>
