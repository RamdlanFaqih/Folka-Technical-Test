/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      colors: {
        primary : '#EB3F36',
        secondary : '#730C07',
        dark : '#0f172a',
      },
    },
  },
  plugins: [],
}

