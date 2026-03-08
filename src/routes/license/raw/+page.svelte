<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>Raw License — HOPL</title>
</svelte:head>

<div class="mb-4 flex items-center justify-between">
  <h1 class="text-xl font-bold text-ctp-text-light dark:text-ctp-text-dark">Raw License Text</h1>
  <a href="/license" class="text-sm text-ctp-blue-light hover:underline dark:text-ctp-blue-dark">
    &larr; Back to formatted view
  </a>
</div>

<pre
  class="overflow-x-auto rounded-xl border-2 border-ctp-surface1-light bg-white p-6 text-sm leading-relaxed text-ctp-text-light shadow-md dark:border-ctp-surface1-dark dark:bg-ctp-mantle-dark dark:text-ctp-text-dark">{data.raw}</pre>
