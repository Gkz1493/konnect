# 🎬 KONNECT — India's Film & OTT Script Marketplace

The NDA-first marketplace where writers safely pitch to verified producers and OTT acquisition teams. Built with **Next.js 14 + Tailwind + Framer Motion + Three.js + Supabase**.

![stack](https://img.shields.io/badge/Next.js-14-black) ![stack](https://img.shields.io/badge/Tailwind-3-38BDF8) ![stack](https://img.shields.io/badge/Supabase-ready-3ECF8E) ![stack](https://img.shields.io/badge/Three.js-3D%20hero-6C63FF)

---

## ⚡ Quick Start (Demo Mode — zero config)

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. That's it — with no env vars the app runs in **Demo Mode**: full UI, mock data, in-memory state. Perfect for pitching the product.

### Demo walkthrough (the $10k tour)

1. **Landing** — interactive Three.js 3D hero (drag your mouse), animated 13-stage deal-flow infographic, pricing.
2. **Get Started → Sign up as Writer** → pick writer type → 3-step onboarding → **animated badge reveal**.
3. **Writer app** — dashboard stats, My Pitches, live-scored **DNA Match**, pitch tracker, marketplace, Writers Rooms, **live Battle Room** (real countdown + voting), membership tiers.
4. **+ New Pitch** — the 9-panel pitch creator ending in a digital **NDA signature** with hash + DNA match preview.
5. Sign out → **log in with any email starting with `producer`** (e.g. `producer@studio.com`, any password) → **Producer app**: Tinder-style **DNA Swipe deck** (drag cards!), kanban deal pipeline, talent pool, acquisition preferences.
6. **View Deal Demo** — the full **13-stage NDA-gated deal flow** simulation with dual POV panels, dual-signature ceremonies, a compressed 7-day wait timer, and a confetti greenlight finale.

---

## 🏭 Production Mode (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run **`supabase/schema.sql`** — creates all tables (users, pitches, producers, deals, notifications, rooms, memberships) **with Row-Level-Security policies that enforce the NDA gates at the database level**.
3. Copy `.env.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. `npm run dev` — auth now runs against Supabase (signup/login are already wired; the client auto-switches out of Demo Mode).

### Deploy

```bash
npm run build   # verify production build
```

Push to GitHub → import into **Vercel** → add the two env vars → deploy. Database stays on Supabase Cloud; put Cloudflare in front for script-file CDN if desired.

---

## 🧬 What's implemented

| Area | Detail |
|---|---|
| **Design system** | Full spec token set (`--ink…--t4`, purple/rose gradients, Space Grotesk + DM Sans) as CSS vars **and** Tailwind theme |
| **3D hero** | Three.js torus-knot "story core" + 2,400-particle constellation, mouse parallax, purple/rose/teal lighting |
| **DNA algorithm** | Spec §16.4 formula (genre 40 + budget 25 + language 20 + format 15) in `src/lib/dna → data.js`, used live in both apps |
| **Deal flow** | All 13 stages, POV glow switching (purple writer / pink producer), actor banners, dual-sign NDA-2 & agreement, 7-day timer, confetti |
| **NDA enforcement** | Demo: signature hashes + gated upload labels. Production: RLS policies in `schema.sql` (synopsis readable only when `deal.stage >= 4 AND nda1_hash IS NOT NULL`) |
| **State** | Zustand global store (role, user, pitches, saved scripts, toasts) |
| **Animation** | Framer Motion page/section transitions, swipe-deck physics, badge reveal, battle countdown |

## 📁 Structure

```
konnect/
├── src/
│   ├── app/
│   │   ├── page.jsx          # Landing (3D hero, infographic, pricing)
│   │   ├── auth/             # Login / Signup + role cards
│   │   ├── onboarding/       # Writer type → profile → badge reveal
│   │   ├── writer/           # 8-section writer workspace
│   │   ├── pitch/            # 9-panel pitch creator
│   │   ├── producer/         # 7-section producer studio
│   │   └── deal-demo/        # 13-stage deal simulation
│   ├── components/           # Hero3D, ui kit (toasts, rings, plans…)
│   └── lib/                  # store, mock data + DNA algo, supabase client
├── supabase/schema.sql       # Full production schema + RLS NDA gates
└── .env.example
```

## 🗺️ Production roadmap (spec §16)

Razorpay subscriptions & milestone payments · pdf-lib NDA generation + e-sign (Legality/DocuSign) · Supabase Storage with 15-min signed URLs + watermarking · Google Calendar/Meet API for narrations · Resend/MSG91/FCM notifications · pg_cron 7-day deal expiry (SQL included, commented).

---

**KONNECT** · Confidential · NDA-first, always. 🔒
