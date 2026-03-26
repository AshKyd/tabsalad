<script>
	import { UIRoot } from 'svelte-akui';
	import '../app.css';
	let { children } = $props();
</script>

<UIRoot>
	{@render children()}
</UIRoot>
