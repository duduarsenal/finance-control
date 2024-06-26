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
        'brand-dark-white': '#CCCCCC',
        'brand-white-gray': '#E1E1E1',
        'brand-dark-gray': '#80808020',
        'brand-gray': '#808080',
        'brand-black': '#0F0F0F',
        'brand-red': '#FF2C2C',
        'brand-green': '#5bb450',
        'colors-red': '#D1001F',
        'colors-yellow': '#FFDF00',
        'colors-green': '#3B8132',
        'colors-blue': '#0077B6',
        'colors-purple': '#8A00C2',
        'colors-pink': '#FE5D9F',
        'colors-white': '#EFEFEF',
        'colors-ciano': '#00FFFF',
        'notify-red': '#fce4e4',
        'notify-yellow': '#FFFAB5',
        'notify-green': '#C9FFC2',
        'notify-dark-red': '#990000',
        'notify-dark-yellow': '#bf9000',
        'notify-dark-green': '#38761d',
      },
      keyframes: {
        notification: {
          '0%': { width: '100%' },
          '100%': { width: '0px' },
        }
      },
      animation: {
        'notification': 'notification 3s linear'
      }
    },
  },
  plugins: [],
}