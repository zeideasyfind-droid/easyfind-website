# EasyFind Property Solutions — Project Handoff & Sanity Report

Single-page marketing website for **EasyFind Property Solutions**, a Bangalore-based residential real-estate services firm (rentals, sales, property management, NRI assistance, investment advisory, relocation).

**Built with:** Lovable · TanStack Start v1 (React 19 + Vite 7) · Tailwind CSS v4 · TypeScript strict.

---

## 1. What this project is

A production-ready single-page website that presents EasyFind's services, track record, process, testimonials, and lead-capture forms. No backend, no auth, no database — pure marketing site. All lead forms currently submit client-side and show a "thank you" state (no email/CRM wiring yet — see §6).

## 2. Tech stack

| Layer          | Choice                                                 |
| -------------- | ------------------------------------------------------ |
| Framework      | TanStack Start v1 (file-based routing, SSR-capable)    |
| Build          | Vite 7                                                 |
| UI             | React 19 + Tailwind v4 (`src/styles.css` tokens)       |
| Icons          | `lucide-react`                                         |
| Type-checking  | `tsgo` (strict mode)                                   |
| Runtime target | Cloudflare Workers (via `nodejs_compat`) for SSR       |
| Deploy         | Auto-published from Lovable; also deployable as static |

## 3. Repository layout (only files that matter)

```
src/
  routes/
    __root.tsx        # HTML shell, <head> meta, fonts, favicon, error/404 boundaries
    index.tsx         # THE ENTIRE SITE — every section lives here
  assets/
    easyfind-logo.jpg.asset.json   # Logo (managed asset, referenced via .url)
  styles.css          # Tailwind v4 + brand tokens (navy/gold/surface)
  router.tsx          # Router bootstrap — do not edit
  routeTree.gen.ts    # AUTO-GENERATED — never edit by hand
HANDOFF.md            # This file
AGENTS.md             # Lovable agent conventions (do not remove)
```

## 4. Design system

Brand colors are defined both as CSS variables in `src/styles.css` and as JS constants at the top of `src/routes/index.tsx`:

| Token      | Hex        | Usage                             |
| ---------- | ---------- | --------------------------------- |
| `NAVY`     | `#1A3A5C`  | Headings, nav, hero, footer, CTAs |
| `GOLD`     | `#C9A84C`  | Accents, primary buttons, links   |
| `SURFACE`  | `#F8F9FB`  | Alternating section backgrounds   |
| `TEXT`     | `#1A1A2E`  | Body text                         |
| `MUTED`    | `#6B7280`  | Secondary text                    |
| `BORDER`   | `#E5E7EB`  | Card/input borders                |

**Fonts:** Playfair Display (headings) + Inter (body), loaded via `<link>` in `__root.tsx`.

**Palette is intentionally in sync with the company logo** (navy blue + gold). Do not introduce purple/indigo/gradient-on-white "generic AI" styling.

## 5. Page structure (all in `src/routes/index.tsx`)

Order of sections rendered by `<Index />`:

1. `<Nav />` — Sticky header. Logo left; desktop nav + gold phone CTA right; mobile shows a compact gold "Call" button + hamburger.
2. `<Hero />` — Navy background, headline "Find. Own. Manage. — All Under One Roof.", inline "Talk to Our Expert" quick form.
3. `<TrackRecord />` — 4 stats (Happy Clients, Google Rating, Years, Deals).
4. `<Services />` — 8 service cards with modal detail views.
5. `<HowItWorks />` — 4-step process with connector line.
6. `<WhyUs />` — 6 differentiators.
7. `<Reviews />` — 4 testimonial cards + Google Reviews CTA.
8. `<LeadForm />` — Full requirement form on navy background.
9. `<Contact />` — Address, phone, email, Google Maps embed.
10. `<Footer />` — Logo + quick links + location + copyright.

### The single source of truth for business info

Top of `src/routes/index.tsx`:

```ts
const BUSINESS_CONFIG = {
  phone: "+91 91483 38801",
  email: "zeid.easyfind@gmail.com",
  googleMapsUrl: "https://maps.app.goo.gl/Z211hsPcT1g9ZJ9U8",
  address: "Prestige Atlanta, 1, 80 Feet Rd, Koramangala 8th Block, Bengaluru 560034",
  stats: { clients: "500+", rating: "4.7★", years: "8+", deals: "1000+" },
};
```

Edit this object to update contact info sitewide. Services list = `SERVICES`, testimonials = `REVIEWS`, differentiators = `WHY_US`, nav items = `NAV_LINKS`, all in the same file.

## 6. Known TODOs / open items for the next worker

1. **Lead form submissions go nowhere.** `HeroForm` and `LeadForm` currently just flip a `submitted` boolean. Wire to email (e.g. Resend), a CRM, or Lovable Cloud storage. See `useLeadForm()`.
2. **Google Maps embed uses approximate coordinates.** Replace the `src` on the `<iframe title="EasyFind Property Solutions on Google Maps">` in `<Contact />` with the exact embed URL from Google Maps → Share → Embed a map.
3. **Stats are placeholders** ("500+ / 4.7★ / 8+ / 1000+"). Confirm with the owner before publishing.
4. **Testimonials in `REVIEWS`** are anonymized ("Satisfied Client", "Property Owner, Koramangala", …). Replace with actual Google review snippets + names when available.
5. **SEO polish**: `og:image` is intentionally omitted (Lovable serves a screenshot). Add an absolute HTTPS `og:image` in a leaf route's `head()` — not `__root.tsx` — when a hero cover asset is finalized.
6. **Analytics**: none installed. Add GA4 / Plausible in `__root.tsx` `head()` if desired.
7. **Hard rules from the brief (do not violate):** no WhatsApp button anywhere, no chatbot widget, no cookie popup, no "Powered by" credit in footer, no fabricated stats or reviews.

## 7. Local development

```bash
bun install       # or npm install
bun run dev       # Vite dev server on :8080
bun run build     # Production build (SSR + static assets)
```

`npm run build` output lives in `dist/`. The site can be served as SSR (default on Lovable) or exported as static for Render.com / Netlify / Cloudflare Pages — all sections are pre-renderable since there are no authenticated routes.

## 8. Deployment

- **Primary:** Lovable auto-publishes from the connected GitHub repo on every push.
- **Alternative static host (Render.com Static Site):**
  - Build command: `bun run build`
  - Publish directory: `./dist`
- **Environment variables:** none required today. When form submission is wired up, store any API keys as Lovable secrets — never commit them.

## 9. Repository Sanitary Check & Risks

A full repository sanitary check was performed prior to deployment. Here are the findings:

### ✅ Safe & Clean
- **No Secrets/Keys**: No hardcoded API keys, passwords, tokens, or credentials were found in the source code.
- **No Debug Code**: No `console.log`, `console.warn`, or debug statements remain in the production code.
- **No TODOs in Code**: All TODOs are properly documented in this HANDOFF.md and not hardcoded as `// TODO` comments in the source files.
- **Clean History**: The git history is linear and clean (17 commits).

### ⚠️ Risks & Blockers for External Deployment
1. **Lovable Asset Pipeline**: The logo (`easyfind-logo.jpg`) is currently referenced via `/__l5e/assets-v1/...`. This path relies on Lovable's internal asset delivery network. When deploying to a static host like Render, this path will break unless the image is moved to the `public/` directory and the reference in `src/routes/__root.tsx` is updated.
2. **OG/Twitter Images**: The Open Graph and Twitter meta images in `src/routes/__root.tsx` are currently pointing to a Lovable-specific R2 bucket URL (`https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/...`). This URL may expire or become inaccessible once the project is disconnected from Lovable.
3. **Accidental Artifacts**: The `gws generate-skills` command accidentally generated `skills/` and `docs/` folders within the repo root. These are untracked by git (untracked files) but should be added to `.gitignore` to prevent accidental commits of non-project artifacts.

## 10. GitHub sync

This project is connected via Lovable's two-way GitHub integration to `zeideasyfind-droid/github-repo-lister`. Every accepted change in Lovable pushes to `main` automatically; pushes to `main` from GitHub sync back into Lovable. No manual `git push` is needed from either side.

## 11. Conventions for future edits

- Keep all page content in `src/routes/index.tsx` unless a section grows past ~150 lines — then extract to `src/components/`.
- Never hardcode `text-white` / `bg-black` / hex utility classes in components; use the `NAVY`/`GOLD`/`SURFACE`/`TEXT`/`MUTED`/`BORDER` constants or the semantic Tailwind tokens from `styles.css`.
- Do not edit `src/routeTree.gen.ts` (auto-generated).
- Do not add WhatsApp, chatbot, cookie-consent, or "Powered by Lovable" elements — explicitly excluded by the client.
- When adding new routes, create `src/routes/<name>.tsx` and give each its own `head()` with unique title + description.

---
_Last updated: 2026-07-10._
