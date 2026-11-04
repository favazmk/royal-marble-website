# Graph Report - Royal-marbles  (2026-11-04)

## Corpus Check
- 53 files · ~3,961,615 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 406 file(s) not represented in the graph (top: .avif 402, (none) 1, .log 1)

## Summary
- 286 nodes · 675 edges · 15 communities (11 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Reveal
- ArrowIcon
- ScrollFilm.tsx
- package.json
- desktop
- compilerOptions
- app/page.tsx
- build-film.mjs
- scripts
- optimize-images.py
- placeholder-film.sh
- postcss.config.mjs
- Royal Marble — hero scroll film: generation brief
- Royal Marble — website

## God Nodes (most connected - your core abstractions)
1. `Reveal()` - 30 edges
2. `ArrowIcon()` - 27 edges
3. `next` - 23 edges
4. `Heading()` - 22 edges
5. `Cta()` - 16 edges
6. `compilerOptions` - 16 edges
7. `react` - 15 edges
8. `PageHero()` - 14 edges
9. `Breadcrumbs()` - 14 edges
10. `SITE` - 14 edges

## Surprising Connections (you probably didn't know these)
- `ContactPage()` --calls--> `Breadcrumbs()`  [EXTRACTED]
  app/contact/page.tsx → components/sections/PageHero.tsx
- `ContactPage()` --calls--> `Heading()`  [EXTRACTED]
  app/contact/page.tsx → components/ui/Heading.tsx
- `ContactPage()` --calls--> `Reveal()`  [EXTRACTED]
  app/contact/page.tsx → components/ui/Reveal.tsx
- `FacadesPage()` --calls--> `FacadeRail()`  [EXTRACTED]
  app/facades/page.tsx → components/sections/FacadeRail.tsx
- `MaterialsPage()` --calls--> `MaterialsStudio()`  [EXTRACTED]
  app/materials/page.tsx → components/sections/MaterialsStudio.tsx

## Import Cycles
- None detected.

## Communities (15 total, 4 thin omitted)

### Community 0 - "Reveal"
Cohesion: 0.16
Nodes (35): AboutPage(), metadata, PEOPLE, VALUES, FacadesPage(), MaterialsPage(), metadata, Home() (+27 more)

### Community 1 - "ArrowIcon"
Cohesion: 0.12
Nodes (25): ContactPage(), metadata, manrope, metadata, outfit, RootLayout(), viewport, dynamic (+17 more)

### Community 2 - "ScrollFilm.tsx"
Cohesion: 0.09
Nodes (30): Chapter, chapterState(), easeOut(), FilmChapters(), FilmChaptersHandle, FilmLoader(), Arrow(), chooseTier() (+22 more)

### Community 3 - "package.json"
Cohesion: 0.06
Nodes (32): eslintConfig, dependencies, gsap, lenis, next, react, react-dom, three (+24 more)

### Community 4 - "desktop"
Cohesion: 0.08
Nodes (24): aspect, frameCount, height, pad, pattern, patternFallback, width, generatedAt (+16 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "app/page.tsx"
Cohesion: 0.13
Nodes (17): FACADE_FAQ, metadata, metadata, FacadeRail(), CATS, CERTIFICATIONS, FACADE_SYSTEMS, FAQ (+9 more)

### Community 7 - "build-film.mjs"
Cohesion: 0.26
Nodes (7): cropBox(), encodeTier(), main(), MANIFEST, parseArgs(), probe(), run

### Community 8 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, dev, film, film:desktop, film:mobile, images, lint (+2 more)

### Community 13 - "Royal Marble — hero scroll film: generation brief"
Cohesion: 0.29
Nodes (6): Beat sheet (both versions, 15 s), Hand-off, Prompt — DESKTOP (16:9), Prompt — MOBILE (9:16), Royal Marble — hero scroll film: generation brief, Tips for the generator

### Community 14 - "Royal Marble — website"
Cohesion: 0.29
Nodes (6): Before launch, Images, Motion, Pages, Royal Marble — website, The hero scroll film

## Knowledge Gaps
- **113 isolated node(s):** `metadata`, `VALUES`, `PEOPLE`, `metadata`, `metadata` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 137 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `ArrowIcon` to `Reveal`, `ScrollFilm.tsx`, `package.json`, `app/page.tsx`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **What connects `metadata`, `VALUES`, `PEOPLE` to the rest of the system?**
  _113 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ArrowIcon` be split into smaller, more focused modules?**
  _Cohesion score 0.11614401858304298 - nodes in this community are weakly interconnected._
- **Why does `react` connect `ScrollFilm.tsx` to `Reveal`, `ArrowIcon`, `package.json`, `app/page.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `ScrollFilm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09390243902439024 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `desktop` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._