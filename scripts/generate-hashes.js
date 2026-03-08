/**
 * Generate cryptographic hashes (MD5, SHA1, SHA256, SHA512)
 * for the canonical license file and all generated formats.
 *
 * Output: static/hashes.json (consumed at build time)
 *
 * Usage: node scripts/generate-hashes.js
 */
import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const FILES = [
  { name: "LICENSE.en-US", path: "LICENSE.en-US" },
  { name: "License.en_US.md", path: "generated/License.en_US.md" },
  { name: "License.en_US.adoc", path: "generated/License.en_US.adoc" },
  { name: "License.en_US.tex", path: "generated/License.en_US.tex" },
  { name: "License.en_US.b64", path: "generated/License.en_US.b64" },
];

const ALGORITHMS = ["md5", "sha1", "sha256", "sha512"];

function hashFile(filePath, algo) {
  const buf = readFileSync(filePath);
  return createHash(algo).update(buf).digest("hex");
}

function main() {
  const results = [];

  for (const file of FILES) {
    const fullPath = resolve(ROOT, file.path);
    if (!existsSync(fullPath)) {
      console.warn(`Skipping ${file.name}: file not found`);
      continue;
    }
    const hashes = {};
    for (const algo of ALGORITHMS) {
      hashes[algo] = hashFile(fullPath, algo);
    }
    results.push({ name: file.name, hashes });
  }

  const outDir = resolve(ROOT, "src/lib");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "hashes.json"), JSON.stringify(results, null, 2));
  console.log(`Generated src/lib/hashes.json with ${results.length} file(s)`);
}

main();
