/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#fdf8f0',
          100: '#f5e6d0',
          200: '#e8cba0',
          300: '#d4a574',
          400: '#c4884e',
          500: '#a0694a',
          600: '#8b5e3c',
          700: '#6b4423',
          800: '#4a2e18',
          900: '#321e0f',
        },
        terracotta: {
          400: '#e07850',
          500: '#c4623e',
          600: '#a84e30',
        },
        sunflower: {
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
        },
        sky: {
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
        }
      },
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'garden': '12px',
      },
      boxShadow: {
        'garden': '0 4px 14px rgba(22, 101, 52, 0.15)',
        'garden-lg': '0 8px 24px rgba(22, 101, 52, 0.2)',
      }
    },
  },
  plugins: [],
}
