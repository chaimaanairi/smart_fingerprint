/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'green': '#088F8F',
        'greenHover': '#0f766e',
        'Lightgreen': ' #DDECED',
        'Lightorange': '#e7dbdb',
        'orangeHover': '#c8adad',
        'bordu': '#90242B',
        'darkgreen' : '#056666',
      },
      maxWidth: {
        '8xl': '1920px',
      },
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}