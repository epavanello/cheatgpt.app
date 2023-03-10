import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const isDark = readable(
	browser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
	function start(set) {
		const listener = (event: MediaQueryListEvent) => {
			set(event.matches);
		};
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);

		return function stop() {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
		};
	}
);
