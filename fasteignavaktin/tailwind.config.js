/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			gridTemplateRows: {
				// Simple 8 row grid
				16: 'repeat(16, minmax(0, 1fr))'
			},
			gridRow: {
				'span-15': 'span 15 / span 15'
			}
		}
	},
	plugins: []
};
