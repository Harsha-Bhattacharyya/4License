/**
 * Generates the license Jekyll page by parsing LICENSE.en-US into sections
 * with anchored headings, TOC data, and copy-to-clipboard support.
 *
 * Usage: node scripts/build-license-page.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LICENSE_PATH = path.join(ROOT, "LICENSE.en-US");
const OUTPUT_PATH = path.join(ROOT, "license.html");
const DATA_DIR = path.join(ROOT, "_data");
const TOC_PATH = path.join(DATA_DIR, "toc.json");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseLicense(text) {
  const lines = text.split("\n");
  const sections = [];
  let currentSection = null;

  // Patterns for section headings
  const topHeadingRe = /^(PREAMBLE|END OF LICENSE)$/;
  const numberedMainRe = /^(\d+)\.\s+([A-Z].+)$/;
  const numberedSubRe = /^(\d+\.\d+)\s+(.+)$/;
  let maxMainSection = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    let heading = null;
    let level = 0;

    const mainMatch = trimmed.match(numberedMainRe);
    const subMatch = trimmed.match(numberedSubRe);

    if (i === 0 && trimmed.startsWith("Human Only Public License")) {
      heading = trimmed;
      level = 1;
    } else if (topHeadingRe.test(trimmed)) {
      heading = trimmed;
      level = 2;
    } else if (mainMatch && parseInt(mainMatch[1], 10) > maxMainSection) {
      maxMainSection = parseInt(mainMatch[1], 10);
      heading = trimmed;
      level = 2;
    } else if (subMatch) {
      const parentNum = parseInt(subMatch[1].split(".")[0], 10);
      if (parentNum <= maxMainSection) {
        heading = trimmed;
        level = 3;
      }
    }

    if (heading) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        heading,
        level,
        slug: slugify(heading),
        lines: [],
      };
    } else if (currentSection) {
      currentSection.lines.push(trimmed);
    } else {
      // Lines before first section (title area)
      if (!currentSection) {
        currentSection = {
          heading: "Header",
          level: 1,
          slug: "header",
          lines: [],
        };
      }
      currentSection.lines.push(trimmed);
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function buildToc(sections) {
  return sections
    .filter((s) => s.level <= 2 && s.heading !== "Header")
    .map((s) => ({
      title: s.heading,
      slug: s.slug,
    }));
}

function buildHtml(sections) {
  let html = "";
  for (const section of sections) {
    const id = section.slug;
    const tag = section.level === 1 ? "h1" : section.level === 2 ? "h2" : "h3";
    const headingClass =
      section.level === 1
        ? "text-2xl font-bold mb-4"
        : section.level === 2
          ? "text-xl font-semibold mb-3"
          : "text-lg font-medium mb-2";

    const bodyText = section.lines.join("\n").trim();

    html += `<section id="${id}" class="license-section mb-8 scroll-mt-20">\n`;
    html += `  <div class="flex items-start gap-2">\n`;
    html += `    <${tag} class="${headingClass} text-latte-text dark:text-mocha-text">\n`;
    html += `      <a href="#${id}" class="hover:text-latte-blue dark:hover:text-mocha-blue">${escapeHtml(section.heading)}</a>\n`;
    html += `    </${tag}>\n`;
    html += `  </div>\n`;

    if (bodyText) {
      html += `  <div class="license-body whitespace-pre-wrap text-sm leading-relaxed text-latte-subtext0 dark:text-mocha-subtext0" x-data="copyable">\n`;
      html += `    <div class="relative">\n`;
      html += `      <button\n`;
      html += `        type="button"\n`;
      html += `        class="no-print absolute right-0 top-0 rounded p-1 text-latte-overlay1 hover:text-latte-text dark:text-mocha-overlay1 dark:hover:text-mocha-text"\n`;
      html += `        aria-label="Copy section text"\n`;
      html += `        @click="copy($el.parentElement.querySelector('.section-text').textContent)"\n`;
      html += `      >\n`;
      html += `        <svg x-show="!copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>\n`;
      html += `        <svg x-show="copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>\n`;
      html += `      </button>\n`;
      html += `      <div class="section-text pr-8">${escapeHtml(bodyText)}</div>\n`;
      html += `    </div>\n`;
      html += `  </div>\n`;
    }

    html += `</section>\n\n`;
  }
  return html;
}

function main() {
  const licenseText = fs.readFileSync(LICENSE_PATH, "utf-8");
  const sections = parseLicense(licenseText);
  const toc = buildToc(sections);
  const contentHtml = buildHtml(sections);

  // Write TOC data
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(TOC_PATH, JSON.stringify(toc, null, 2));

  // Build the license page
  const page = `---
layout: default
title: "License"
description: "Full text of the Human Only Public License (HOPL)"
---

<div class="mx-auto max-w-5xl px-4 py-10" x-data="toc">
  <div class="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">

    <!-- Table of Contents (sticky sidebar) -->
    <aside class="no-print hidden lg:block">
      <nav class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-latte-surface1 bg-latte-mantle p-4 dark:border-mocha-surface1 dark:bg-mocha-mantle" aria-label="Table of contents">
        <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-latte-overlay2 dark:text-mocha-overlay2">Contents</h2>
        <ul class="space-y-1 text-sm">
          {% for item in site.data.toc %}
          <li>
            <a
              href="#{{ item.slug }}"
              class="block rounded px-2 py-1 transition-colors"
              :class="activeId === '{{ item.slug }}'
                ? 'bg-latte-surface0 text-latte-blue dark:bg-mocha-surface0 dark:text-mocha-blue font-medium'
                : 'text-latte-subtext1 hover:text-latte-text dark:text-mocha-subtext1 dark:hover:text-mocha-text'"
            >
              {{ item.title }}
            </a>
          </li>
          {% endfor %}
        </ul>
      </nav>
    </aside>

    <!-- License content -->
    <article class="min-w-0">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-latte-text dark:text-mocha-text">Human Only Public License</h1>
        <a
          href="{{ '/LICENSE.en-US' | relative_url }}"
          download
          class="btn no-print border border-latte-surface2 text-sm text-latte-subtext1 hover:bg-latte-surface0 dark:border-mocha-surface2 dark:text-mocha-subtext1 dark:hover:bg-mocha-surface0"
        >
          <!-- download icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
          Download
        </a>
      </div>

${contentHtml}
    </article>
  </div>
</div>
`;

  fs.writeFileSync(OUTPUT_PATH, page);
  console.log("Generated license.html and _data/toc.json");
}

main();
