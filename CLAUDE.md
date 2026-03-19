# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured yet.

## Architecture

This is a **Next.js 16 App Router** project using TypeScript, Tailwind CSS v4, and Supabase as the backend.

### Key patterns

- **App Router**: All routes live under `src/app/`. Pages are `page.tsx` files; the root layout is `src/app/layout.tsx`.
- **Server Components by default**: Pages like `src/app/cafes/page.tsx` are `async` server components that fetch directly from Supabase at request time — no `useEffect`, no client-side fetching.
- **Supabase client**: A single shared client is exported from `src/app/lib/supabaseClient.ts`. It reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the environment. These env vars must be set (e.g. in `.env.local`) for any Supabase queries to work.
- **Path alias**: `@/` maps to `src/app/` (see `tsconfig.json`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. No `tailwind.config` file — configuration is done in CSS if needed.

### Database

The Supabase `products` table has at minimum these columns: `id`, `name`, `slug`, `origin`, `intensity`, `price_cents` (integer, price stored in cents), `is_featured` (boolean).

Products are navigable via `/cafes/[slug]` — that detail page does not exist yet.
