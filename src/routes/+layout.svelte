<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { isDark } from '$lib/theme';
	import '../app.css';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((state) => {
			console.log('State change', state);
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<meta name="theme-color" content={$isDark ? '#2A303C' : '#FFFFFF'} />
</svelte:head>

<slot />
