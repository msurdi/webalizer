const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./app/pages/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: colors.purple[900],
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
