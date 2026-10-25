
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
      },
    },
  },

  plugins: [],
};
