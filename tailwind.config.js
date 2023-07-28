/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
    themes: ["light", "dark", "forest"],
    }
}

