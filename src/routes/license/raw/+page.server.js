import { readFileSync } from "fs";
import { resolve } from "path";

export const prerender = true;

export function load() {
  const raw = readFileSync(resolve("LICENSE.en-US"), "utf-8");
  return { raw };
}
