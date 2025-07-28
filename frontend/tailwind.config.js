/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],

	daisyui: {
		themes: [
			{
				"yapbox-light": {
					"primary": "#7B79FF",
					"primary-content": "#e5e7eb",
                    "base-100": "#ffffff",
					"neutral": "#E9E7FF",
					"success": "#36d399",
					"warning": "#fbbd23",
					"error": "#f87272",
				}
			},
			{
				"yapbox-dark": {
					"primary": "#7B79FF",
					"primary-content": "#3d4451",
					"base-100": "#1d232a",
					"success": "#36d399",
					"warning": "#fbbd23",
					"error": "#f87272",
				},
			},
			"light",
			"dark",
			"cupcake",
			"bumblebee",
			"emerald",
			"corporate",
			"synthwave",
			"retro",
			"cyberpunk",
			"valentine",
			"halloween",
			"garden",
			"forest",
			"aqua",
			"lofi",
			"pastel",
			"fantasy",
			"wireframe",
			"black",
			"luxury",
			"dracula",
			"cmyk",
			"autumn",
			"business",
			"acid",
			"lemonade",
			"night",
			"coffee",
			"winter",
		],
	},
};