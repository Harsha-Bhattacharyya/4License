# HOPL — Human Only Public License

> **HOPL — because GNU won't save you**

Static website for the Human Only Public License, built with SvelteKit, Tailwind CSS, and Catppuccin theming.

## Pages

- **Home** (`/`) — Hero, feature cards, quick links
- **License** (`/license`) — Formatted license with TOC, anchored sections, download
- **Raw** (`/license/raw`) — Plain text license view
- **Hashes** (`/hashes`) — MD5, SHA-1, SHA-256, SHA-512 integrity hashes

## Tech Stack

- **SvelteKit** with `adapter-static` for static site generation
- **Tailwind CSS** with Catppuccin Latte/Mocha theme tokens
- **JetBrains Mono** font (Google Fonts)
- **Lorem Picsum** placeholder logo
- Dark/light theme toggle with `localStorage` persistence

## Commands

```bash
npm run dev            # development server
npm run build          # production build (generates hashes + vite build)
npm run preview        # preview production build
npm run license:build  # regenerate .md/.adoc/.tex/.b64 from LICENSE.en-US
npm run license:check  # deterministic drift check
npm run lint           # eslint + prettier check
npm run format         # auto-format with prettier
```

## License

Copyright (c) 2026 Harsha Bhattacharyya. Licensed under the [Human Only Public License (HOPL)](LICENSE.en-US).
