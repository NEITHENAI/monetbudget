/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uganda: {
          black: '#111827',
          yellow: '#f59e0b',
          red: '#ef4444'
        }
      },
      fontFamily: {
        academic: ['"Times New Roman"', 'Times', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
