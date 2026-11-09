export const colors = {
	brand: {
		DEFAULT: "#42A5F5",
		primary: "#42A5F5",
	},
	orange: "#FF5400",
	red: "#EF5350",
	yellow: "#FFEBA2",
	pink: "#FFC1E9",
	black: "#000000",
	green: "#4CAF50",
	white: "#FFFFFF",
	blue: {
		200: "#6DD5ED",
		400: "#42A5F5",
		900: "#0D47A1",
	},
	gray: {
		100: "#F5F5F5",
		200: "#D6D6D6",
		300: "#D9D9D9",
		400: "#767676",
		500: "#4A4A4A",
	},
} as const;

export type Colors = typeof colors;
