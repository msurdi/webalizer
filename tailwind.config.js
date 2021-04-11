const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./app/pages/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: colors.purple[900],
      "primary-light": colors.purple[700],
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      error: colors.red[500],
      success: colors.green[500],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
