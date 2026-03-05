/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./*.html",
    "./src/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        latte: {
          blue: "#1e66f5",
          text: "#4c4f69",
          subtext1: "#5c5f77",
          subtext0: "#6c6f85",
          overlay1: "#8c8fa1",
          surface2: "#acb0be",
          surface1: "#bcc0cc",
          surface0: "#ccd0da",
          base: "#eff1f5",
          mantle: "#e6e9ef",
          crust: "#dce0e8",
        },
        mocha: {
          blue: "#89b4fa",
          text: "#cdd6f4",
          subtext1: "#bac2de",
          subtext0: "#a6adc8",
          overlay1: "#7f849c",
          surface2: "#585b70",
          surface1: "#45475a",
          surface0: "#313244",
          base: "#1e1e2e",
          mantle: "#181825",
          crust: "#11111b",
        },
      },
    },
  },
  plugins: [],
};
