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
        'brand-gray': '#808080',
        'brand-black': '#0F0F0F',
        'brand-red': '#FF2C2C',
        'brand-green': '#00FF00',
        'colors-red': '#C62D42',
        'colors-yellow': '#FFEE00',
        'colors-green': '#3B8132',
        'colors-blue': '#0077B6',
        'colors-purple': '#8A00C2',
        'colors-pink': '#FE5D9F',
        'colors-white': '#EFEFEF',
        'colors-ciano': '#00FFFF'
      }
    },
  },
  plugins: [],
}