<script lang="ts">
	import { ResponseType, type Message } from '$lib/chat';
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

	let responseType: ResponseType = ResponseType.ConinciseAnswers;

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
			textarea.style.height = textarea.scrollHeight + 2 + 'px';
		}
	}
	function handlePaste(e: ClipboardEvent) {
		if (
			e.clipboardData &&
			e.clipboardData.items.length == 1 &&
			e.clipboardData.items[0].type.indexOf('image') !== -1
		) {
			handleFile(e.clipboardData.items[0].getAsFile());
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
		setTimeout(scrollToEnd, 0);
	}

	function scrollToEnd() {
		document.documentElement.scrollTo(0, document.documentElement.scrollHeight);
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
					body: JSON.stringify({ message: messageToSend, responseType }),
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				})
			).json()) as { response: { role: 'assistant'; content: string } };
			addMessage({ message: response.response.content, role: 'assistant' });
		} catch (error) {
			console.error(error);
		} finally {
			responseWaiting = false;
		}
	}

	async function handleFile(file: File | null) {
		if (file && tesseractWorker) {
			const resizedBlob = await readAndCompressImage(file, {
				quality: 0.5,
				maxWidth: 800,
				maxHeight: 600
			});
			// TODO - add rectangle https://github.com/naptha/tesseract.js/blob/master/docs/examples.md#with-only-part-of-the-image-201
			const ret = await tesseractWorker.recognize(resizedBlob, { rotateAuto: true });
			message = ret.data.text;
		}
	}

	async function handleFileChange(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		if (
			event.currentTarget.files &&
			event.currentTarget.parentNode &&
			event.currentTarget.files.length == 1
		) {
			convertingImage = true;
			try {
				const file = event.currentTarget.files[0];
				event.currentTarget.value = '';
				await handleFile(file);
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
	<main class="w-full max-w-4xl h-full mobile:w-full flex flex-col">
		<section class="flex-1 w-full px-2 py-1">
			{#each localMessages as message}
				<ChatBubble message={message.message} role={message.role} />
			{/each}
			{#if responseWaiting}
				<ChatBubble message="I'm thinking..." role="assistant" />
			{/if}
		</section>
	</main>
	<footer class="sticky bottom-0 bg-base-200 px-2 pb-2 shadow-sm p w-full">
		<div class="w-full max-w-4xl mx-auto flex flex-col gap-2">
			<div class="flex flex-row gap-2 items-end">
				<Input
					type="select"
					options={[
						['1', 'Coincise answers'],
						['2', 'Summarize'],
						['3', 'Explain']
					]}
					bind:value={responseType}
					size="small"
					block
					containerClass="flex-1"
					label="Response type"
					tabindex="3"
				/>
				<Tooltip message="Get text from a photo" position="left">
					<input
						type="file"
						accept="image/*"
						class="hidden"
						bind:this={file}
						on:change={handleFileChange}
					/>
					<Button
						on:click={() => file.click()}
						type="button"
						icon="photo_camera"
						loading={convertingImage}
						disabled={workerError || !tesseractWorker || convertingImage}
						tabindex="4"
						size="small"
					/>
				</Tooltip>
			</div>
			<div class="flex flex-row gap-2 items-end">
				<Input
					type="textarea"
					id="chat-input"
					rows="1"
					block
					containerClass="flex-1"
					inputClass="resize-none max-h-64 leading-none"
					placeholder="Ask here or paste a screenshot..."
					autocomplete="off"
					bind:input={textarea}
					bind:value={message}
					on:input={updateTextareaSize}
					on:paste={handlePaste}
					tabindex="1"
				/>
				<Button
					endIcon="auto_fix_normal"
					type="button"
					on:click={send}
					disabled={responseWaiting}
					loading={responseWaiting}
					tabindex="2">Send</Button
				>
			</div>
		</div>
	</footer>
</div>
