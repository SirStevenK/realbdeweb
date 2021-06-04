const boxShadow = require("./styles/boxShadow.json");
const colors = require("./styles/colors.json");
const fontFamily = require("./styles/fontFamily.json");
const fontSize = require("./styles/fontSize.json");
const fontWeight = require("./styles/fontWeight.json");

module.exports = {
  mode: "jit",
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    boxShadow,
    colors,
    fontFamily,
    fontSize,
    fontWeight,
    extend: {
      animation: {
        fadein: "fadein 1s ease-in-out",
      },
      keyframes: {
        fadein: {
          "0%": { display: "none", opacity: "0" },
          "1%": { display: "block", opacity: "0" },
          "100%": { display: "block", opacity: "1" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
