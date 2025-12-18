/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#061222',
          'bg-secondary': '#0a1a2e',
        },
        logo: {
          blue: '#34b7ff',
          white: '#ffffff',
        },
        primary: {
          500: '#34b7ff',
          600: '#2aa3e6',
        },
      },
    },
  },
  plugins: [],
}

