/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'],
      },
      colors: {
        primary: '#343A40',
        secondary: '#307BFE',
      },
    },
  },
  extend: {},
  plugins: [],
};
