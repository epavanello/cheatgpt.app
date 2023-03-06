<script lang="ts">
	import type { Message } from '$lib/chat';
	import Button from '$lib/components/Button.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import Input from '$lib/components/Input.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let message: string = '';

	let localMessages: Message[] = [
		{ message: 'How can I assist you in cheating your exam? 😜', side: 'right' }
	];

	function send() {
		localMessages.push({ message, side: 'left' });
		localMessages = localMessages;
		message = '';
	}
</script>

<div class="flex-1 w-full flex flex-col items-center justify-center">
	<main class="w-full max-w-4xl h-2/3 flex flex-col">
		<section class="flex-1 w-full">
			{#each localMessages as message}
				<ChatBubble message={message.message} side={message.side} />
			{/each}
		</section>
		<footer class="w-full flex flex-row gap-4 items-center">
			<Input
				type="textarea"
				rows="1"
				block
				containerClass="flex-1"
				placeholder="Enter your question here..."
				bind:value={message}
			/>
			<Tooltip message="Get text from a photo">
				<Button icon="photo_camera" disabled />
			</Tooltip>
			<Button endIcon="auto_fix_normal" on:click={send}>Send</Button>
		</footer>
	</main>
</div>
