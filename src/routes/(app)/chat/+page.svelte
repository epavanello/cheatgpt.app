<script lang="ts">
	import type { Message } from '$lib/chat';
	import Button from '$lib/components/Button.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import Input from '$lib/components/Input.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { onMount } from 'svelte';

	let message: string = '';

	let localMessages: Message[] = [
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' },
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' }
	];

	function send() {
		localMessages.push({ message, side: 'left' });
		localMessages.push({ message: "I'm under construction", side: 'right' });
		localMessages = localMessages;
		message = '';
		setTimeout(() => {
			document.documentElement.scrollTo(0, document.documentElement.scrollHeight);
		}, 0);
	}
</script>

<div class="flex-1 w-full flex flex-col items-center justify-center">
	<main class="w-full max-w-4xl h-2/3 mobile:h-full mobile:w-full flex flex-col">
		<section class="flex-1 w-full px-2 py-1">
			{#each localMessages as message}
				<ChatBubble message={message.message} side={message.side} />
			{/each}
		</section>
		<div
			class="sticky bottom-0 bg-base-100 px-2 py-1 shadow-sm p w-full flex flex-row gap-2 items-center"
		>
			<Input
				type="textarea"
				rows="1"
				block
				containerClass="flex-1"
				placeholder="Ask here..."
				bind:value={message}
			/>
			<Tooltip message="Get text from a photo">
				<Button icon="photo_camera" disabled />
			</Tooltip>
			<Button endIcon="auto_fix_normal" type="submit" on:click={send}>Send</Button>
		</div>
	</main>
</div>
