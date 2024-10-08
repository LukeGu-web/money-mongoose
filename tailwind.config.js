/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        permanentmarker: ['PermanentMarker-Regular'],
      },
      colors: {
        primary: '#03045E',
        primarydark: '#60a5fa',
      },
    },
  },
  plugins: [],
};
