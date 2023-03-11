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
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Google from '$lib/svg/Google.svelte';
	import type { PageData } from './$types';
	import { handleError } from '$lib/db';
	import { getErrorMessage } from '$lib/utilities';
	export let data: PageData;

	let message: string = '';
	let responseWaiting = false;

	let responseType: ResponseType = ResponseType.ConinciseAnswers;

	let localMessages: Message[] = [];

	let convertingImage = false;

	let textarea: HTMLTextAreaElement;
	let file: HTMLInputElement;
	let openPremiumModal = false;
	let loadingGoogle = false;

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
		console.log(data.session);
		try {
			const worker = await Tesseract.createWorker({});
			await worker.loadLanguage('eng');
			await worker.initialize('eng');

			tesseractWorker = worker;
		} catch (error) {
			workerError = true;
		}
	});

	async function loginWithGoogle() {
		try {
			loadingGoogle = true;
			handleError(
				await data.supabase.auth.signInWithOAuth({
					provider: 'google',
					options: {
						redirectTo: location.href
					}
				})
			);
		} catch (error) {
			addMessage({
				role: 'assistant',
				message: getErrorMessage(error)
			});
		} finally {
			loadingGoogle = false;
		}
	}
	async function logout() {
		await data.supabase.auth.signOut();
	}
</script>

<Modal bind:open={openPremiumModal}>
	<p slot="title" class="text-center">Everything included in one clear pricing plan</p>
	<div class="flex flex-col items-center ">
		<p class="text-sm flex flex-col gap-2 items-center">
			<span> Promo code</span>
			<Button
				startIcon="sell"
				endIcon="copy_all"
				size="small"
				on:click={() => navigator.clipboard.writeText('EARLYBIRD')}>EARLYBIRD</Button
			>
		</p>
		<h2 class="font-bold text-6xl mt-6">$5.99</h2>
		<p>per month</p>

		<hr />
		<h3 class="font-bold text-2xl mt-12 mb-6">Premium features for CheatGPT:</h3>
		<ul>
			<li class="flex flex-row items-center gap-2">
				<Icon name="done" class="text-green-500" /> All current and future premium features
			</li>
			<li class="flex flex-row items-center gap-2">
				<Icon name="done" class="text-green-500" /> Summarization tools
			</li>
			<li class="flex flex-row items-center gap-2">
				<Icon name="done" class="text-green-500" /> OCR for photos or screenshots
			</li>
			<li class="flex flex-row items-center gap-2">
				<Icon name="done" class="text-green-500" /> In-depth explanations
			</li>
			<li class="flex flex-row items-center gap-2">
				<Icon name="done" class="text-green-500" /> Code snippets <i>(future)</i>
			</li>
			<li class="flex flex-row items-center gap-2">
				<Icon name="done" class="text-green-500" /> Multi-language support <i>(future)</i>
			</li>
		</ul>
		<Button animated link="https://buy.stripe.com/5kA28CeOy6mY3x64gg" class="mt-6">Subscribe</Button
		>
	</div>
</Modal>

<Header compactGithub>
	<Button
		animated
		on:click={() => {
			openPremiumModal = true;
		}}>Unlock premium features</Button
	>
</Header>
<div class="flex-1 w-full flex flex-col items-center justify-center">
	<main class="w-full max-w-4xl h-full lg:h-3/4 mobile:w-full flex flex-col">
		<section class="flex-1 w-full px-2 py-1">
			<ChatBubble
				role="assistant"
				message={`
Do you need help cheating on exams? 😜
Look no further! 
Just fire away with your questions and get lightning-fast, concise answers from yours truly. 
And if you're feeling extra sneaky, snap a quick pic of that textbook page and let the AI work its magic to extract the text for you.

Just don't blame me if you get caught! 😂`}
			/>
			<ChatBubble role="assistant">
				{#if data.session?.user}
					Welcome back {data.session.user.email}
					<Button
						type="button"
						class="bg-base-100 my-2"
						size="small"
						normalCase
						outline
						on:click={logout}
					>
						Sign out
					</Button>
				{:else}
					It seems that you are not logged in.<br />
					<Button
						type="button"
						class="bg-base-100 my-2"
						size="small"
						normalCase
						outline
						on:click={loginWithGoogle}
						loading={loadingGoogle}
						disabled={loadingGoogle}
					>
						<Google />
						Sign in with Google
					</Button>
				{/if}
			</ChatBubble>
			{#each localMessages as message}
				<ChatBubble message={message.message} role={message.role} />
			{/each}
			{#if responseWaiting}
				<ChatBubble message="I'm thinking..." role="assistant" />
			{/if}
		</section>
		<footer class="sticky bottom-0 bg-base-100 border-t border-base-300 px-2 pb-2 w-full">
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
						tabindex="2"
						primary>Send</Button
					>
				</div>
			</div>
		</footer>
	</main>
</div>
