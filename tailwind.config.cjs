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
		extend: {
			backgroundImage: {
				'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))'
			},
			keyframes: {
				disco: {
					'0%': { transform: 'translateY(-50%) rotate(0deg)' },
					'100%': { transform: 'translateY(-50%) rotate(360deg)' }
				}
			},
			animation: {
				disco: 'disco 1s linear infinite'
			}
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					primary: '#3290EE',
					'primary-focus': '#0f79e3'
				}
			}
		]
	},

	plugins: [require('daisyui')]
};
