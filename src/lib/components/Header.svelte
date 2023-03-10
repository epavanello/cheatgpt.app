<script>
	import GithubIcon from '$lib/components/GithubIcon.svelte';
</script>

<header
	class="flex justify-between items-center w-full border-b-2 py-4 sm:px-4 px-2 sticky top-0 z-40 bg-base-100"
>
	<a class="flex space-x-2 !no-underline" href="/">
		<div
			class="sm:text-5xl text-3xl font-bold ml-2 tracking-tight flex flex-row gap-2 items-center"
		>
			<img src="/logo.png" alt="CheatGPT Logo" class="w-16 h-16 drop-shadow-sm rounded-lg shadow-sm shadow-slate-500" />
			<h2>Cheat<span class="text-[#3290EE]">GPT</span></h2>
		</div>
	</a>
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
