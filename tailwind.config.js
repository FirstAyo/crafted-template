/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: { center: true, padding: { DEFAULT: "1rem", lg: "2rem", "2xl": "3rem" } },
      colors: { brand: { DEFAULT: "#4f46e5", dark: "#4338ca" } }
    },
  },
  plugins: [],
};
