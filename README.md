# MilaKya Landing Page

Standalone marketing site for [MilaKya](https://mila-kya.vercel.app) — separate from the main app, zero CSS conflicts.

## Stack
- Next.js 14 App Router
- TypeScript
- Lucide React (icons)
- No Tailwind — component uses scoped CSS via `<style>` tag

## Setup

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build
```

## Deploy to Vercel

```bash
npx vercel
```

Or connect this repo in [vercel.com/new](https://vercel.com/new) — zero config needed.

## After Play Store launch

In `components/LandingPage.tsx`, change:

```ts
const APP_URL = 'https://mila-kya.vercel.app';
// → replace with your Play Store URL
const APP_URL = 'https://play.google.com/store/apps/details?id=com.milakya.app';
```

That's the only change needed.

## SEO

- Full Open Graph + Twitter card metadata in `app/layout.tsx`
- JSON-LD schema for `MobileApplication` + `WebSite` + `Organization`
- `sitemap.xml` auto-generated at `/sitemap.xml`
- `robots.txt` at `/public/robots.txt`
- After deploying, submit `https://milakya.vercel.app/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)

## Assets needed in `/public`

Copy these from your main app's `/public` folder:
- `og-image.png` (1200×630) — for WhatsApp/LinkedIn/Instagram previews
- `icon-192.png` — favicon fallback
- `favicon.ico`
