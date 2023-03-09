<script lang="ts">
	import classNames from "classnames";


	export let message: string;
	export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
</script>

{#if message}
	<div
		class={classNames('tooltip', {
			'tooltip-top': position == 'top',
			'tooltip-bottom': position == 'bottom',
			'tooltip-left': position == 'left',
			'tooltip-right': position == 'right'
		})}
		data-tip={message}
	>
		<slot />
	</div>
{:else}
	<slot />
{/if}
