<script lang="ts">
	import { fly } from 'svelte/transition';

	export let side: 'left' | 'right';
	export let message: string;
</script>

<div
	transition:fly={{ duration: 1000 }}
	class={`chat ${side == 'left' ? 'chat-start' : 'chat-end'}`}
>
	<div class="chat-bubble text-left">{message}</div>
</div>
