<script lang="ts">
	import { fly } from 'svelte/transition';
	import Typewriter from 'svelte-typewriter';

	export let role: 'user' | 'assistant';
	export let message: string;
</script>

<div in:fly={{ duration: 1000 }} class={`chat ${role == 'assistant' ? 'chat-start' : 'chat-end'}`}>
	<div class="chat-image avatar">
		<div class="w-8 rounded-full shadow-sm shadow-slate-500">
			{#if role == 'assistant'}
				<img src="/assistant-avatar.png" alt="Assistant" />
			{:else}
				<img src="/user-avatar.png" alt="User" />
			{/if}
		</div>
	</div>
	<!-- <Typewriter interval={100}> -->
	<div class="chat-bubble text-left whitespace-pre-wrap">
		{message}
	</div>
	<!-- </Typewriter> -->
</div>
