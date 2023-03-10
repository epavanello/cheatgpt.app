<script lang="ts">
	import { Icons, type IconTypes } from '$lib/icon-types';
	import cn from 'classnames';

	export let name: IconTypes;
	export let size: 'tiny' | 'small' | 'normal' | 'large' = 'normal';
	let classes: string | undefined = undefined;
	export { classes as class };
</script>

<span
	class={cn(
		'material-icons material-symbols-outlined relative',
		{
			'text-xs': size == 'tiny',
			'text-sm': size == 'small',
			'text-lg': size == 'large'
		},
		classes
	)}
>
	{@html `&#x${Icons[name]};`}
</span>
