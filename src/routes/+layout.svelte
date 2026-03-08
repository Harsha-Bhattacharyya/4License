<script>
  import "../app.css";

  let { children } = $props();
  let dark = $state(false);

  function toggleTheme() {
    dark = !dark;
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }

  $effect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") dark = true;
    else if (stored === "light") dark = false;
    else dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  });
</script>

<svelte:head>
  <title>HOPL — Human Only Public License</title>
  <meta name="description" content="HOPL — because GNU won't save you" />
</svelte:head>

<div
  class="min-h-screen bg-ctp-base-light text-ctp-text-light dark:bg-ctp-base-dark dark:text-ctp-text-dark"
>
  <!-- Header -->
  <header
    class="border-b-2 border-ctp-lavender-light bg-white shadow-md dark:border-ctp-lavender-dark dark:bg-ctp-mantle-dark"
  >
    <nav class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
      <a href="/" class="flex items-center gap-3">
        <img
          src="https://picsum.photos/seed/hopl/40/40"
          alt="HOPL logo"
          class="h-10 w-10 rounded-lg shadow"
        />
        <span class="text-lg font-bold text-ctp-mauve-light dark:text-ctp-mauve-dark">HOPL</span>
      </a>
      <div class="flex items-center gap-5">
        <a
          href="/"
          class="text-sm font-medium text-ctp-text-light hover:text-ctp-blue-light dark:text-ctp-text-dark dark:hover:text-ctp-blue-dark"
          >Home</a
        >
        <a
          href="/license"
          class="text-sm font-medium text-ctp-text-light hover:text-ctp-blue-light dark:text-ctp-text-dark dark:hover:text-ctp-blue-dark"
          >License</a
        >
        <a
          href="/hashes"
          class="text-sm font-medium text-ctp-text-light hover:text-ctp-blue-light dark:text-ctp-text-dark dark:hover:text-ctp-blue-dark"
          >Hashes</a
        >
        <a
          href="https://github.com/Harsha-Bhattacharyya/HOPL"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-ctp-text-light hover:text-ctp-blue-light dark:text-ctp-text-dark dark:hover:text-ctp-blue-dark"
        >
          <!-- GitHub icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"
            /><path d="M9 18c-4.51 2-5-2-7-2" /></svg
          >
        </a>
        <button
          onclick={toggleTheme}
          class="rounded-lg border-2 border-ctp-surface1-light p-1.5 shadow-sm transition hover:bg-ctp-surface0-light dark:border-ctp-surface1-dark dark:hover:bg-ctp-surface0-dark"
          aria-label="Toggle theme"
        >
          {#if dark}
            <!-- Sun icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
                d="m4.93 4.93 1.41 1.41"
              /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
                d="m6.34 17.66-1.41 1.41"
              /><path d="m19.07 4.93-1.41 1.41" /></svg
            >
          {:else}
            <!-- Moon icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
            >
          {/if}
        </button>
      </div>
    </nav>
  </header>

  <main class="mx-auto max-w-4xl px-6 py-8">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer
    class="mt-12 border-t border-ctp-surface1-light py-6 text-center text-sm text-ctp-subtext0-light dark:border-ctp-surface1-dark dark:text-ctp-subtext0-dark"
  >
    <p>
      Copyright &copy; 2026 Harsha Bhattacharyya. Licensed under the
      <a href="/license" class="text-ctp-blue-light underline dark:text-ctp-blue-dark">HOPL</a>.
    </p>
    <p class="mt-1">
      <a
        href="https://github.com/Harsha-Bhattacharyya/HOPL"
        target="_blank"
        rel="noopener noreferrer"
        class="text-ctp-blue-light hover:underline dark:text-ctp-blue-dark"
      >
        View source on GitHub
      </a>
    </p>
  </footer>
</div>
