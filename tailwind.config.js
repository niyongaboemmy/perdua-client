/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          700: "#39b54a",
          800: "#289a36",
        },
        secondary: {
          500: "#4ec9f6",
          700: "#1874bd",
        },
        accent: {
          700: "#f89120",
        },
      },
      backgroundImage: {
        // "hero-pattern": "url('./assets/HomepageImage2.jpg')",
        "homepage-background": "url('../assets/books.jpg')",
      },
    },
  },
  plugins: [],
};
