// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			navigations: {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>}
			tags: {[id: string]: Tag}
			pageIds: string[]
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
