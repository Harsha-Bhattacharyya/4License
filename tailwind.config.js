/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ctp: {
          rosewater: { light: "#dc8a78", dark: "#f5e0dc" },
          flamingo: { light: "#dd7878", dark: "#f2cdcd" },
          pink: { light: "#ea76cb", dark: "#f5c2e7" },
          mauve: { light: "#8839ef", dark: "#cba6f7" },
          red: { light: "#d20f39", dark: "#f38ba8" },
          peach: { light: "#fe640b", dark: "#fab387" },
          yellow: { light: "#df8e1d", dark: "#f9e2af" },
          green: { light: "#40a02b", dark: "#a6e3a1" },
          teal: { light: "#179299", dark: "#94e2d5" },
          sky: { light: "#04a5e5", dark: "#89dceb" },
          sapphire: { light: "#209fb5", dark: "#74c7ec" },
          blue: { light: "#1e66f5", dark: "#89b4fa" },
          lavender: { light: "#7287fd", dark: "#b4befe" },
          text: { light: "#4c4f69", dark: "#cdd6f4" },
          subtext0: { light: "#6c6f85", dark: "#a6adc8" },
          overlay0: { light: "#9ca0b0", dark: "#6c7086" },
          surface2: { light: "#acb0be", dark: "#585b70" },
          surface1: { light: "#bcc0cc", dark: "#45475a" },
          surface0: { light: "#ccd0da", dark: "#313244" },
          base: { light: "#eff1f5", dark: "#1e1e2e" },
          mantle: { light: "#e6e9ef", dark: "#181825" },
          crust: { light: "#dce0e8", dark: "#11111b" },
        },
      },
    },
  },
  plugins: [],
};
