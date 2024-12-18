/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002d5d",
        secondary: "#38577e",
        light: "#8AB4F8",
        dim: "#7E7F80",
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
