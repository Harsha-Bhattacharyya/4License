# HOPL — Human Only Public License

> **Because GNU won't save you.**
> Built for cases GNU licenses were never designed to solve.

A copyleft free software license combining software freedom with user rights and sustainable development, while ensuring no AI training. The HOPL permits redistribution, modification, and derivative works while encouraging responsible use and community contribution.

---

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **Ruby** >= 3.0
- **Jekyll** >= 4.0

### Install

```bash
# Install Node dependencies
npm install

# Install Jekyll (if not already installed)
gem install jekyll webrick
```

### Development

```bash
# Build assets in dev mode
npm run webpack:dev

# Serve the site locally with live reload
npm run serve

# Or build everything for production
npm run build
```

The site will be available at `http://localhost:4000`.

### All Commands

| Command                 | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `npm run build`         | Full production build (Webpack + Jekyll)          |
| `npm run webpack:dev`   | Webpack development build with sourcemaps         |
| `npm run webpack:prod`  | Webpack production build (minified, hashed)       |
| `npm run serve`         | Build assets and serve site locally               |
| `npm run dev`           | Webpack watch mode for development                |
| `npm run lint`          | Run ESLint + Stylelint                            |
| `npm run lint:fix`      | Auto-fix lint issues                              |
| `npm run format`        | Format files with Prettier                        |
| `npm run format:check`  | Check formatting (CI-friendly)                    |
| `npm run license:build` | Generate license exports (.md, .adoc, .tex, .b64) |
| `npm run license:check` | Verify generated license files are not stale      |
| `npm run analyze`       | Webpack bundle analysis report                    |

---

## Architecture

```
Jekyll (static site generator)
  +-- Webpack (asset pipeline)
  |     +-- Tailwind CSS (utility-first styling)
  |     +-- PostCSS + Autoprefixer
  |     +-- Alpine.js (lightweight interactivity)
  +-- _layouts/, _includes/ (templates)
  +-- _data/ (manifest.json for asset hashing, toc.json)
```

### How It Works

1. **Webpack** compiles `src/main.js` (Alpine.js + theme logic) and `src/styles.css` (Tailwind) into hashed production bundles in `assets/dist/`.
2. A **ManifestPlugin** writes `_data/manifest.json` mapping entry names to hashed filenames.
3. **Jekyll** reads the manifest and injects correct asset paths into HTML templates via `{{ site.data.manifest.main_css }}` and `{{ site.data.manifest.main_js }}`.
4. The license page (`license.html`) and table of contents (`_data/toc.json`) are generated from `LICENSE.en-US` by `scripts/build-license-page.js` during the prebuild step.

---

## Theming — Catppuccin

Two themes are available, mapped to [Catppuccin](https://catppuccin.com/) palettes:

| Mode  | Palette              | Activation                                |
| ----- | -------------------- | ----------------------------------------- |
| Light | Catppuccin **Latte** | Default, or `prefers-color-scheme: light` |
| Dark  | Catppuccin **Mocha** | Toggle, or `prefers-color-scheme: dark`   |

### Behavior

- On first visit, the theme matches the user's OS preference (`prefers-color-scheme`).
- A toggle button in the header switches between light and dark.
- The preference is saved in `localStorage` and restored on subsequent visits.
- A tiny inline `<script>` in `<head>` applies the saved theme **before** the page renders, preventing any flash of incorrect theme (FOIT).
- All color tokens are defined in `tailwind.config.js` under `colors.latte` and `colors.mocha`.

---

## Icon System — Lucide

All icons use **inline SVGs** from the [Lucide](https://lucide.dev/) icon set:

- No emoji anywhere in UI copy, buttons, alerts, badges, or headings.
- Icons include `aria-hidden="true"` for decorative use.
- Semantic icons have proper `aria-label` on their parent interactive elements.
- Consistent sizing (16/18/20/24 px) matching the design scale.
- Icons inherit `currentColor` for seamless Catppuccin theme integration.

Since icons are inlined directly in HTML, there is no runtime icon library or additional JS bundle cost.

---

## License Conversion

The canonical license source is `LICENSE.en-US`. From it, four export formats are generated into the `generated/` directory:

| Format   | File                 | Notes                                                |
| -------- | -------------------- | ---------------------------------------------------- |
| Markdown | `License.en_US.md`   | Section headings as `##`/`###`                       |
| AsciiDoc | `License.en_US.adoc` | Section headings as `==`/`===`                       |
| LaTeX    | `License.en_US.tex`  | Proper escaping of `&`, `%`, `$`, `#`, `_`, `{`, `}` |
| Base64   | `License.en_US.b64`  | Encodes the raw `LICENSE.en-US` bytes                |

### Commands

```bash
# Generate all formats
npm run license:build

# Check that generated files match current LICENSE.en-US (CI drift check)
npm run license:check
```

Output is **deterministic**: the same input always produces the same output, making it safe for CI verification.

---

## Performance

### Build Optimizations

- **Minification**: JS via Terser, CSS via cssnano (through CssMinimizerPlugin).
- **Tree-shaking**: Webpack eliminates unused code. Alpine.js has a minimal footprint (~15 KB min+gzip).
- **Content hashing**: Production filenames include `[contenthash:8]` for long-term CDN caching.
- **Sourcemaps**: Generated in development only; excluded from production builds.
- **Dead code elimination**: `drop_console` in production Terser config.

### Rendering

- **No theme flash**: Inline script in `<head>` reads `localStorage` and applies `dark` class synchronously before first paint.
- **Deferred scripts**: Main JS bundle uses the `defer` attribute.
- **System fonts**: No web font downloads; uses the native system font stack for fastest rendering.
- **Stable layout**: Fixed typography sizing, reserved space for interactive elements, no layout shift triggers.

### Caching and Compression Guidance

For production hosting (Netlify, Cloudflare Pages, nginx, etc.):

- **Static assets** (`assets/dist/*.js`, `assets/dist/*.css`): Set `Cache-Control: public, max-age=31536000, immutable` since filenames include content hashes.
- **HTML pages**: Set `Cache-Control: public, max-age=300` or use `stale-while-revalidate`.
- **Compression**: Enable gzip or Brotli at the CDN/server level. All generated assets are text-based and compress well (typically 60-80% size reduction).

### Bundle Analysis

```bash
npm run analyze
```

Opens an interactive treemap of the production bundle for identifying optimization opportunities.

---

## Linting and Formatting

Strict checks are enforced across the codebase:

| Tool      | Scope                     | Config              |
| --------- | ------------------------- | ------------------- |
| ESLint    | JS files                  | `.eslintrc.json`    |
| Stylelint | CSS files                 | `.stylelintrc.json` |
| Prettier  | JSON, YAML, Markdown, CSS | `.prettierrc.json`  |

### Rules

- `no-var`, `prefer-const`, `eqeqeq`, `curly` enforced in ESLint.
- Tailwind `@apply`, `@tailwind`, `@layer` directives allowed in Stylelint.
- Prettier enforces consistent formatting with semicolons, double quotes, and trailing commas.

CI fails on any lint or format violation.

---

## CI / GitHub Actions

The workflow (`.github/workflows/ci.yml`) runs on every PR and push to `main`:

1. Install dependencies with lockfile (`npm ci`)
2. Run lint + format check
3. Run `license:check` (drift detection)
4. Run full production build

Fails fast and clearly on any step.

---

## Contributing

1. Fork and clone the repository.
2. Install dependencies: `npm install`
3. Make your changes.
4. Ensure all checks pass:
   ```bash
   npm run lint
   npm run format:check
   npm run license:check
   npm run build
   ```
5. Submit a pull request.

All contributions must pass lint, format, and build checks. Generated files in `generated/` must not be manually edited — run `npm run license:build` to regenerate them.

---

## License

Copyright (c) 2026 Harsha Bhattacharyya. Licensed under the [Human Only Public License (HOPL)](LICENSE.en-US).
