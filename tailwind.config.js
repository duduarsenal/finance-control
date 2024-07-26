/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': 'var(--background)',
        'brand-border': 'var(--border)',
        'brand-hover': 'var(--hover)',
        'brand-text': 'var(--text)',
        'brand-gray-opacity': 'var(--gray-opacity)',
        'brand-white': '#FFF',
        'brand-dark-white': '#CCCCCC',
        'brand-white-gray': '#E1E1E1',
        'brand-dark-gray': '#80808020',
        'brand-gray': '#808080',
        'brand-black': '#0F0F0F',
        'brand-red': '#FF2C2C',
        'brand-green': '#5bb450',
        'colors-red': '#D1001F',
        'colors-yellow': '#ffc300',
        'colors-green': '#89e23b',
        'colors-blue': '#1061ff',
        'colors-purple': '#7542fe',
        'colors-pink': '#ff83b6',
        'colors-bluemarin': '#198e7b',
        'colors-orange': '#fe8f00',
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