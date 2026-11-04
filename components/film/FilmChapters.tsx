'use client';

import { useImperativeHandle, useRef, type RefObject } from 'react';

export type Chapter = {
  id: string;
  index: string;
  label: string;
  headline: string;
  body: string;
  /** Phone copy: the same point in one line, so the card never covers the film. */
  short?: string;
  from: number;
  to: number;
};

export type FilmChaptersHandle = { update: (progress: number) => void };

/** Fraction of each chapter's span spent arriving and leaving. */
const EDGE = 0.28;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * Opacity, lift and blur for a chapter at a given progress — a pure function of
 * scroll, so scrolling back, reloading mid-page and resizing all land on the
 * same frame. The card rises out of a soft blur, holds, then drifts up and
 * dissolves as the next one arrives (rack focus, not a cross-fade).
 */
function chapterState(p: number, from: number, to: number) {
  const span = to - from;
  if (span <= 0 || p < from || p > to) return { o: 0, y: 40, b: 8, local: 0, arrive: 0 };
  const local = (p - from) / span;
  const inT = Math.min(1, local / EDGE);
  const outT = to >= 1 ? 1 : Math.min(1, (1 - local) / EDGE);
  const arrive = easeOut(inT);
  if (inT < 1) return { o: arrive, y: 40 * (1 - arrive), b: 8 * (1 - arrive), local, arrive };
  if (outT < 1) { const e = easeOut(outT); return { o: e, y: -36 * (1 - e), b: 6 * (1 - e), local, arrive }; }
  return { o: 1, y: 0, b: 0, local, arrive };
}

export function FilmChapters({
  chapters,
  apiRef,
  low,
}: {
  chapters: Chapter[];
  apiRef: RefObject<FilmChaptersHandle | null>;
  /** Phone layout: cards anchored low, over the calm bottom third of the frame. */
  low: boolean;
}) {
  const cards = useRef<(HTMLElement | null)[]>([]);
  const stations = useRef<(HTMLElement | null)[]>([]);
  const fill = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  // Written straight to the DOM on scroll. Re-rendering this tree per tick
  // would land React work on the same frame as the canvas blit.
  useImperativeHandle(apiRef, () => ({
    update(p: number) {
      chapters.forEach((c, i) => {
        const { o, y, b, local, arrive } = chapterState(p, c.from, c.to);
        const el = cards.current[i];
        if (el) {
          el.style.opacity = String(o);
          el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
          el.style.filter = b > 0.2 ? `blur(${b.toFixed(1)}px)` : 'none';
          el.style.visibility = o <= 0.01 ? 'hidden' : 'visible';
          // Inside the card: the light sweep crosses once per chapter, the gold
          // rule draws in on arrival, and the body trails the headline slightly.
          el.style.setProperty('--shine', local.toFixed(3));
          el.style.setProperty('--arrive', arrive.toFixed(3));
          el.style.setProperty('--trail', `${(y * 0.45).toFixed(1)}px`);
        }
        const st = stations.current[i];
        if (st) st.dataset.on = p >= c.from && p <= c.to ? 'true' : 'false';
      });
      const first = chapters[0]?.from ?? 0;
      const last = chapters[chapters.length - 1]?.to ?? 1;
      const t = Math.min(1, Math.max(0, (p - first) / (last - first)));
      if (fill.current) fill.current.style.transform = `scaleX(${t})`;
      if (rail.current) {
        const show = p > first - 0.03 && p < last + 0.02 ? 1 : 0;
        rail.current.style.opacity = String(show);
      }
    },
  }), [chapters]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      <div className={`u-shell relative flex h-full ${low ? 'items-end pb-20 md:pb-28' : 'items-center'}`}>
        <div className={`relative w-full ${low ? 'max-w-none' : 'max-w-[30rem]'}`}>
          {chapters.map((c, i) => (
            <article
              key={c.id}
              ref={(el) => { cards.current[i] = el; }}
              className={`u-glass-film absolute inset-x-0 rounded-[var(--radius-xl)] p-4 text-[var(--color-paper)] sm:p-6 md:p-8 ${low ? 'bottom-0' : '-translate-y-1/2 top-0'}`}
              style={{ opacity: 0, visibility: 'hidden', willChange: 'transform, opacity, filter' }}
            >
              <div className="flex items-center justify-between">
                <span className="u-label text-[var(--color-gold-2)]">{c.index} — {c.label}</span>
                <span className="u-label tabular-nums text-white/60">{c.index} / {String(chapters.length).padStart(2, '0')}</span>
              </div>
              <span aria-hidden="true" className="mt-3 block h-px origin-left bg-gradient-to-r from-[var(--color-gold-2)] to-transparent md:mt-4" style={{ transform: 'scaleX(var(--arrive, 0))' }} />
              <h2 className="mt-3 text-[clamp(1.5rem,6.4vw,2.9rem)] font-light leading-[1.06] md:mt-4 md:leading-[1.04]">{c.headline}</h2>
              <p className="mt-2 max-w-[26rem] text-[0.88rem] leading-relaxed text-white/90 md:mt-4 md:text-[0.95rem]" style={{ transform: 'translate3d(0, var(--trail, 0px), 0)' }}>
                {c.short ? (
                  <>
                    <span className="sm:hidden">{c.short}</span>
                    <span className="hidden sm:inline">{c.body}</span>
                  </>
                ) : c.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Progress rail: five stations, a hairline that fills with the film. */}
      <div
        ref={rail}
        className="absolute inset-x-0 bottom-8 transition-opacity duration-500"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="u-shell">
          <div className="relative h-px w-full bg-white/20">
            <div ref={fill} className="absolute inset-0 origin-left bg-[var(--color-gold-2)]" style={{ transform: 'scaleX(0)' }} />
          </div>
          <div className="mt-3 hidden justify-between md:flex">
            {chapters.map((c, i) => (
              <span
                key={c.id}
                ref={(el) => { stations.current[i] = el; }}
                data-on="false"
                className="u-label text-white/40 transition-colors duration-300 data-[on=true]:text-[var(--color-gold-2)]"
              >
                {c.index} {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
