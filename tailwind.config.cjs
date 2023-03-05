const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	theme: {
		screens: {
			mobile: { min: '0', max: '640px' },
			...defaultTheme.screens
		},
		extend: {}
	},
	plugins: [require('daisyui')]
};
