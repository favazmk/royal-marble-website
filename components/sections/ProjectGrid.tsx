'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { PROJECTS, type ProjectCategory } from '@/content/data';

const CATS: ('All' | ProjectCategory)[] = ['All', 'High-rise', 'Residential', 'Hospitality', 'Commercial', 'Public'];

/** Filterable project grid with a keyboard-accessible lightbox. */
export function ProjectGrid() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const [open, setOpen] = useState<number | null>(null);
  const grid = useRef<HTMLUListElement>(null);
  const list = cat === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  // Re-flow animation when the filter changes.
  useEffect(() => {
    if (!grid.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(grid.current.children, { opacity: 0, y: 24, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.04, overwrite: true });
  }, [cat]);

  // Deep links from the home page (/projects#id) open that project.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const i = PROJECTS.findIndex((p) => p.id === id);
    if (i < 0) return;
    const t = setTimeout(() => setOpen(i), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % PROJECTS.length));
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + PROJECTS.length) % PROJECTS.length));
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [open]);

  const cur = open === null ? null : PROJECTS[open];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Filter projects">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`u-pill border transition-colors ${cat === c ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white' : 'border-[var(--color-line)] hover:bg-white'}`}
          >
            {c}
            <span className="tabular-nums opacity-60">{c === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>

      <ul ref={grid} className="mt-10 grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const index = PROJECTS.indexOf(p);
          return (
            <li key={p.id} id={p.id} className="scroll-mt-28">
              <button type="button" onClick={() => setOpen(index)} className="group block w-full text-left" aria-label={`Open ${p.name}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-card)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`${p.name}, ${p.location} — ${p.scope}`} className="zoom-img absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <span className="u-pill u-glass absolute left-3 top-3 !text-[0.68rem]">{p.category}</span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[1.3rem] leading-tight">{p.name}</h2>
                    <p className="text-sm text-[var(--color-ink-2)]">{p.location} · {p.scope}</p>
                  </div>
                  <span className="mt-1 text-xl text-[var(--color-ink-3)] transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">+</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {cur ? (
        <div role="dialog" aria-modal="true" aria-label={cur.name} className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-night)]/92 p-4 backdrop-blur-md" onClick={() => setOpen(null)}>
          <figure className="relative max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cur.image} alt={`${cur.name}, ${cur.location}`} className="mx-auto max-h-[78svh] w-auto rounded-[var(--radius-lg)] object-contain" />
            <figcaption className="mt-4 flex flex-wrap items-end justify-between gap-4 text-[var(--color-paper)]">
              <div>
                <p className="u-label text-[var(--color-gold-2)]">{cur.category}</p>
                <p className="mt-1 text-2xl font-light [font-family:var(--font-outfit)]">{cur.name}</p>
                <p className="text-sm text-white/60">{cur.location} · {cur.scope}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="icon-btn" aria-label="Previous project" onClick={() => setOpen((o) => (o! - 1 + PROJECTS.length) % PROJECTS.length)}>←</button>
                <button type="button" className="icon-btn" aria-label="Next project" onClick={() => setOpen((o) => (o! + 1) % PROJECTS.length)}>→</button>
                <button type="button" className="icon-btn" aria-label="Close" onClick={() => setOpen(null)} autoFocus>✕</button>
              </div>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
