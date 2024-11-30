/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002d5d",
        secondary: "#dde2e9",
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
