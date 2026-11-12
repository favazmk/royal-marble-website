'use client';

import { useEffect, useRef } from 'react';

/**
 * Fades and lifts a block into place as it enters the viewport, and fades it
 * out upward once it scrolls past under the header (re-entering either way).
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
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', 'true');
          continue;
        }
        // Out of the band: above it means scrolled past (close upward), below
        // means not reached yet (re-arm the entrance for the next pass).
        const past = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
        entry.target.setAttribute('data-revealed', past ? 'past' : 'false');
      }
    },
    // Opens a little before the main visual area; closes once it slides under the header.
    { rootMargin: '-8% 0px -12% 0px', threshold: 0 },
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
