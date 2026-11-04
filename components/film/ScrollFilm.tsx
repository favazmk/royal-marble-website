'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useIsClient, useMediaQuery, usePrefersReducedMotion } from '@/lib/use-media-query';
import { useFrameLoader, type FilmManifest, type TierSpec } from './useFrameLoader';
import { FilmChapters, type Chapter, type FilmChaptersHandle } from './FilmChapters';
import { FilmLoader } from './FilmLoader';

type Props = {
  manifest: FilmManifest;
  chapters: Chapter[];
  /** Scroll distance as a multiple of viewport height. Longer = slower film. */
  scrollLength?: number;
};

/** Intro overlay (headline, giant word, glass card) is gone by this progress. */
const INTRO_TO = 0.12;
/**
 * The film settles onto the page ground over its last stretch, so the pin
 * releases into the next section instead of cutting to it.
 */
const SETTLE_FROM = 0.93;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Picks the tier before any frame is requested, so we never load both. */
function chooseTier(manifest: FilmManifest): { key: string; spec: TierSpec } {
  const tiers = manifest.tiers;
  const has = (k: string) => Boolean(tiers[k]);
  const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number };
  const frugal =
    nav.connection?.saveData === true ||
    /^(slow-)?2g$/.test(nav.connection?.effectiveType ?? '') ||
    (nav.deviceMemory ?? 8) <= 2;
  const narrow = window.matchMedia('(max-width: 900px)').matches;
  const key = (frugal || narrow) && has('mobile') ? 'mobile' : has('desktop') ? 'desktop' : Object.keys(tiers)[0];
  return { key, spec: tiers[key] };
}

export function ScrollFilm({ manifest, chapters, scrollLength = 6 }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameRef = useRef(0);
  const chaptersApi = useRef<FilmChaptersHandle | null>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();
  const mounted = useIsClient();
  const narrow = useMediaQuery('(max-width: 900px)');

  const tier = useMemo(
    () => (mounted && !reduced ? chooseTier(manifest) : null),
    // `narrow` re-picks the master when crossing the breakpoint.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mounted, reduced, manifest, narrow],
  );
  const spec = tier?.spec ?? null;
  const { primed, complete, failed, progress: loadProgress, getFrame } = useFrameLoader(spec);

  /** Paint one frame, cropped to cover the canvas. */
  const draw = useMemo(
    () => (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !spec) return;
      const ctx = (ctxRef.current ??= canvas.getContext('2d', { alpha: false }));
      if (!ctx) return;
      ctx.imageSmoothingQuality = 'high';
      const img = getFrame(index);
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.width, ch / img.height);
      const dw = img.width * s;
      const dh = img.height * s;
      // Desktop copy sits left, so a too-wide crop keeps the right of the frame
      // where the subject is; the phone crop stays centred.
      const x = narrow ? (cw - dw) / 2 : (cw - dw) * 0.65;
      ctx.drawImage(img, x, (ch - dh) / 2, dw, dh);
    },
    [getFrame, spec, narrow],
  );

  /** Everything driven by progress other than the frame itself. */
  const applyOverlay = useCallback((p: number) => {
    // Stage opens from an inset rounded card to full bleed over the first 8 %.
    const open = easeInOut(clamp01(p / 0.08));
    const stage = stageRef.current;
    if (stage) {
      const inset = (1 - open) * (window.innerWidth < 768 ? 8 : 14);
      const r = (1 - open) * 28;
      stage.style.clipPath = `inset(${inset.toFixed(1)}px round ${r.toFixed(1)}px)`;
    }

    const t = clamp01(p / INTRO_TO);
    if (introRef.current) {
      introRef.current.style.opacity = String(1 - easeInOut(t));
      introRef.current.style.transform = `translate3d(0, ${(-40 * t).toFixed(1)}px, 0)`;
      introRef.current.style.visibility = t >= 1 ? 'hidden' : 'visible';
    }
    // Giant word: rack focus — sharp at rest, blurs and swells as the film takes over.
    if (megaRef.current) {
      megaRef.current.style.opacity = String(1 - t);
      megaRef.current.style.filter = t > 0.01 ? `blur(${(10 * t).toFixed(1)}px)` : 'none';
      megaRef.current.style.transform = `translate3d(0, ${(30 * t).toFixed(1)}px, 0) scale(${(1 + 0.12 * t).toFixed(3)})`;
    }

    const s = clamp01((p - SETTLE_FROM) / (1 - SETTLE_FROM)) ** 1.5;
    if (settleRef.current) {
      settleRef.current.style.opacity = String(s);
      settleRef.current.style.visibility = s <= 0.001 ? 'hidden' : 'visible';
    }
  }, []);

  // Backing store sized to the element, DPR capped at 1.5 — past that the
  // browser invents pixels the master never had and pays fill-rate for them.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      draw(frameRef.current);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw]);

  useEffect(() => {
    draw(frameRef.current);
  }, [draw, loadProgress]);

  // Layout effect so the pin is reverted before React removes the section —
  // a passive cleanup runs after React has already tripped over .pin-spacer.
  useLayoutEffect(() => {
    if (reduced || !spec) return;
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const lastIndex = spec.frameCount - 1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollLength * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        // This pin is created after the sections below it have mounted their
        // own triggers (it waits for the tier). Refresh it first and re-measure
        // everything, or their start/end positions ignore its spacer.
        refreshPriority: 10,
        onUpdate: (self) => {
          const p = self.progress;
          const filmP = clamp01(p / SETTLE_FROM);
          const next = Math.round(filmP * lastIndex);
          if (next !== frameRef.current) {
            frameRef.current = next;
            draw(next);
          }
          chaptersApi.current?.update(p);
          applyOverlay(p);
        },
        onRefresh: (self) => {
          chaptersApi.current?.update(self.progress);
          applyOverlay(self.progress);
        },
      });
    }, section);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    applyOverlay(0);
    // Lets SmoothScroll restore a mid-page reload now that the pin exists.
    window.dispatchEvent(new Event('rm:pinned'));
    return () => ctx.revert();
  }, [reduced, spec, draw, scrollLength, applyOverlay]);

  const intro = (
    <>
      <div ref={introRef} className="pointer-events-none absolute inset-0 z-[3]">
        {/* Phone: copy sits in the calm bottom third of the vertical master,
            above the giant word. Desktop: top-left, like the reference. */}
        <div className="u-shell relative flex h-full flex-col justify-end pb-[calc(17vw+3.5rem)] md:block md:pb-0 md:pt-36">
          <div className="pointer-events-auto max-w-[24rem] text-[var(--color-paper)]">
            <p className="u-label text-[var(--color-gold-2)]">Marble factory · UAE · Since 2019</p>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-light leading-snug [font-family:var(--font-outfit)]">
              Marble, granite and stone — cut, polished and installed by one team.
            </p>
            <p className="mt-3 text-sm text-white/70">From luxury villas to high-rise facades, across all seven emirates.</p>
            <span className="u-pill u-glass mt-5 text-[var(--color-ink)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" /> ISO 9001 · 14001 · 45001
            </span>
          </div>

          {/* Glass card, bottom right — the reference's consultation card. */}
          <div className="pointer-events-auto absolute bottom-[26%] right-[clamp(16px,3.2vw,44px)] hidden w-[19rem] md:block lg:bottom-[30%]">
            <Link href="/contact" className="group u-glass block rounded-[var(--radius-lg)] p-5 text-[var(--color-ink)]">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.95rem] font-medium leading-snug">
                  Tell us about your project. We&rsquo;ll advise on stone, budget and timeline — free.
                </p>
                <span className="icon-btn shrink-0 !bg-[var(--color-ink)] !text-[var(--color-paper)]" aria-hidden="true">
                  <Arrow />
                </span>
              </div>
              <p className="mt-4 text-xs text-[var(--color-ink-2)]">Request a quotation ↗</p>
            </Link>
          </div>
        </div>
      </div>

      {/* The giant word, set on the baseline like the reference's display type. */}
      <div
        ref={megaRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[0.02em] z-[2] select-none text-center leading-[0.78] text-[var(--color-paper)]"
        style={{ fontFamily: 'var(--font-outfit)', fontWeight: 200, fontSize: 'var(--text-mega)', letterSpacing: '-0.05em', willChange: 'transform, opacity, filter' }}
      >
        marble
      </div>
    </>
  );

  if (reduced) {
    return (
      <section data-theme="dark" className="relative overflow-hidden bg-[var(--color-night)]">
        <h1 className="sr-only">Royal Marble — marble factory, supply and installation in the UAE</h1>
        <div className="relative h-[100svh] w-full">
          <picture>
            <source media="(max-width: 900px)" srcSet="/film/poster-mobile.webp" type="image/webp" />
            <img src="/film/poster-desktop.webp" alt="Opening frame of the Royal Marble film: a marble-clad villa at golden hour." className="absolute inset-0 h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
          {intro}
        </div>
        <div className="u-shell grid gap-6 py-20 md:grid-cols-2 lg:grid-cols-5">
          {chapters.map((c) => (
            <div key={c.id} className="text-[var(--color-paper)]">
              <p className="u-label text-[var(--color-gold-2)]">{c.index} — {c.label}</p>
              <h2 className="mt-3 text-2xl">{c.headline}</h2>
              <p className="mt-2 text-sm text-white/70">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-film
      aria-label="Scroll-controlled film: from marble block to finished space"
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-ground)]"
    >
      <h1 className="sr-only">Royal Marble — marble factory, supply and installation in the UAE</h1>
      <p className="sr-only">
        A continuous drone shot at golden hour: it approaches a Dubai villa clad in travertine and marble, flies in through
        a marble pivot door, rises past a book-matched marble wall and floating staircase, passes the kitchen and ends on
        the pool terrace facing the open sea at sunset.
      </p>

      <div ref={stageRef} className="absolute inset-0 overflow-hidden bg-[var(--color-night)]" style={{ clipPath: 'inset(14px round 28px)' }}>
        {/* Poster under the canvas: it is the LCP image and covers the load. */}
        <picture>
          <source media="(max-width: 900px)" srcSet="/film/poster-mobile.avif" type="image/avif" />
          <source media="(max-width: 900px)" srcSet="/film/poster-mobile.webp" type="image/webp" />
          <source srcSet="/film/poster-desktop.avif" type="image/avif" />
          <img src="/film/poster-desktop.webp" alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover md:object-[65%_50%]" />
        </picture>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full transition-opacity duration-700"
          style={{ opacity: primed ? 1 : 0 }}
        />
        {/* Legibility scrim shaped to where type sits. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: narrow
              ? 'linear-gradient(to bottom, rgb(18 13 11 / .45) 0%, transparent 24%, transparent 46%, rgb(18 13 11 / .55) 70%, rgb(18 13 11 / .85) 100%)'
              : 'linear-gradient(to right, rgb(18 13 11 / .6) 0%, rgb(18 13 11 / .2) 38%, transparent 60%), linear-gradient(to bottom, rgb(18 13 11 / .35) 0%, transparent 22%, transparent 72%, rgb(18 13 11 / .45) 100%)',
          }}
        />

        {intro}
        <FilmChapters chapters={chapters} apiRef={chaptersApi} low={narrow} />

        <div ref={settleRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4] bg-[var(--color-ground)]" style={{ opacity: 0, visibility: 'hidden' }} />

        {/* Loader tracks the priming batch, which is what actually gates the reveal. */}
        {!primed && spec ? <FilmLoader progress={Math.min(1, (loadProgress * spec.frameCount) / 24)} failed={failed} /> : null}
      </div>

      {complete ? null : (
        <span className="sr-only" aria-live="polite">Film loading, {Math.round(loadProgress * 100)} percent</span>
      )}
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
