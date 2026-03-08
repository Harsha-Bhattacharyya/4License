<script>
  const features = [
    {
      title: "Strong Copyleft",
      desc: "Derivative works must remain open. Source code stays accessible for everyone.",
      color: "text-ctp-blue-light dark:text-ctp-blue-dark",
      bg: "bg-ctp-blue-light/10 dark:bg-ctp-blue-dark/10",
      border: "border-ctp-blue-light/30 dark:border-ctp-blue-dark/30",
      icon: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2|m-4 9 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z|m-14 0 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z|M7 21h10|M12 3v18",
    },
    {
      title: "AI Training Prohibition",
      desc: "Explicit prohibition of using licensed code for AI/ML training or datasets.",
      color: "text-ctp-red-light dark:text-ctp-red-dark",
      bg: "bg-ctp-red-light/10 dark:bg-ctp-red-dark/10",
      border: "border-ctp-red-light/30 dark:border-ctp-red-dark/30",
      icon: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    },
    {
      title: "Self-Hosting Mandate",
      desc: "Software must remain self-hostable. No vendor lock-in, no forced cloud dependency.",
      color: "text-ctp-green-light dark:text-ctp-green-dark",
      bg: "bg-ctp-green-light/10 dark:bg-ctp-green-dark/10",
      border: "border-ctp-green-light/30 dark:border-ctp-green-dark/30",
      icon: "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14|M16 8c4 0 6-2 6-6-4 0-6 2-6 6|M17.41 3.6a10 10 0 1 0 3 3",
    },
    {
      title: "User Sovereignty",
      desc: "Perpetual access, data portability, and user rights that cannot be revoked.",
      color: "text-ctp-mauve-light dark:text-ctp-mauve-dark",
      bg: "bg-ctp-mauve-light/10 dark:bg-ctp-mauve-dark/10",
      border: "border-ctp-mauve-light/30 dark:border-ctp-mauve-dark/30",
      icon: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16|M2 20h20|M12 12h.01",
    },
    {
      title: "Privacy Protections",
      desc: "Strict privacy requirements, anonymous analytics only, full transparency.",
      color: "text-ctp-teal-light dark:text-ctp-teal-dark",
      bg: "bg-ctp-teal-light/10 dark:bg-ctp-teal-dark/10",
      border: "border-ctp-teal-light/30 dark:border-ctp-teal-dark/30",
      icon: "M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    },
    {
      title: "Freemium Protections",
      desc: "Free-tier features must remain free forever. No bait-and-switch.",
      color: "text-ctp-peach-light dark:text-ctp-peach-dark",
      bg: "bg-ctp-peach-light/10 dark:bg-ctp-peach-dark/10",
      border: "border-ctp-peach-light/30 dark:border-ctp-peach-dark/30",
      icon: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    },
  ];
</script>

<svelte:head>
  <title>HOPL — because GNU won't save you</title>
</svelte:head>

<!-- Hero -->
<section class="py-12 text-center">
  <img
    src="https://picsum.photos/seed/hopl-hero/120/120"
    alt="HOPL logo"
    class="mx-auto mb-6 rounded-2xl shadow-lg"
  />
  <h1 class="text-4xl font-bold text-ctp-mauve-light dark:text-ctp-mauve-dark">
    HOPL — because GNU won&rsquo;t save you
  </h1>
  <p class="mt-4 text-lg text-ctp-subtext0-light dark:text-ctp-subtext0-dark">
    Built for cases GNU licenses were never designed to solve.
  </p>
  <div class="mt-8 flex flex-wrap justify-center gap-4">
    <a
      href="/license"
      class="inline-flex items-center gap-2 rounded-lg border-2 border-ctp-blue-light bg-ctp-blue-light px-6 py-3 font-semibold text-white shadow-lg transition active:translate-y-px active:shadow-md dark:border-ctp-blue-dark dark:bg-ctp-blue-dark dark:text-ctp-crust-dark"
    >
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
        ><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path
          d="M14 2v4a2 2 0 0 0 2 2h4"
        /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg
      >
      Read the License
    </a>
    <a
      href="https://github.com/Harsha-Bhattacharyya/HOPL"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 rounded-lg border-2 border-ctp-surface2-light bg-white px-6 py-3 font-semibold shadow-lg transition hover:bg-ctp-surface0-light active:translate-y-px active:shadow-md dark:border-ctp-surface2-dark dark:bg-ctp-surface0-dark dark:hover:bg-ctp-surface1-dark"
    >
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
        ><path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"
        /><path d="M9 18c-4.51 2-5-2-7-2" /></svg
      >
      View on GitHub
    </a>
  </div>
</section>

<hr class="border-ctp-surface1-light dark:border-ctp-surface1-dark" />

<!-- Feature cards -->
<section class="py-10">
  <h2 class="mb-6 text-center text-2xl font-bold text-ctp-text-light dark:text-ctp-text-dark">
    Key Provisions
  </h2>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {#each features as f}
      <div class="rounded-xl border-2 {f.border} {f.bg} p-5 shadow-md transition hover:shadow-lg">
        <svg
          class="mb-3 {f.color}"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {#each f.icon.split("|") as d}
            <path {d} />
          {/each}
        </svg>
        <h3 class="font-bold {f.color}">{f.title}</h3>
        <p class="mt-2 text-sm text-ctp-subtext0-light dark:text-ctp-subtext0-dark">
          {f.desc}
        </p>
      </div>
    {/each}
  </div>
</section>

<!-- Quick links -->
<section class="py-8">
  <div
    class="rounded-xl border-2 border-ctp-lavender-light/30 bg-ctp-lavender-light/5 p-6 text-center dark:border-ctp-lavender-dark/30 dark:bg-ctp-lavender-dark/5"
  >
    <h2 class="mb-3 text-xl font-bold text-ctp-lavender-light dark:text-ctp-lavender-dark">
      Quick Links
    </h2>
    <div class="flex flex-wrap justify-center gap-4 text-sm">
      <a
        href="/license"
        class="text-ctp-blue-light underline hover:no-underline dark:text-ctp-blue-dark"
        >Formatted License</a
      >
      <a
        href="/license/raw"
        class="text-ctp-blue-light underline hover:no-underline dark:text-ctp-blue-dark">Raw Text</a
      >
      <a
        href="/hashes"
        class="text-ctp-blue-light underline hover:no-underline dark:text-ctp-blue-dark"
        >Integrity Hashes</a
      >
      <a
        href="https://github.com/Harsha-Bhattacharyya/HOPL"
        target="_blank"
        rel="noopener noreferrer"
        class="text-ctp-blue-light underline hover:no-underline dark:text-ctp-blue-dark"
        >GitHub Repository</a
      >
      <a
        href="https://github.com/Harsha-Bhattacharyya/HOPL/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="text-ctp-blue-light underline hover:no-underline dark:text-ctp-blue-dark"
        >Report an Issue</a
      >
    </div>
  </div>
</section>
