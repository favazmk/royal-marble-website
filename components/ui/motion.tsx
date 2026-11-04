'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Counts up from 0 the first time it scrolls into view. Static under reduced motion. */
export function Counter({ to, prefix = '', suffix = '', className = '' }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const from = to > 1900 ? to - 40 : 0; // years count the last stretch, not from zero
    const obj = { v: from };
    el.textContent = `${prefix}${Math.round(from)}${suffix}`;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      gsap.to(obj, { v: to, duration: 1.8, ease: 'expo.out', onUpdate: () => { el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`; } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, prefix, suffix]);
  return <span ref={ref} className={`tabular-nums ${className}`}>{prefix}{to}{suffix}</span>;
}

/**
 * A statement whose words light up as it scrolls through the viewport — a pure
 * function of scroll position, so it is correct after reload or scrolling back.
 */
export function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const words = el.querySelectorAll<HTMLElement>('[data-w]');
    const ctx = gsap.context(() => {
      gsap.fromTo(words, { opacity: 0.16 }, {
        opacity: 1, ease: 'none', stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true">
          <span data-w className={w.startsWith('*') ? 'u-gold-text' : ''}>{w.replace(/\*/g, '')}</span>{' '}
        </span>
      ))}
    </p>
  );
}

/** Subtle parallax on a child image: moves against the scroll inside its frame. */
export function Parallax({ children, amount = 12, className = '' }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(el.firstElementChild, { yPercent: -amount / 2, scale: 1.12 }, {
        yPercent: amount / 2, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, [amount]);
  return <div ref={ref} className={`overflow-hidden ${className}`}>{children}</div>;
}

/** Card that tilts toward the pointer (fine pointers only). */
export function Tilt({ children, className = '', max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    const qx = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const qy = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    gsap.set(el, { transformPerspective: 900 });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      qy(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
    };
    const leave = () => { qx(0); qy(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [max]);
  return <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>{children}</div>;
}
