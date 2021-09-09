module.exports = {
	purge: {
		content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
		safelist: [],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			boxShadow: {
				inner: "inset 0 1px 4px 1px rgba(0, 0, 0, 0.1)",
			},
			colors: {
				blue: {
					DEFAULT: "#22CDE9",
					dark: "#1899DE",
				},
				black: "#000",
				white: "#fff",
				gray: { DEFAULT: "#707070", dark: "#383838" },
				red: { DEFAULT: "#E93122", dark: "#A70D00" },
				green: { DEFAULT: "#22E96F", dark: "#1DA853" },
			},
			zIndex: {
				'-10': '-10',
			},
			fontFamily: {
				'brand': ['"Days One"', 'sans-serif']
			}
		},
	},
	variants: {
		extend: {
			backgroundColor: ["active"],
			backgroundImage: ["active"],
			textColor: ["active"],
		},
	},
	plugins: [],
};