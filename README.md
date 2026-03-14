# Meal Planner AI

Simple Next.js (App Router) starter for the Meal Planner MVP. The project ships with Tailwind CSS, a landing-style homepage, and placeholder UI blocks for future Supabase-powered features.

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

## Environment

Create `.env.local` (not committed) based on `.env.example`:

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Useful scripts

- `npm run lint` – ESLint check.
- `npm run smoke` – серверний смоук-тест (створює тимчасовий план у Supabase через server action).

## Tech stack

- Next.js 15 (App Router)
- TypeScript + Tailwind CSS
- Supabase (REST) через server action
- `tsx` для службових скриптів

Feel free to fork/extend this starter as the real meal plan generator evolves.
