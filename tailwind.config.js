/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#FFF',
        'brand-white-gray': '#E1E1E1',
        'brand-black': '#0F0F0F',
        'brand-red': '#FF2C2C',
        'brand-green': '#00FF00'
      }
    },
  },
  plugins: [],
}