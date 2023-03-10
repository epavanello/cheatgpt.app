<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher<{ close: void }>();

	export let open = false;
	function close() {
		open = false;
		dispatch('close');
	}
</script>

{#if open}
	<div
		class="modal opacity-100 visible pointer-events-auto"
		transition:fly
		on:click|self={close}
		on:keydown={close}
	>
		<div class="modal-box relative">
			<Button on:click={close} class="absolute right-1 top-1" circle size="small">✕</Button>

			{#if $$slots.title}
				<h3 class="font-bold text-xl py-2">
					<slot name="title" />
				</h3>
			{/if}
			<p class="py-4">
				<slot />
			</p>
			{#if $$slots.action}
				<div class="modal-action">
					<slot name="action" />
				</div>
			{/if}
		</div>
	</div>
{/if}
