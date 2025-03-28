/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#53B175',
        secondary: '#F2F3F2',
        textPrimary: '#181725',
        textSecondary: '#7C7C7C',
        border: '#E2E2E2',
        discount: '#FB7181',
      },
    },
  },
  plugins: [],
};
