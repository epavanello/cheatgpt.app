<script lang="ts">
	import { fly } from 'svelte/transition';
	import Typewriter from 'svelte-typewriter';

	export let role: 'user' | 'assistant';
	export let message: string;
</script>

<div
	in:fly={{ duration: 1000 }}
	class={`chat ${role == 'assistant' ? 'chat-start' : 'chat-end'}`}
>
	<!-- <Typewriter interval={100}> -->
		<div class="chat-bubble text-left whitespace-pre-wrap">
			{message}
		</div>
	<!-- </Typewriter> -->
</div>
