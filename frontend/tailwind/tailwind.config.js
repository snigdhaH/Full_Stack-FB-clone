/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-main': '#18191A',
        'dark-second': '#242526',
        'dark-third': '#3A3B3C',
        'dark-txt': '#B8BBBF'
      }
    },
  },
  plugins: [],
}
