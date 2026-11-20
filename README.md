# Gabriel Reis — AI Solutions & Automation Engineer Portfolio

Static, editorial engineering portfolio built for international recruiters, engineering managers, and clients—showcasing AI-powered solutions, business automations, API integrations, data analytics, and end-to-end digital products.

## Stack

- **Framework:** React 19 + TypeScript (strict mode) + Vite
- **Motion:** GSAP 3 + ScrollTrigger (`@gsap/react` with `useGSAP` and `prefers-reduced-motion` support)
- **Styling:** CSS Modules + CSS Custom Properties design tokens (`#0B0D0C`, `#171B18`, `#F4F5F2`, `#C8FF3D`)
- **Typography:** Self-hosted variable fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`) via `@fontsource-variable/*`
- **Icons:** Lucide React
- **Testing:** Vitest (data integrity & filtering checks)
- **Hosting:** Static build configured for Vercel (`vercel.json`)

## Featured Flagship Case Studies

1. **ZION — Maintenance Management Platform** · Multi-tenant operational SaaS (`React 19`, `TypeScript`, `Supabase`, `PostgreSQL RLS`, `Vitest`, `pgTAP`)
2. **ASCEND — Gamified Habit Tracking** · Streamlined mobile-first habit progression web app (`React`, `TypeScript`, `Supabase`, `Vercel`)
3. **Kalled — Business Automation & Sales Analytics** · Production `n8n` + `Tiny ERP` API pipelines (`45 min → 10 s` reporting), `Power BI / DAX` commercial portal (`300+` accounts), barcode verification (`30 min → 5 min`), and AI-assisted COGS insights
4. **HR Náutica — Production Planning & Control (PCP)** · Offline-first manufacturing system on self-hosted `Supabase / PostgreSQL` via `Docker` *(architecture overview; operational data confidential)*
5. **Codan — Manufacturing Material Management** · 11-type geometric calculation engine & concurrency-safe PostgreSQL RPCs *(architecture overview; operational data confidential)*
6. **PITAGO — Mobile Mathematics Learning App** · Cross-platform `Expo SDK 58` / `React Native` MVP with pure TypeScript math engine & trilingual `PT / EN / ES` i18n

Plus **18 additional verified builds** across AI & Machine Learning, Automation & Data, Systems & Catalogs, and Web & Mobile.

## Local Development

```bash
npm install
npm run dev
```

## Validation & Production Build

```bash
npm run typecheck
npm run test
npm run build
```

## Deployment (Vercel)

1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Keep the auto-detected Vite configuration from `vercel.json` (`npm run build` → `dist`, zero environment variables required).
3. Deploy to preview or production.
