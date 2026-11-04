'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SITE, whatsappLink } from '@/lib/site';
import { ArrowIcon, WhatsAppIcon } from '@/components/ui/icons';

/**
 * Closing call to action. As it scrolls in, an espresso "ink" wipe grows from
 * the top-right corner with a wobbling edge — a pure function of scroll
 * (liquid-ink recipe), so it is right after reload and scrolling back.
 */
export function Cta({
  title = ['Let’s realise', 'your dream.'],
  image = '/img/services/slabs.webp',
  body = 'Send us drawings, quantities or just an idea. We’ll come back with stone recommendations, a quotation and a programme — usually within two working days.',
}: { title?: [string, string]; image?: string; body?: string }) {
  const section = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const s = section.current;
    const c = card.current;
    if (!s || !c) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { c.style.clipPath = 'none'; return; }
    gsap.registerPlugin(ScrollTrigger);

    const render = (p: number) => {
      const W = c.offsetWidth;
      const H = c.offsetHeight;
      const R = p * Math.hypot(W, H) * 1.12;
      if (R < 1) { c.style.clipPath = `polygon(${W}px 0, ${W}px 0, ${W}px 0)`; return; }
      if (p >= 0.999) { c.style.clipPath = 'none'; return; }
      const pts = [`${W}px 0px`];
      const N = 64;
      const a0 = Math.PI * 0.45;
      const a1 = Math.PI * 1.1;
      for (let i = 0; i <= N; i += 1) {
        const t = a0 + ((a1 - a0) * i) / N;
        const n = Math.sin(3 * t + p * 6) * 0.5 + Math.sin(7 * t - p * 9) * 0.3 + Math.sin(13 * t + p * 4) * 0.2;
        const r = R * (1 + 0.045 * n);
        pts.push(`${(W + Math.cos(t) * r).toFixed(1)}px ${(Math.sin(t) * r).toFixed(1)}px`);
      }
      c.style.clipPath = `polygon(${pts.join(',')})`;
    };

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: s, start: 'top 85%', end: 'top 15%', scrub: 0.6,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });
      render(st.progress);
      gsap.from(words.current?.querySelectorAll('[data-stretch]') ?? [], {
        scaleX: 0.15, opacity: 0, duration: 1.1, ease: 'elastic.out(1,0.5)', stagger: 0.12, transformOrigin: '0% 50%',
        scrollTrigger: { trigger: s, start: 'top 40%', toggleActions: 'play none none reverse' },
      });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} aria-labelledby="cta-title" className="u-shell pb-16 pt-8">
      <div ref={card} className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-espresso)] text-[var(--color-paper)] grain">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-espresso)] via-[var(--color-espresso)]/80 to-transparent" />
        <div className="relative grid gap-10 p-7 py-16 md:p-14 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div ref={words}>
            <p className="u-label text-[var(--color-gold-2)]">Start a project</p>
            <h2 id="cta-title" className="mt-5 text-[length:var(--text-display)]">
              <span data-stretch className="block">{title[0]}</span>
              <span data-stretch className="u-gold-text block">{title[1]}</span>
            </h2>
            <p className="mt-6 max-w-lg text-white/70">{body}</p>
          </div>
          <div className="grid gap-3 sm:max-w-sm lg:justify-self-end">
            <Link href="/contact" className="btn btn-light justify-between">Request a quotation <span className="btn-dot"><ArrowIcon /></span></Link>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-ghost-light justify-between">
              <span className="flex items-center gap-2"><WhatsAppIcon /> WhatsApp {SITE.phone}</span>
              <span className="btn-dot"><ArrowIcon /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
