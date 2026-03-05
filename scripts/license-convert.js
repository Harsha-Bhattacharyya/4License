/**
 * License conversion script.
 * Converts LICENSE.en-US to .md, .adoc, .tex, and .b64 formats.
 *
 * Usage: node scripts/license-convert.js
 *
 * Output is deterministic and UTF-8 safe.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "LICENSE.en-US");
const OUT_DIR = path.join(ROOT, "generated");

const HEADER_NOTICE =
  "This file was auto-generated from LICENSE.en-US. Do not edit manually.\n" +
  "Regenerate with: npm run license:build\n";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readLicense() {
  return fs.readFileSync(SRC, "utf-8");
}

/** Convert plain text license to Markdown. */
function toMarkdown(text) {
  const lines = text.split("\n");
  const out = [];
  const mainRe = /^(\d+)\.\s+([A-Z].+)$/;
  const subRe = /^(\d+\.\d+)\s+(.+)$/;
  const subSubRe = /^(\d+\.\d+\.\d+)\s+(.+)$/;
  let maxMain = 0;

  out.push(`<!-- ${HEADER_NOTICE} -->`);
  out.push("");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();

    if (i === 0 && line.startsWith("Human Only Public License")) {
      out.push(`# ${line}`);
      continue;
    }

    if (/^(PREAMBLE|END OF LICENSE)$/.test(line)) {
      out.push("");
      out.push(`## ${line}`);
      continue;
    }

    const subSubMatch = line.match(subSubRe);
    if (subSubMatch) {
      out.push("");
      out.push(`#### ${line}`);
      continue;
    }

    const mainMatch = line.match(mainRe);
    if (mainMatch && parseInt(mainMatch[1], 10) > maxMain) {
      maxMain = parseInt(mainMatch[1], 10);
      out.push("");
      out.push(`## ${line}`);
      continue;
    }

    const subMatch = line.match(subRe);
    if (subMatch) {
      const parentNum = parseInt(subMatch[1].split(".")[0], 10);
      if (parentNum <= maxMain) {
        out.push("");
        out.push(`### ${line}`);
        continue;
      }
    }

    out.push(line);
  }

  return out.join("\n") + "\n";
}

/** Convert plain text license to AsciiDoc. */
function toAsciidoc(text) {
  const lines = text.split("\n");
  const out = [];
  const mainRe = /^(\d+)\.\s+([A-Z].+)$/;
  const subRe = /^(\d+\.\d+)\s+(.+)$/;
  const subSubRe = /^(\d+\.\d+\.\d+)\s+(.+)$/;
  let maxMain = 0;

  out.push(`// ${HEADER_NOTICE.split("\n").join("\n// ")}`);
  out.push("");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();

    if (i === 0 && line.startsWith("Human Only Public License")) {
      out.push(`= ${line}`);
      continue;
    }

    if (/^(PREAMBLE|END OF LICENSE)$/.test(line)) {
      out.push("");
      out.push(`== ${line}`);
      continue;
    }

    const subSubMatch = line.match(subSubRe);
    if (subSubMatch) {
      out.push("");
      out.push(`==== ${line}`);
      continue;
    }

    const mainMatch = line.match(mainRe);
    if (mainMatch && parseInt(mainMatch[1], 10) > maxMain) {
      maxMain = parseInt(mainMatch[1], 10);
      out.push("");
      out.push(`== ${line}`);
      continue;
    }

    const subMatch = line.match(subRe);
    if (subMatch) {
      const parentNum = parseInt(subMatch[1].split(".")[0], 10);
      if (parentNum <= maxMain) {
        out.push("");
        out.push(`=== ${line}`);
        continue;
      }
    }

    out.push(line);
  }

  return out.join("\n") + "\n";
}

/** Convert plain text license to LaTeX, with proper escaping. */
function toLatex(text) {
  const lines = text.split("\n");
  const out = [];
  const mainRe = /^(\d+)\.\s+([A-Z].+)$/;
  const subRe = /^(\d+\.\d+)\s+(.+)$/;
  const subSubRe = /^(\d+\.\d+\.\d+)\s+(.+)$/;
  let maxMain = 0;

  function esc(str) {
    return str
      .replace(/\\/g, "\\textbackslash{}")
      .replace(/[&%$#_{}]/g, (c) => `\\${c}`)
      .replace(/~/g, "\\textasciitilde{}")
      .replace(/\^/g, "\\textasciicircum{}")
      .replace(/\u201c/g, "``")
      .replace(/\u201d/g, "''")
      .replace(/\u2018/g, "`")
      .replace(/\u2019/g, "'");
  }

  out.push(`% ${HEADER_NOTICE.split("\n").join("\n% ")}`);
  out.push("\\documentclass{article}");
  out.push("\\usepackage[utf8]{inputenc}");
  out.push("\\usepackage[T1]{fontenc}");
  out.push("\\usepackage{geometry}");
  out.push("\\geometry{a4paper, margin=1in}");
  out.push("\\usepackage{hyperref}");
  out.push("\\begin{document}");
  out.push("");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();

    if (i === 0 && line.startsWith("Human Only Public License")) {
      out.push(`\\title{${esc(line)}}`);
      out.push("\\maketitle");
      continue;
    }

    if (/^(PREAMBLE|END OF LICENSE)$/.test(line)) {
      out.push("");
      out.push(`\\section*{${esc(line)}}`);
      continue;
    }

    const subSubMatch = line.match(subSubRe);
    if (subSubMatch) {
      out.push("");
      out.push(`\\paragraph{${esc(line)}}`);
      continue;
    }

    const mainMatch = line.match(mainRe);
    if (mainMatch && parseInt(mainMatch[1], 10) > maxMain) {
      maxMain = parseInt(mainMatch[1], 10);
      out.push("");
      out.push(`\\section*{${esc(line)}}`);
      continue;
    }

    const subMatch = line.match(subRe);
    if (subMatch) {
      const parentNum = parseInt(subMatch[1].split(".")[0], 10);
      if (parentNum <= maxMain) {
        out.push("");
        out.push(`\\subsection*{${esc(line)}}`);
        continue;
      }
    }

    if (line === "") {
      out.push("");
    } else {
      out.push(esc(line));
    }
  }

  out.push("");
  out.push("\\end{document}");

  return out.join("\n") + "\n";
}

/** Encode the canonical LICENSE.en-US as Base64. */
function toBase64(rawBuffer) {
  return rawBuffer.toString("base64") + "\n";
}

function main() {
  ensureDir(OUT_DIR);
  const text = readLicense();
  const rawBuffer = fs.readFileSync(SRC);

  const outputs = [
    { name: "License.en_US.md", content: toMarkdown(text) },
    { name: "License.en_US.adoc", content: toAsciidoc(text) },
    { name: "License.en_US.tex", content: toLatex(text) },
    { name: "License.en_US.b64", content: toBase64(rawBuffer) },
  ];

  for (const { name, content } of outputs) {
    const outPath = path.join(OUT_DIR, name);
    fs.writeFileSync(outPath, content, "utf-8");
    console.log(`Generated ${outPath}`);
  }
}

main();
