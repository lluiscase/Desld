import { colors } from "./src/shared/theme/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors,
			fontFamily: {
				ubuntu: ["Ubuntu_400Regular", "Ubuntu_500Medium", "Ubuntu_700Bold"],
				"ubuntu-regular": ["Ubuntu_400Regular"],
				"ubuntu-medium": ["Ubuntu_500Medium"],
				"ubuntu-bold": ["Ubuntu_700Bold"],
				roboto: ["Roboto_400Regular", "Roboto_500Medium", "Roboto_700Bold"],
				poppins: ["Poppins_400Regular", "Poppins_500Medium", "Poppins_700Bold"],
			},
		},
	},
	plugins: [],
};
