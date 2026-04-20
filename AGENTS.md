# Repository Architecture

This repository contains a Next.js e-commerce storefront in the `store/` directory.

## Structure
- `store/`: Next.js frontend web app.
- `docs/`: General documentation.

## Tech Stack & Conventions (`store/`)
- **Framework:** Next.js 16.2+ (App Router), React 19.2+.
- **Styling:** Tailwind CSS v4. Configured directly in `src/app/globals.css` (there is no `tailwind.config.ts`).
- **Components:** Base UI (`@base-ui/react`), Shadcn UI (v4.3+, `base-nova` style), Framer Motion 12.
- **State:** Zustand v5.
- **Path Aliases:** `@/*` maps to `store/src/*`. 

## Quirks & Notes
- **Next.js/React versions:** This project uses cutting-edge versions (Next 16, React 19). Expect breaking changes from standard training data. Read `node_modules/next/dist/docs/` within `store/` before writing core framework code if unsure.
- **Tailwind v4:** Do not look for or try to create a `tailwind.config.js`. It uses the new `@tailwindcss/postcss` setup.
- **UI Components:** Shadcn UI is configured to use the `base-nova` style and `lucide-react` icons. Use `npx shadcn@latest add` from within the `store/` directory to add components.

## Developer Commands
All commands should be run from within the `store/` directory:
- **Dev Server:** `npm run dev`
- **Linting:** `npm run lint`
- **Build:** `npm run build`
