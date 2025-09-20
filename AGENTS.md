# Repository Guidelines

## Project Structure & Module Organization
The Astro app lives under `src/`. Route files in `src/pages/` map directly to URLs, layouts in `src/layouts/` wrap shared chrome, and reusable view logic sits in `src/components/`. Static styling assets sit in `src/styles/` and `src/assets/`; anything that must be served verbatim belongs in `public/`. Data helpers and integrations reside in `src/utils/` and `src/scripts/`, while `src/content/` contains markdown collections configured through `content.config.ts`.

## Build, Test, and Development Commands
- `npm install` installs dependencies (Astro, GSAP, AWS SDK, linting packages).
- `npm run dev` launches the Astro dev server with live reload.
- `npm run build` generates the production bundle targeting the Vercel server adapter.
- `npm run preview` serves the built output locally to sanity-check deploys.
- `npx eslint . --ext .astro,.ts,.js` runs the repository lint rules defined in `eslint.config.js`.

## Coding Style & Naming Conventions
Use two-space indentation for Astro, TypeScript, and JSON. Favor named exports from utility modules and keep component files in PascalCase (for example `AppGrid.astro`), while helpers remain camelCase (such as `extractSlug.ts`). Run the ESLint command before sending changes; update rules in `eslint.config.js` instead of per-file overrides. Keep CSS modules lean and prefer design tokens from `src/styles/` and `open-props` when available.

## Testing Guidelines
Automated tests are not yet configured. Until Vitest or integration suites are introduced, validate changes by exercising affected routes via `npm run preview` and by checking generated assets (for example S3-backed downloads). When adding new tests, co-locate `*.spec.ts` or `*.test.ts` files beside the code under test so the eventual runner can pick them up.

## Commit & Pull Request Guidelines
Recent history shows terse `wip` commits; please replace those with imperative, descriptive summaries (for example `Add S3 helper for download cards`). Group related changes per commit and include brief context in the body when touching deployment or build settings. Pull requests should link relevant issues, describe test evidence (manual steps or screenshots for UI work), and call out any new environment variables or migrations.

## Environment & Deployment Notes
The project deploys via the Vercel adapter configured in `astro.config.mjs`. Define required AWS S3 credentials (`S3_BUCKET_NAME`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `S3_REGION`) in a local `.env` before running server code. Never commit secrets; use Vercel environment settings for production values and verify redirects still pass after configuration changes.
