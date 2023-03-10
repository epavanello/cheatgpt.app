<script>
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import Button from './Button.svelte';

	export let compactGithub = false;
</script>

<header
	class="w-full shadow shadow-gray-300 dark:shadow-black py-4 sm:px-4 sticky top-0 z-40 dark:bg-base-300"
>
	<div class="max-w-7xl mx-auto flex flex-wrap flex-row mobile:justify-center gap-2 justify-between items-center">
		<a class="flex space-x-2 !no-underline" href="/">
			<div
				class="sm:text-5xl text-3xl font-bold ml-2 tracking-tight flex flex-row gap-2 items-center"
			>
				<img
					src="/logo.png"
					alt="CheatGPT Logo"
					class="w-16 h-16 drop-shadow-sm rounded-lg shadow-sm shadow-slate-500"
				/>
				<h2>Cheat<span class="text-[#3290EE]">GPT</span></h2>
			</div>
		</a>
		<div class="flex flex-row items-center gap-4">
			<slot />
			<Button
				link="https://github.com/epavanello/cheatgpt.app"
				target="_blank"
				rel="noopener noreferrer"
				primary
				normalCase
				class="gap-2"
			>
				<GithubIcon />
				{#if !compactGithub}
					<p>Star on GitHub</p>
				{/if}
			</Button>
			
		</div>
	</div>
</header>
