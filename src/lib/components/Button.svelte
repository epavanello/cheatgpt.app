<script lang="ts">
	import type { IconTypes } from '$lib/icon-types';
	import cn from 'classnames';
	import Icon from './Icon.svelte';

	export let icon: IconTypes | undefined = undefined;
	export let startIcon: IconTypes | undefined = undefined;
	export let endIcon: IconTypes | undefined = undefined;
	export let size: 'tiny' | 'small' | 'normal' | 'large' = 'normal';
	export let primary = false;
	export let ghost = false;
	export let block = false;
	export let circle = false;
	export let outline = false;
	export let normalCase = false;
	export let gradient = false;
	export let animated = false;
	export let loading = false;
	export let noAnimation = false;
	export let disabled = false;
	let classes: string | undefined = undefined;
	export { classes as class };
	export let link: string | undefined = undefined;

	$: disco = animated && !disabled;
</script>

<svelte:element
	this={link ? 'a' : 'button'}
	href={link}
	disabled={link ? undefined : disabled}
	data-sveltekit-preload-data="off"
	on:click
	class={cn(
		'btn gap-1 z-0',
		{
			'btn-xs': size == 'tiny',
			'btn-sm': size == 'small',
			'btn-lg': size == 'large'
		},
		{
			'btn-primary': primary,
			'btn-ghost': ghost,
			'btn-block': block,
			'btn-circle': circle,
			'btn-outline': outline,
			'btn-disabled': disabled
		},
		{
			'normal-case': normalCase,
			'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-1 border-pink-100 hover:border-pink-100 text-white':
				gradient,
			loading: loading,
			'no-animation': noAnimation || disabled,
			'cursor-not-allowed': disabled,
			relative: disco
		},
		classes
	)}
	type="button"
	{...$$restProps}
>
	{#if startIcon}
		<Icon name={startIcon} {size} />
	{/if}
	{#if icon}
		<Icon name={icon} {size} />
	{:else if disco}
		<span aria-hidden class="absolute inset-0 overflow-hidden rounded-lg blur-sm -z-10">
			<span
				aria-hidden
				class="absolute inset-0 scale-x-[2.0] before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-[#4ade80] before:via-[#3b82f6] before:to-[#4ade80]"
			/>
		</span>
		<span
			class="absolute inset-px grid place-items-center rounded-lg bg-gray-800 bg-gradient-to-tr from-gray-800 to-gray-700 -z-10"
		/>
		<span class="relative text-white flex flex-row items-center">
			<slot />
		</span>
	{:else}
		<slot />
	{/if}
	{#if endIcon}
		<Icon name={endIcon} {size} />
	{/if}
</svelte:element>
