<script lang="ts">
	export let message: string;
</script>

{#if message}
	<div class="tooltip" data-tip={message}>
		<slot />
	</div>
{:else}
	<slot />
{/if}
