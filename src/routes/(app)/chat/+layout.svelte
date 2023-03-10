<script>
	import { browser } from '$app/environment';
	import '../../../app.css';

	const isDark =
		browser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
</script>

<svelte:head>
	<meta name="theme-color" content={isDark ? '#2A303C' : '#FFFFFF'} />
</svelte:head>

<slot />
