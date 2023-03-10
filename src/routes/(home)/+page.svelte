<script lang="ts">
	import ChatBubble from '../../lib/components/ChatBubble.svelte';

	import { onMount } from 'svelte';
	import { messages, type Message } from '$lib/chat';

	let renderedMessages: Message[] = [];
	const copyMessages = async () => {
		for (const message of messages) {
			await new Promise((resolve) => setTimeout(resolve, 1000)); // attendi 2 secondi
			renderedMessages.push(message); // copia il messaggio nell'array di destinazione
			renderedMessages = renderedMessages;
			setTimeout(() => {
				phoneScroller.scrollTo(0, phoneScroller.scrollHeight);
			}, 0);
		}
	};
	onMount(() => {
		copyMessages();
	});

	let phoneScroller: HTMLDivElement;
</script>

<div class="flex flex-col items-center xl:flex-row mb-24">
	<img src="/logo.png" alt="" class="w-64 md:w-96 rounded-r-lg mb-12 md:mb-0" />
	<h1 class="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal sm:text-7xl">
		Cheat smarter with <!-- -->
		<span class="relative whitespace-nowrap text-[#3290EE]"
			><span class="relative">AI-powered</span></span
		>
		<!-- -->CheatGPT
	</h1>
</div>

<p class="mx-auto max-w-2xl font-light opacity-85 sm:text-xl mt-8">
	AI might be taking over the world, but at least we can use it to cheat like champions with
	CheatGPT
</p>
<div class="flex justify-center space-x-4">
	<a
		class="bg-white rounded-xl text-black font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-gray-100 border"
		href="https://github.com/epavanello/cheatgpt.app"
		target="_blank"
		rel="noreferrer">Learn how it's built</a
	>
	<a
		class="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
		data-sveltekit-preload-data="off"
		rel="external"
		href="/chat">Start Cheating Now</a
	>
</div>

<form
	action="https://gmail.us21.list-manage.com/subscribe/post"
	method="post"
	target="_blank"
	novalidate
	class="flex flex-col items-center mt-20"
>
	<h2 class="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl">
		Sign up for our newsletter
	</h2>
	<p class="mx-auto mb-8 max-w-2xl font-light opacity-85 md:mb-12 sm:text-xl">
		Subscribe to our newsletter to stay updated on when CheatGPT will be available.
	</p>

	<div class="form-control w-full max-w-sm">
		<div class="input-group">
			<input
				type="email"
				class="input input-bordered w-full"
				name="EMAIL"
				value=""
				placeholder="Enter your email"
			/>
			<button type="submit" class="btn">Subscribe</button>
		</div>
	</div>

	<input type="hidden" name="u" value="e6bd76c03e76b4817ba70d806" />
	<input type="hidden" name="id" value="4745c6ccc4" />
</form>

<div class="my-20">
	<div class="mockup-phone">
		<div class="camera" />
		<div class="display">
			<div class="artboard artboard-demo phone-1">
				<div
					class="h-full w-full pt-8 pb-4 px-4 overflow-hidden scroll-smooth"
					bind:this={phoneScroller}
				>
					{#each renderedMessages as message}
						<ChatBubble message={message.message} role={message.role} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<section id="testimonials" aria-label="What our customers are saying" class="py-10">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto md:text-center">
			<h2 class="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl">
				Designed for millions of students.
			</h2>
			<p class="mx-auto mb-8 max-w-2xl font-light opacity-85 md:mb-12 sm:text-xl">
				See what our users are saying about the product on twitter <a
					target="_blank"
					rel="noreferrer"
					href="https://twitter.com/search?q=%23cheatgpt">#CheatGPT</a
				>
			</p>
		</div>
		<!-- List of Tweets here -->
	</div>
</section>
