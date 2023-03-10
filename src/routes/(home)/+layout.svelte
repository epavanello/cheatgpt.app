<script>
	import Header from '../../lib/components/Header.svelte';

	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import TwitterIcon from '$lib/components/TwitterIcon.svelte';

	import '../../app.css';
</script>

<div class="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 flex-1">
	<Header />
	<main
		class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20 background-gradient"
	>
		<slot />
	</main>
</div>

<footer class="bg-neutral text-neutral-content">
	<div
		class="p-4 w-full max-w-6xl mx-auto flex flex-row items-center justify-between mobile:flex-col mobile:gap-4"
	>
		<p class="text-center">
			Copyright
			<a href="https://github.com/epavanello" target="_blank" rel="noopener noreferrer"
				>Pavanello Emanuele</a
			> © 2023 - All right reserved
		</p>
		<p class="mobile:text-center">
			Powered by <a href="https://openai.com/">OpenAI</a>,
			<a href="https://vercel.com/">Vercel</a>,
			<a href="https://supabase.com/">Supabase</a>,
			<a href="https://kit.svelte.dev/">Svelte</a>,
			<a href="https://tailwindcss.com/">Tailwind CSS</a>
		</p>

		<div class="flex flex-row gap-4">
			<a href="https://twitter.com/e_pavanello" target="_blank" rel="noopener noreferrer"
				><TwitterIcon />
			</a>
			<a href="https://github.com/epavanello/cheatgpt.app" target="_blank" rel="noopener noreferrer"
				><GithubIcon /></a
			>
		</div>
	</div>
</footer>
