/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mb: "320px",
        sm: "500px",
        md: "726px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
