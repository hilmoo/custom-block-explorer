/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colorPrimary: "#000000",
      colorInfo: "#000000",
      colorSuccess: "#caffaf",
      colorWarning: "#fce2ae",
      colorError: "#ffa0a2",
      borderRadius: 2,
      wireframe: true,
      fontFamily: "Varela",
      fontFamily: {
        varela: ['"Varela"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
