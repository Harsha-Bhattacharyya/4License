/**
 * Generates the license Jekyll page by parsing LICENSE.en-US into
 * sections with anchored headings and a TOC data file.
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
  let current = null;
  const mainRe = /^(\d+)\.\s+([A-Z].+)$/;
  const subRe = /^(\d+\.\d+)\s+(.+)$/;
  const topRe = /^(PREAMBLE|END OF LICENSE)$/;
  let maxMain = 0;

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trimEnd();
    let heading = null;
    let level = 0;
    const mm = t.match(mainRe);
    const sm = t.match(subRe);

    if (i === 0 && t.startsWith("Human Only Public License")) {
      heading = t;
      level = 1;
    } else if (topRe.test(t)) {
      heading = t;
      level = 2;
    } else if (mm && parseInt(mm[1], 10) > maxMain) {
      maxMain = parseInt(mm[1], 10);
      heading = t;
      level = 2;
    } else if (sm && parseInt(sm[1].split(".")[0], 10) <= maxMain) {
      heading = t;
      level = 3;
    }

    if (heading) {
      if (current) {
        sections.push(current);
      }
      current = { heading, level, slug: slugify(heading), lines: [] };
    } else if (current) {
      current.lines.push(t);
    } else {
      current = { heading: "Header", level: 1, slug: "header", lines: [] };
      current.lines.push(t);
    }
  }
  if (current) {
    sections.push(current);
  }
  return sections;
}

function buildToc(sections) {
  return sections
    .filter((s) => s.level <= 2 && s.heading !== "Header")
    .map((s) => ({ title: s.heading, slug: s.slug }));
}

function buildHtml(sections) {
  let html = "";
  for (const s of sections) {
    const tag = s.level === 1 ? "h2" : s.level === 2 ? "h3" : "h4";
    const cls =
      s.level <= 2
        ? "font-semibold text-latte-text dark:text-mocha-text"
        : "font-medium text-latte-subtext1 dark:text-mocha-subtext1";
    const body = s.lines.join("\n").trim();

    html += `<section id="${s.slug}" class="license-section mb-6 scroll-mt-16">\n`;
    html += `<${tag} class="${cls}"><a href="#${s.slug}">${escapeHtml(s.heading)}</a></${tag}>\n`;
    if (body) {
      html += `<div class="license-body whitespace-pre-wrap text-latte-subtext0 dark:text-mocha-subtext0">${escapeHtml(body)}</div>\n`;
    }
    html += `</section>\n`;
  }
  return html;
}

function main() {
  const text = fs.readFileSync(LICENSE_PATH, "utf-8");
  const sections = parseLicense(text);
  const toc = buildToc(sections);
  const content = buildHtml(sections);

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(TOC_PATH, JSON.stringify(toc, null, 2));

  const page = `---
layout: default
title: "License"
description: "Full text of the Human Only Public License (HOPL)"
---

<div class="mx-auto max-w-3xl px-6 py-10">
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-2xl font-bold text-latte-text dark:text-mocha-text">Human Only Public License</h1>
    <a href="{{ '/LICENSE.en-US' | relative_url }}" download class="btn btn-secondary no-print text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      Download
    </a>
  </div>

  <!-- Table of contents -->
  <details class="no-print mb-8 rounded-lg border border-latte-surface1 bg-white p-4 shadow-sm dark:border-mocha-surface1 dark:bg-mocha-mantle">
    <summary class="cursor-pointer text-sm font-semibold text-latte-text dark:text-mocha-text">Table of Contents</summary>
    <ul class="mt-3 space-y-1 text-sm">
      {% for item in site.data.toc %}
      <li><a href="#{{ item.slug }}" class="text-latte-blue hover:underline dark:text-mocha-blue">{{ item.title }}</a></li>
      {% endfor %}
    </ul>
  </details>

  <article class="border-l-4 border-latte-surface1 pl-4 dark:border-mocha-surface1">
${content}
  </article>
</div>
`;

  fs.writeFileSync(OUTPUT_PATH, page);
  console.log("Generated license.html and _data/toc.json");
}

main();
