/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amethyst: '#663399',
        'deep-crimson': '#800020',
        'antique-gold': '#CFB53B',
      },
      fontFamily: {
        cinzel: ['Cinzel Decorative', 'cursive'],
      },
      backgroundColor: {
        'ancient-dark': '#2c1810',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};