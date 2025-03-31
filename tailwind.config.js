/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  // Specify the paths to all of the template files
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  // Include all JS, TS, JSX, and TSX files within the pages directory
    "./components/**/*.{js,ts,jsx,tsx}",  // Include all JS, TS, JSX, and TSX files within the components directory
  ],
  theme: {
    extend: {
      // Extending the default theme with custom colors
      colors: {
        'green': '#088F8F',           // Custom green color
        'greenHover': '#0f766e',      // Hover state for green
        'Lightgreen': '#DDECED',      // Light green color
        'Lightorange': '#e7dbdb',     // Light orange color
        'orangeHover': '#c8adad',     // Hover state for orange
        'bordu': '#90242B',           // Bordo color
        'darkgreen': '#056666',       // Dark green color
      },
      // Custom max-width for extra-large screens
      maxWidth: {
        '8xl': '1920px',             // Defining an 8xl max-width for the project
      },
      // Enabling specific utilities for opacity
      opacity: ["disabled"],         // Enable opacity utilities for disabled elements
      // Enabling specific utilities for cursor
      cursor: ["disabled"],         // Enable cursor utilities for disabled elements
    },
  },
  // Using Tailwind CSS Forms plugin for better form styling
  plugins: [
    require('@tailwindcss/forms'),  // Adds better default styling to form elements
  ],
}
