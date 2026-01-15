/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1670AB",
        secondary: "#2B9EC5",
        tertiary: "#EE6D06",
        colorfont: "#391713"
      },
      fontFamily:{
        poppins: ["Poppins_400Regular"],
        calibri: ['Calibri', 'sans-serif'],
        league: ["LeagueSpartan_700Bold"]
      }
    },
  },
  plugins: [],
}