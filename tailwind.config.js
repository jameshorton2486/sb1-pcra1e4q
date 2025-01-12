/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#1a365d',
          800: '#2c5282',
          700: '#2b6cb0',
        }
      }
    },
  },
  plugins: [],
};