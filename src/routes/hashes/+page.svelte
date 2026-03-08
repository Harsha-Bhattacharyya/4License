<script>
  import hashData from "$lib/hashes.json";

  let copied = $state("");

  async function copyHash(text) {
    await navigator.clipboard.writeText(text);
    copied = text;
    setTimeout(() => (copied = ""), 2000);
  }

  const algLabels = {
    md5: { label: "MD5", color: "text-ctp-peach-light dark:text-ctp-peach-dark" },
    sha1: { label: "SHA-1", color: "text-ctp-yellow-light dark:text-ctp-yellow-dark" },
    sha256: { label: "SHA-256", color: "text-ctp-green-light dark:text-ctp-green-dark" },
    sha512: { label: "SHA-512", color: "text-ctp-blue-light dark:text-ctp-blue-dark" },
  };
</script>

<svelte:head>
  <title>Integrity Hashes — HOPL</title>
  <meta name="description" content="MD5, SHA-1, SHA-256, SHA-512 hashes for HOPL license files" />
</svelte:head>

<h1 class="mb-2 text-2xl font-bold text-ctp-mauve-light dark:text-ctp-mauve-dark">
  Integrity Hashes
</h1>
<p class="mb-8 text-sm text-ctp-subtext0-light dark:text-ctp-subtext0-dark">
  Verify the authenticity of HOPL license files with these cryptographic hashes.
</p>

{#each hashData as file}
  <div
    class="mb-6 rounded-xl border-2 border-ctp-surface1-light bg-white p-5 shadow-md dark:border-ctp-surface1-dark dark:bg-ctp-mantle-dark"
  >
    <h2 class="mb-3 text-lg font-bold text-ctp-sapphire-light dark:text-ctp-sapphire-dark">
      {file.name}
    </h2>
    <div class="space-y-2">
      {#each Object.entries(file.hashes) as [algo, hash]}
        <div class="flex items-start gap-3">
          <span class="w-16 shrink-0 text-right text-xs font-bold uppercase {algLabels[algo].color}"
            >{algLabels[algo].label}</span
          >
          <button
            onclick={() => copyHash(hash)}
            class="break-all text-left font-mono text-xs text-ctp-overlay0-light transition hover:text-ctp-text-light dark:text-ctp-overlay0-dark dark:hover:text-ctp-text-dark"
            title="Click to copy"
          >
            {hash}
            {#if copied === hash}
              <span class="ml-2 text-ctp-green-light dark:text-ctp-green-dark">Copied!</span>
            {/if}
          </button>
        </div>
      {/each}
    </div>
  </div>
{/each}
