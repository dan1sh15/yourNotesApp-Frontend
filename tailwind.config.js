/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#E6E3FF', 
      },
      screens: {
        phone: "450px",
        smallPhone: "300px",
        tablet: "900px",
      }
    },
  },
  plugins: [],
}

