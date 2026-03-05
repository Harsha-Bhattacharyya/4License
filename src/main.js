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

/* Copy to clipboard */
Alpine.data("copyable", () => ({
  copied: false,

  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch {
      /* Clipboard API may be unavailable */
    }
  },
}));

/* Table of contents active section tracking */
Alpine.data("toc", () => ({
  activeId: "",

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeId = entry.target.id;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    this.$nextTick(() => {
      const headings = document.querySelectorAll(".license-section[id]");
      headings.forEach((h) => observer.observe(h));
    });
  },
}));

Alpine.start();
