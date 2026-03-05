import "./styles.css";
import Alpine from "alpinejs";

/* Theme management */
Alpine.store("theme", {
  dark: false,

  init() {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      this.dark = true;
    } else if (stored === "light") {
      this.dark = false;
    } else {
      this.dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    this.apply();
  },

  toggle() {
    this.dark = !this.dark;
    localStorage.setItem("theme", this.dark ? "dark" : "light");
    this.apply();
  },

  apply() {
    if (this.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
});

Alpine.start();
