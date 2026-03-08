/**
 * License drift check.
 * Regenerates license artifacts in memory and compares against
 * the committed generated/ directory. Exits non-zero if stale.
 *
 * Usage: node scripts/license-check.js
 */
import { execFileSync } from "child_process";
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync, rmSync } from "fs";
import { resolve, join, dirname } from "path";
import { tmpdir } from "os";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const GEN_DIR = join(ROOT, "generated");
const FILES = ["License.en_US.md", "License.en_US.adoc", "License.en_US.tex", "License.en_US.b64"];

function main() {
  const tmpDir = mkdtempSync(join(tmpdir(), "hopl-license-check-"));
  const tmpGenDir = join(tmpDir, "generated");
  mkdirSync(tmpGenDir, { recursive: true });

  const convertScript = join(ROOT, "scripts", "license-convert.js");
  let code = readFileSync(convertScript, "utf-8");
  code = code.replace(/const ROOT = .+/, `const ROOT = ${JSON.stringify(ROOT)};`);
  code = code.replace(/const OUT_DIR = .+/, `const OUT_DIR = ${JSON.stringify(tmpGenDir)};`);
  const tmpScript = join(tmpDir, "convert.mjs");
  writeFileSync(tmpScript, code);
  execFileSync(process.execPath, [tmpScript], { stdio: "pipe" });

  let stale = false;
  for (const file of FILES) {
    const expected = join(tmpGenDir, file);
    const actual = join(GEN_DIR, file);

    if (!existsSync(actual)) {
      console.error(`MISSING: ${file} not found in generated/`);
      stale = true;
      continue;
    }

    const expectedContent = readFileSync(expected, "utf-8");
    const actualContent = readFileSync(actual, "utf-8");

    if (expectedContent !== actualContent) {
      console.error(`STALE: ${file} differs from expected output`);
      stale = true;
    } else {
      console.log(`OK: ${file}`);
    }
  }

  rmSync(tmpDir, { recursive: true, force: true });

  if (stale) {
    console.error("\nGenerated license files are stale. Run: npm run license:build");
    process.exit(1);
  } else {
    console.log("\nAll generated license files are up to date.");
  }
}

main();
