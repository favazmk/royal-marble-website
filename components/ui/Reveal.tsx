'use client';

import { useEffect, useRef } from 'react';

/**
 * Fades and lifts a block into place the first time it enters the viewport.
 *
 * Deliberately plain CSS transitions rather than GSAP: there can be dozens of
 * these on a page, and a shared IntersectionObserver costs far less than a
 * ScrollTrigger each. Under reduced motion the element is simply visible from
 * the start — no transition, no observer.
 *
 * `x` adds a restrained sideways entrance for copy that sits beside an image;
 * `y` overrides the default rise. Both are scaled down on phones by `--rv-s`
 * in globals.css, so one value reads correctly at every width.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', 'true');
        observer?.unobserve(entry.target);
      }
    },
    // Fire a little before the element reaches the main visual area.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  );
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  x,
  y,
  as: Tag = 'div',
  id,
  className = '',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'p' | 'span';
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-revealed', 'true');
      return;
    }

    getObserver().observe(el);
    return () => getObserver().unobserve(el);
  }, []);

  const offsets: React.CSSProperties = {};
  if (x !== undefined) (offsets as Record<string, string>)['--rv-x'] = `${x}px`;
  if (y !== undefined) (offsets as Record<string, string>)['--rv-y'] = `${y}px`;

  return (
    <Tag
      // @ts-expect-error — one ref type across the allowed tag union
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={{ ...style, ...offsets, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
