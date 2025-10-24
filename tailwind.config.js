import { colors } from "./src/styles/colors";
import { FontFamilyPoppins, FontFamilyRoboto } from "./src/styles/fontFamilys";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        roboto: [
          'Roboto_400Regular', 
          'Roboto_500Medium', 
          'Roboto_700Bold',   
        ],
        poppins: [
          'Poppins_400Regular', 
          'Poppins_500Medium', 
          'Poppins_700Bold',   
        ],
      },
    },
  },
  plugins: [],
}