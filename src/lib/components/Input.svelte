<script lang="ts">
	import cn from 'classnames';
	import Button from './Button.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let label: string | undefined = undefined;
	export let altLabel: string | undefined = undefined;
	export let input: HTMLInputElement | undefined = undefined;
	export let value: string | number | undefined = undefined;
	export let type: 'text' | 'password' | 'number' | 'file' | 'textarea' | 'select' = 'text';
	export let options: [string, string][] = [];
	export let inputClass = '';
	export let containerClass = '';
	export let labelButton: string | undefined = undefined;
	export let block = false;
	const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		// in here, you can switch on type and implement
		// whatever behaviour you need
		value = e.currentTarget.value;
	};

	$: {
		if (input && value && type !== 'file') {
			input.value = value.toString();
		}
	}
</script>

<div class={cn('form-control', containerClass)}>
	{#if label}
		<label class="label" for={id}>
			<span class="label-text text-inherit">{label}</span>
		</label>
	{/if}

	<div class="relative">
		{#if type == 'textarea'}
			<textarea
				bind:value
				{id}
				{name}
				class={cn('textarea textarea-bordered w-full', { 'max-w-xs': !block }, inputClass)}
				on:input
				{...$$restProps}
			/>
		{:else if type == 'select'}
			<select
				bind:value
				{id}
				{name}
				class={cn('select select-bordered capitalize w-full', { 'max-w-xs': !block }, inputClass)}
				on:input
				{...$$restProps}
			>
				<option disabled selected />
				{#each options as [key, label]}
					<option value={key} class="capitalize">{label}</option>
				{/each}
			</select>
		{:else}
			<input
				bind:this={input}
				{id}
				{type}
				{name}
				on:input={handleInput}
				on:input
				class={cn(
					'w-full',
					{
						'file-input file-input-bordered': type == 'file',
						'input input-bordered': type != 'file',
						'max-w-xs': !block
					},
					inputClass
				)}
				{...$$restProps}
			/>
		{/if}

		{#if labelButton}
			<Button class="absolute top-0 right-0 rounded-l-none" primary on:click>{labelButton}</Button>
		{/if}
	</div>
	{#if altLabel || $$slots.altLabel}
		<label class="label">
			<span class="label-text-alt">
				<slot name="altLabel">
					{altLabel}
				</slot>
			</span>
		</label>
	{/if}
</div>
