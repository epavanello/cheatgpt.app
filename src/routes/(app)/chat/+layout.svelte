<script>
	import { isDark } from '$lib/theme';
	import '../../../app.css';
</script>

<svelte:head>
	<meta name="theme-color" content={$isDark ? '#2A303C' : '#FFFFFF'} />
</svelte:head>

<slot />
