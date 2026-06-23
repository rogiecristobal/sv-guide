# AGENTS.md — Stardew Valley Ultimate Guide

## Project
Single-page Stardew Valley guide site. Long-form scrollable page with expandable sections, vanilla JS + Vite 6.
All game data is static JSON imported as ES modules (not fetch'd at runtime).
Styling via Tailwind CDN (dev) + custom CSS for pixel borders, farm grids, and callout boxes.

## Commands
- `npm run dev` — dev server at localhost:5173
- `npm run build` — produces `dist/` (static, deploy anywhere)
- `npm run preview` — preview production build locally

## Architecture
- **Structure:** Single `index.html` with all sections (hero, nav, early/mid/late game, farm layouts, mechanics, seasonal, NPCs, items, tutorials, checklist)
- **JS:** `src/main.js` generates all dynamic content (farm grids, NPC details, items table, checklists, etc.) from imported JSON data
- **Data:** JSON files in `src/data/` imported statically via Vite's native JSON import. Do NOT use `fetch()` — it will 404 in production.
- **Styles:** Tailwind CDN (utility classes) + inline `<style>` block for custom styling
- **Interactive:** Expandable sections via CSS `max-height` transition; item detail modals via `modal.js`; checklist persistence via `progress-tracker.js`

## Key conventions
- All data must be imported with `import data from '../data/file.json'` — never `fetch()`
- Theme state persists in `localStorage` key `sdv-theme`
- Checklist progress persists in `localStorage` keys prefixed `sdv-progress-`
- All checklists auto-save on change
- Farm grids use character-map arrays (letters mapped to CSS classes)
- Expandable sections use `class="expandable"` with `.expandable.open .expandable-content { max-height: 9999px }`

## Don't
- Don't add frameworks (React, Vue, etc.) — this project is intentionally vanilla JS.
- Don't use `fetch()` for data — all data is imported at build time from `src/data/`.

## Session continuity

At session start, read `session_log/LATEST.md` if it exists to pick up context.
If the user requests a summary at session end, write the current session details
to `session_log/LATEST.md` (overwrite with new summary).

Custom command: `/createsummary` is defined in `opencode.json` — triggers the
agent to review all session changes and update `session_log/LATEST.md`.
