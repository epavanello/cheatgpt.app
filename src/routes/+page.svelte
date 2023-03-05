<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { messages, type Message } from '../lib/chat';

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

<h1
	class="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl"
>
	Cheat smarter with <!-- -->
	<span class="relative whitespace-nowrap text-[#3290EE]"
		><span class="relative">IA-powered</span></span
	>
	<!-- -->CheatGPT
</h1>
<p class="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
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
	<!-- <a
		class="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
		href="/chat">Start Cheating Now</a
	> -->
	<!-- <form action="">
		<button
			class="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
			type="submit">Subscribe</button
		>
	</form> -->
</div>

<div class="my-20">
	<div class="mockup-phone">
		<div class="camera" />
		<div class="display">
			<div class="artboard artboard-demo phone-1">
				<div
					class="h-full w-full pt-8 px-4 overflow-hidden scroll-smooth"
					bind:this={phoneScroller}
				>
					{#each renderedMessages as message}
						<div
							transition:fly={{ duration: 1000 }}
							class={`chat ${message.side == 'left' ? 'chat-start' : 'chat-end'}`}
						>
							<div class="chat-bubble text-left">{message.message}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<section id="testimonials" aria-label="What our customers are saying" class="py-10">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto md:text-center">
			<h1
				class="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl"
			>
				Designed for millions of students.
			</h1>
			<p class="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7 mt-8">
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
