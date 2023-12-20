/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html',
    './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
      },
    },
  },
  plugins: [],
}

