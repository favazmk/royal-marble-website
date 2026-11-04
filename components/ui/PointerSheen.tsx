'use client';

import { useEffect } from 'react';

/**
 * One delegated pointermove listener for every `.sheen` card on the page: it
 * writes the pointer position into --mx / --my so the CSS highlight follows the
 * cursor. Fine pointers only; touch gets no sheen.
 */
export function PointerSheen() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('.sheen');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}
