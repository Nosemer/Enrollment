/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009857",
        accent: "#16FFB6",
        dark: "#07004D",
        blueish: "#2D82B7",
        cream: "#F3DFBF",
      },
    },
  },
  plugins: [],
}
