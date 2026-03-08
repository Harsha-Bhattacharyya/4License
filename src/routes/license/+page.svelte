<script>
  let { data } = $props();
  let tocOpen = $state(false);
</script>

<svelte:head>
  <title>License — HOPL</title>
  <meta name="description" content="Full text of the Human Only Public License (HOPL)" />
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
  <h1 class="text-2xl font-bold text-ctp-mauve-light dark:text-ctp-mauve-dark">
    Human Only Public License
  </h1>
  <div class="flex gap-3">
    <a
      href="/license/raw"
      class="inline-flex items-center gap-2 rounded-lg border-2 border-ctp-teal-light/40 bg-ctp-teal-light/10 px-4 py-2 text-sm font-semibold text-ctp-teal-light shadow transition hover:bg-ctp-teal-light/20 active:translate-y-px dark:border-ctp-teal-dark/40 dark:bg-ctp-teal-dark/10 dark:text-ctp-teal-dark dark:hover:bg-ctp-teal-dark/20"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg
      >
      Raw
    </a>
    <a
      href="/LICENSE.en-US"
      download
      class="inline-flex items-center gap-2 rounded-lg border-2 border-ctp-surface2-light bg-white px-4 py-2 text-sm font-semibold shadow transition hover:bg-ctp-surface0-light active:translate-y-px dark:border-ctp-surface2-dark dark:bg-ctp-surface0-dark dark:hover:bg-ctp-surface1-dark"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
          points="7 10 12 15 17 10"
        /><line x1="12" x2="12" y1="15" y2="3" /></svg
      >
      Download
    </a>
  </div>
</div>

<!-- Table of contents -->
<details
  class="mb-8 rounded-xl border-2 border-ctp-lavender-light/30 bg-ctp-lavender-light/5 p-4 shadow-sm dark:border-ctp-lavender-dark/30 dark:bg-ctp-lavender-dark/5"
  bind:open={tocOpen}
>
  <summary class="cursor-pointer font-semibold text-ctp-lavender-light dark:text-ctp-lavender-dark"
    >Table of Contents</summary
  >
  <ul class="mt-3 columns-2 space-y-1 text-sm">
    {#each data.toc as item}
      <li>
        <a href="#{item.slug}" class="text-ctp-blue-light hover:underline dark:text-ctp-blue-dark">
          {item.title}
        </a>
      </li>
    {/each}
  </ul>
</details>

<!-- License body -->
<article
  class="rounded-xl border-2 border-ctp-surface1-light bg-white p-6 shadow-md dark:border-ctp-surface1-dark dark:bg-ctp-mantle-dark"
>
  {#each data.sections as section}
    <section id={section.slug} class="mb-6 scroll-mt-20">
      {#if section.level === 1}
        <h2 class="mb-2 text-xl font-bold text-ctp-mauve-light dark:text-ctp-mauve-dark">
          <a href="#{section.slug}" class="hover:underline">{section.heading}</a>
        </h2>
      {:else if section.level === 2}
        <h3 class="mb-2 text-lg font-semibold text-ctp-blue-light dark:text-ctp-blue-dark">
          <a href="#{section.slug}" class="hover:underline">{section.heading}</a>
        </h3>
      {:else}
        <h4 class="mb-2 font-medium text-ctp-teal-light dark:text-ctp-teal-dark">
          <a href="#{section.slug}" class="hover:underline">{section.heading}</a>
        </h4>
      {/if}
      {#if section.body}
        <div
          class="whitespace-pre-wrap pl-4 text-sm leading-relaxed text-ctp-subtext0-light dark:text-ctp-subtext0-dark"
          style="text-indent: 1.5em;"
        >
          {section.body}
        </div>
      {/if}
    </section>
  {/each}
</article>
