/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#6181F7",
        "grey-dark": "#232931 ",
        "grey-base": "#232931",
        "grey-light": "#B1B1B1",
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
        "moul": ["Moul", "serif"],
      }
    },
  },
  plugins: [],
}