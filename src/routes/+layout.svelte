<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import '../app.css';
	let { children } = $props();

	onMount(() => {
		// Unload the service worker if we're on localhost to avoid cross-project pollution.
		if (browser && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
			window.addEventListener('beforeunload', () => {
				navigator.serviceWorker.getRegistrations().then((registrations) => {
					for (const registration of registrations) {
						registration.unregister();
					}
				});
			});
		}
	});
</script>

{@render children()}
