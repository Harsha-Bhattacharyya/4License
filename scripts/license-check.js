/**
 * License drift check.
 * Regenerates license artifacts in memory and compares against
 * the committed generated/ directory. Exits non-zero if stale.
 *
 * Usage: node scripts/license-check.js
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.resolve(__dirname, "..");
const GEN_DIR = path.join(ROOT, "generated");
const FILES = [
  "License.en_US.md",
  "License.en_US.adoc",
  "License.en_US.tex",
  "License.en_US.b64",
];

function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hopl-license-check-"));
  const tmpGenDir = path.join(tmpDir, "generated");
  fs.mkdirSync(tmpGenDir, { recursive: true });

  // Read and patch the converter to output to temp dir and use absolute ROOT
  const convertScript = path.join(ROOT, "scripts", "license-convert.js");
  let code = fs.readFileSync(convertScript, "utf-8");
  code = code.replace(
    /const ROOT = .+/,
    `const ROOT = ${JSON.stringify(ROOT)};`,
  );
  code = code.replace(
    /const OUT_DIR = .+/,
    `const OUT_DIR = ${JSON.stringify(tmpGenDir)};`,
  );
  const tmpScript = path.join(tmpDir, "convert.js");
  fs.writeFileSync(tmpScript, code);
  execFileSync(process.execPath, [tmpScript], { stdio: "pipe" });

  let stale = false;
  for (const file of FILES) {
    const expected = path.join(tmpGenDir, file);
    const actual = path.join(GEN_DIR, file);

    if (!fs.existsSync(actual)) {
      console.error(`MISSING: ${file} not found in generated/`);
      stale = true;
      continue;
    }

    const expectedContent = fs.readFileSync(expected, "utf-8");
    const actualContent = fs.readFileSync(actual, "utf-8");

    if (expectedContent !== actualContent) {
      console.error(`STALE: ${file} differs from expected output`);
      stale = true;
    } else {
      console.log(`OK: ${file}`);
    }
  }

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });

  if (stale) {
    console.error(
      "\nGenerated license files are stale. Run: npm run license:build",
    );
    process.exit(1);
  } else {
    console.log("\nAll generated license files are up to date.");
  }
}

main();
