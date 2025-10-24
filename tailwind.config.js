import { colors } from "./src/styles/colors";
import { FontFamilyPoppins, FontFamilyRoboto } from "./src/styles/fontFamilys";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors,
        FontFamilyPoppins,
        FontFamilyRoboto,
    },
  },
  plugins: [],
}