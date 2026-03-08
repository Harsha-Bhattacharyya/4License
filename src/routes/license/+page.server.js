import { readFileSync } from "fs";
import { resolve } from "path";
import { parseLicense, buildToc } from "$lib/license.js";

export const prerender = true;

export function load() {
  const raw = readFileSync(resolve("LICENSE.en-US"), "utf-8");
  const sections = parseLicense(raw);
  const toc = buildToc(sections);
  return { sections, toc, raw };
}
