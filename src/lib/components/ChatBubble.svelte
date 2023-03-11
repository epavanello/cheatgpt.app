<script lang="ts">
	import { fly } from 'svelte/transition';
	import Typewriter from 'svelte-typewriter';
	import classNames from 'classnames';

	export let role: 'user' | 'assistant';
	export let message = '';
</script>

<div
	in:fly={{ duration: 1000 }}
	class={classNames('chat', {
		'chat-start': role == 'assistant',
		'chat-end': role == 'user'
	})}
>
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
	<div
		class={classNames('chat-bubble text-left', {
			'whitespace-pre-wrap': !!message
		})}
	>
		<slot>
			{message}
		</slot>
	</div>
	<!-- </Typewriter> -->
</div>
