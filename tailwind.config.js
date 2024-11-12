/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ecf0f1',
        secondary: '#6f1a07',
        action: '#2b2118',
        actionHover: '#ff914d',

      }
    },
  },
  plugins: [],
}

