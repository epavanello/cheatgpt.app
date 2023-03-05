<script>
	import TwitterIcon from './TwitterIcon.svelte';

	import GithubIcon from '../lib/components/GithubIcon.svelte';

	import '../app.css';
</script>

<div class="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
	<header class="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
		<a class="flex space-x-2 !no-underline" href="/">
			<h2 class="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">CheatGPT 🎓</h2></a
		>
		<a
			class="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
			href="https://github.com/epavanello/cheatgpt.app"
			target="_blank"
			rel="noopener noreferrer"
		>
			<GithubIcon />
			<p>Star on GitHub</p></a
		>
	</header>
	<main
		class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20"
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
