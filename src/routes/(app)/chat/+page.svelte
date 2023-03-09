<script lang="ts">
	import type { Message } from '$lib/chat';
	import Button from '$lib/components/Button.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import Input from '$lib/components/Input.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { onMount } from 'svelte';
	import Tesseract from 'tesseract.js';
	import { readAndCompressImage } from 'browser-image-resizer';
	import Header from '$lib/components/Header.svelte';

	let message: string = '';
	let responseWaiting = false;

	let localMessages: Message[] = [
		{
			message: `Do you need help cheating on exams? 😜
Look no further! 
Just fire away with your questions and get lightning-fast, concise answers from yours truly. 
And if you're feeling extra sneaky, snap a quick pic of that textbook page and let the AI work its magic to extract the text for you.

Just don't blame me if you get caught! 😂`,
			role: 'assistant'
		}
	];

	let convertingImage = false;

	let textarea: HTMLTextAreaElement;
	let file: HTMLInputElement;

	function updateTextareaSize() {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	}

	$: {
		message;
		setTimeout(() => {
			updateTextareaSize();
		}, 0);
	}

	let tesseractWorker: Tesseract.Worker | null = null;
	let workerError = false;

	function addMessage(message: Message) {
		localMessages.push(message);
		localMessages = localMessages;
	}

	async function send() {
		try {
			responseWaiting = true;
			addMessage({ message, role: 'user' });
			const messageToSend = message;
			message = '';
			textarea.focus();
			const response = (await (
				await fetch('', {
					body: JSON.stringify({ message: messageToSend }),
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				})
			).json()) as { response: { role: 'assistant'; content: string } };
			addMessage({ message: response.response.content, role: 'assistant' });
			setTimeout(() => {
				document.documentElement.scrollTo(0, document.documentElement.scrollHeight);
			}, 0);
		} catch (error) {
			console.error(error);
		} finally {
			responseWaiting = false;
		}
	}

	async function handleFile(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		if (
			tesseractWorker &&
			event.currentTarget.files &&
			event.currentTarget.parentNode &&
			event.currentTarget.files.length == 1 &&
			event.currentTarget.files[0]
		) {
			convertingImage = true;
			try {
				const file = event.currentTarget.files[0];
				event.currentTarget.value = '';
				const resizedBlob = await readAndCompressImage(file, {
					quality: 0.5,
					maxWidth: 800,
					maxHeight: 600
				});
				// TODO - add rectangle https://github.com/naptha/tesseract.js/blob/master/docs/examples.md#with-only-part-of-the-image-201
				const ret = await tesseractWorker.recognize(resizedBlob, { rotateAuto: true });
				message = ret.data.text;
			} catch (error) {
				console.error(error);
			} finally {
				convertingImage = false;
			}
		}
	}

	onMount(async () => {
		try {
			const worker = await Tesseract.createWorker({});
			await worker.loadLanguage('eng');
			await worker.initialize('eng');

			tesseractWorker = worker;
		} catch (error) {
			workerError = true;
		}
	});
</script>

<Header />
<div class="flex-1 w-full flex flex-col items-center justify-center">
	<main class="w-full max-w-4xl h-2/3 mobile:h-full mobile:w-full flex flex-col">
		<section class="flex-1 w-full px-2 py-1">
			{#each localMessages as message}
				<ChatBubble message={message.message} role={message.role} />
			{/each}
		</section>
		<div
			class="sticky bottom-0 bg-base-100 px-2 py-1 shadow-sm p w-full flex flex-row gap-2 items-start"
		>
			<Input
				type="textarea"
				id="chat-input"
				rows="1"
				block
				containerClass="flex-1"
				inputClass="resize-none overflow-hidden"
				placeholder="Ask here..."
				autocomplete="off"
				bind:input={textarea}
				bind:value={message}
				on:input={updateTextareaSize}
				tabindex="1"
			/>
			<Tooltip message="Get text from a photo">
				<input
					type="file"
					accept="image/*"
					class="hidden"
					bind:this={file}
					on:change={handleFile}
				/>
				<Button
					on:click={() => file.click()}
					type="button"
					icon="photo_camera"
					loading={(!workerError && !tesseractWorker) || convertingImage}
					disabled={workerError || !tesseractWorker || convertingImage}
					tabindex="3"
				/>
			</Tooltip>
			<Button
				endIcon="auto_fix_normal"
				type="button"
				on:click={send}
				disabled={responseWaiting}
				loading={responseWaiting}
				tabindex="2">Send</Button
			>
		</div>
	</main>
</div>
