/**
 * Parse LICENSE.en-US into structured sections for rendering.
 * Also provides hash data loading for the hashes page.
 */

const MAIN_RE = /^(\d+)\.\s+([A-Z].+)$/;
const SUB_RE = /^(\d+\.\d+)\s+(.+)$/;
const TOP_RE = /^(PREAMBLE|END OF LICENSE)$/;

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Parse raw license text into sections with headings, levels, and body. */
export function parseLicense(text) {
  const lines = text.split("\n");
  const sections = [];
  let current = null;
  let maxMain = 0;

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trimEnd();
    let heading = null;
    let level = 0;
    const mm = t.match(MAIN_RE);
    const sm = t.match(SUB_RE);

    if (i === 0 && t.startsWith("Human Only Public License")) {
      heading = t;
      level = 1;
    } else if (TOP_RE.test(t)) {
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
      if (current) sections.push(current);
      current = { heading, level, slug: slugify(heading), body: [] };
    } else if (current) {
      current.body.push(t);
    }
  }
  if (current) sections.push(current);

  return sections.map((s) => ({
    ...s,
    body: s.body.join("\n").trim(),
  }));
}

/** Build a table of contents from parsed sections (top 2 levels only). */
export function buildToc(sections) {
  return sections.filter((s) => s.level <= 2).map((s) => ({ title: s.heading, slug: s.slug }));
}
