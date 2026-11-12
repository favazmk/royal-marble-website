# Graph Report - Royal-marbles  (2026-11-12)

## Corpus Check
- 55 files · ~4,661,159 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 358 file(s) not represented in the graph (top: .avif 354, (none) 2, .ico 1)

## Summary
- 301 nodes · 679 edges · 16 communities (11 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `182bc7c7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Reveal
- ArrowIcon
- ScrollFilm.tsx
- package.json
- desktop
- compilerOptions
- app/page.tsx
- build-film.mjs
- optimize-images.py
- placeholder-film.sh
- postcss.config.mjs
- Royal Marble — hero scroll film: generation brief
- Royal Marble — website
- layout.tsx
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `Reveal()` - 34 edges
2. `ArrowIcon()` - 29 edges
3. `next` - 23 edges
4. `Heading()` - 20 edges
5. `react` - 16 edges
6. `compilerOptions` - 16 edges
7. `Cta()` - 14 edges
8. `SITE` - 14 edges
9. `ScrollFilm()` - 13 edges
10. `Home()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `ContactPage()` --calls--> `Breadcrumbs()`  [EXTRACTED]
  app/contact/page.tsx → components/sections/PageHero.tsx
- `ContactPage()` --calls--> `Heading()`  [EXTRACTED]
  app/contact/page.tsx → components/ui/Heading.tsx
- `ContactPage()` --calls--> `Reveal()`  [EXTRACTED]
  app/contact/page.tsx → components/ui/Reveal.tsx
- `RootLayout()` --calls--> `Footer()`  [EXTRACTED]
  app/layout.tsx → components/layout/Footer.tsx
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  app/layout.tsx → components/layout/Header.tsx

## Import Cycles
- None detected.

## Communities (16 total, 5 thin omitted)

### Community 0 - "Reveal"
Cohesion: 0.14
Nodes (37): AboutPage(), FACTORY, metadata, MISSION, PEOPLE, VALUES, FACADE_FAQ, JUMPS (+29 more)

### Community 1 - "ArrowIcon"
Cohesion: 0.12
Nodes (23): ContactPage(), metadata, dynamic, dynamic, Footer(), Header(), Manifesto(), POINTS (+15 more)

### Community 2 - "ScrollFilm.tsx"
Cohesion: 0.10
Nodes (28): Chapter, chapterState(), easeOut(), FilmChapters(), FilmChaptersHandle, FilmLoader(), Arrow(), chooseTier() (+20 more)

### Community 3 - "package.json"
Cohesion: 0.05
Nodes (42): eslintConfig, dependencies, gsap, lenis, next, react, react-dom, three (+34 more)

### Community 4 - "desktop"
Cohesion: 0.07
Nodes (26): aspect, cuts, frameCount, height, pad, pattern, patternFallback, width (+18 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "app/page.tsx"
Cohesion: 0.12
Nodes (18): metadata, FacadeRail(), CATS, STONES, Trust(), CERTIFICATIONS, FACADE_SYSTEMS, FAQ (+10 more)

### Community 7 - "build-film.mjs"
Cohesion: 0.25
Nodes (8): cropBox(), detectCuts(), encodeTier(), main(), MANIFEST, parseArgs(), probe(), run

### Community 13 - "Royal Marble — hero scroll film: generation brief"
Cohesion: 0.29
Nodes (6): Beat sheet (both versions, 15 s), Hand-off, Prompt — DESKTOP (16:9), Prompt — MOBILE (9:16), Royal Marble — hero scroll film: generation brief, Tips for the generator

### Community 14 - "Royal Marble — website"
Cohesion: 0.29
Nodes (6): Before launch, Images, Motion, Pages, Royal Marble — website, The hero scroll film

### Community 15 - "layout.tsx"
Cohesion: 0.18
Nodes (10): manrope, metadata, outfit, RootLayout(), viewport, SiteJsonLd(), SmoothScroll(), PointerSheen() (+2 more)

## Knowledge Gaps
- **122 isolated node(s):** `metadata`, `VALUES`, `MISSION`, `PEOPLE`, `FACTORY` (+117 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 147 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `ArrowIcon` to `Reveal`, `ScrollFilm.tsx`, `package.json`, `app/page.tsx`, `layout.tsx`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **What connects `metadata`, `VALUES`, `MISSION` to the rest of the system?**
  _122 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Reveal` be split into smaller, more focused modules?**
  _Cohesion score 0.13945578231292516 - nodes in this community are weakly interconnected._
- **Why does `react` connect `layout.tsx` to `Reveal`, `ArrowIcon`, `ScrollFilm.tsx`, `package.json`, `app/page.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Should `ArrowIcon` be split into smaller, more focused modules?**
  _Cohesion score 0.12233285917496443 - nodes in this community are weakly interconnected._
- **Should `ScrollFilm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10317460317460317 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._