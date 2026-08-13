/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          light: '#f0f2f5',
          dark: '#111b21',
          green: '#128C7E',
          blue: '#1877F2',
        }
      }
    },
  },
  plugins: [],
}
