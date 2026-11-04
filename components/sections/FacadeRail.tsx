'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FACADE_SYSTEMS } from '@/content/data';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * Facade division. On desktop the section pins and the four systems travel
 * sideways with the scroll, each render rotating slightly into place; on touch
 * screens it is a native swipe rail with scroll-snap — no hijacking.
 */
export function FacadeRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const s = section.current;
    const t = track.current;
    if (!s || !t) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Pinned at every width now, so the track stops being a native swipe rail:
      // one scroll gesture drives the whole division, phone included. gsap.set is
      // reverted with the matchMedia context, which restores the rail for reduced
      // motion and for anyone who resizes across it.
      gsap.set(t, { width: 'max-content', overflow: 'visible', scrollSnapType: 'none' });
      gsap.set(s.firstElementChild, { paddingTop: 0, paddingBottom: 0 });
      const distance = () => t.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: s, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      t.querySelectorAll<HTMLElement>('[data-render]').forEach((img) => {
        gsap.fromTo(img, { rotate: -6, scale: 0.9 }, {
          rotate: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} aria-labelledby="facade-title" className="relative overflow-hidden bg-[var(--color-night)] text-[var(--color-paper)] grain">
      <div className="flex min-h-[100svh] flex-col justify-center py-24 lg:py-0">
        <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(16px,3.2vw,44px)]">
          {/* Lead panel */}
          <div className="flex w-[86vw] shrink-0 snap-start flex-col justify-center gap-10 sm:w-[60vw] lg:w-[34rem] lg:justify-between lg:gap-0 lg:pr-10">
            <Reveal>
              <p className="u-label flex items-center gap-3 text-[var(--color-gold-2)]"><span className="h-px w-8 bg-current opacity-60" />Facade division</p>
              <h2 id="facade-title" className="mt-5 text-[length:var(--text-headline)]">
                Ventilated facades, <span className="u-gold-text">engineered to last.</span>
              </h2>
              <p className="mt-6 max-w-md text-white/70">
                Four Rockany® fixing systems for porcelain, terracotta, natural stone and fibre-cement cladding — on aluminium
                sub-frames with stainless-steel fasteners. Designed, supplied and installed by one team.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-10 flex flex-wrap gap-3">
              <Link href="/materials#facades" className="btn btn-light">Facade systems <span className="btn-dot"><ArrowIcon /></span></Link>
              <span className="flex items-center gap-2 text-sm text-white/50"><span className="lg:hidden">Swipe</span><span className="hidden lg:inline">Scroll</span> <span aria-hidden="true">→</span></span>
            </Reveal>
          </div>

          {FACADE_SYSTEMS.map((f, i) => (
            <article key={f.id} className="group flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card)] text-[var(--color-ink)] sm:w-[60vw] lg:w-[30rem]">
              <div className="relative aspect-[5/4] overflow-hidden bg-[#e4e1dc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-render src={f.image} alt={`${f.name} — exploded render of the fixing system and panels`} className="absolute inset-0 h-full w-full object-contain p-6 mix-blend-multiply" loading="lazy" />
                <span className="u-pill u-glass absolute left-4 top-4">0{i + 1} · {f.code}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.6rem]">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-2)]">{f.short}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {f.tags.map((t) => <span key={t} className="u-pill bg-[var(--color-ground)] !py-1.5 text-[0.72rem]">{t}</span>)}
                </div>
              </div>
            </article>
          ))}

          {/* Closing panel: facade photo */}
          <div className="relative w-[86vw] shrink-0 snap-start overflow-hidden rounded-[var(--radius-xl)] sm:w-[60vw] lg:w-[34rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/work/facade-long.webp" alt="Residential block with a two-tone porcelain ventilated facade installed by Royal Marble" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative flex h-full min-h-[24rem] flex-col justify-end p-6">
              <p className="u-label text-[var(--color-gold-2)]">Installed by Royal Marble</p>
              <p className="mt-2 text-2xl font-light [font-family:var(--font-outfit)]">Nour Tower · Najmat Towers · Raha Beach · Dubai Hills</p>
              <Link href="/projects" className="btn btn-light mt-5 self-start">See the projects <span className="btn-dot"><ArrowIcon /></span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
