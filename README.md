# Royal Marble — website

Marketing site for Royal Marble Factory L.L.C (Umm Al Quwain / Dubai).

Next.js 16 (App Router, static export) · TypeScript · Tailwind v4 · GSAP ScrollTrigger · Lenis · three.js.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/ — upload anywhere
```

## Pages

`/` home · `/about` · `/services` · `/materials` · `/facades` · `/projects` · `/contact`

All copy that is data (materials, services, projects, process, FAQ, certifications)
lives in `content/data.ts`. Contact details live in `lib/site.ts`.

## The hero scroll film

The home hero is a canvas frame sequence scrubbed by scroll (same engine as the
MENAARC site): `components/film/`. It runs on the final Gemini masters in
`assets/masters/` (desktop 1280×720, mobile 720×1280; the generator's sparkle
watermark is removed with `--delogo` in the `film:*` scripts). Originals of the
previous placeholder masters are in `assets/masters/previous/`.

To swap the film again (brief and prompts: `docs/hero-video-prompt.md`):

1. Save the clips as `assets/masters/desktop.mp4` (16:9) and `assets/masters/mobile.mp4` (9:16).
2. `npm run film`
3. Re-check the chapter ranges in `content/film-chapters.json` against the new frames.

No code changes needed. Rebuild the placeholder with
`bash scripts/placeholder-film.sh desktop 1920 1080` (or `mobile 1080 1920`).

## Images

- `assets/generated/` — ChatGPT renders (keyframes, stone textures, service photos, `rm-mat-*` stones in use, projects hero, floating stair)
- `assets/client/` — the client's own factory and site photography (Drive shoot, downscaled to 2400px)
- `assets/old-site/` — client photography and facade renders from the previous site
- `python -I scripts/optimize-images.py` writes the WebP versions into `public/img/` and the brand icons.

**Rule: no image or block of copy appears twice across pages.** The home page owns the 3D materials
studio, the services bento renders, the facade rail renders and the recent-work rail; inner pages use
different photography for the same topics. Check after changes by building and grepping `out/*/index.html`
for repeated `<img src>` values.

## Motion

| Section | Technique |
|---|---|
| Hero | Pinned canvas film, inset card opens to full bleed, giant word rack-focus, glass chapter cards |
| Intro | Words light up with scroll, counters, parallax photo |
| Materials | three.js polished slab flips through 5 stones on scroll; stone name sits behind the slab; pointer tilt; swatches jump to a stone |
| Facades | Pinned horizontal rail (desktop), native swipe rail (touch) |
| CTA | Liquid-ink wipe driven by scroll, elastic stretch headline |

Everything is a function of scroll position, so reload / scroll-back states match.
`prefers-reduced-motion` gets static layouts with no pins.

## Before launch

- The old site linked the full pre-qualification PDF. It contains personal data
  (landlord, employee names, licence and lease details), so this site does **not**
  publish it. Supply a cleaned company profile if you want a download.
- Confirm the domain (`lib/site.ts → SITE.url`) and opening hours in `components/layout/JsonLd.tsx`.
- Project photography is the client's own from the previous site; replace with higher
  resolution originals where available.
