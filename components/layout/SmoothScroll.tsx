'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Drives Lenis from GSAP's ticker so smooth scrolling and ScrollTrigger share a
 * single RAF loop. Two independent loops produce visible frame-order tearing
 * between the scroll position and anything pinned to it — which the scroll film
 * would show as stutter.
 *
 * Disabled entirely under prefers-reduced-motion: native scrolling is the
 * correct behaviour there, not a slower animated one.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      // Touch devices have their own momentum; overriding it feels broken.
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Reload mid-page: the browser restores scroll before the pins exist, so
    // the page lands short of where it was. Restore by hand once pins have
    // been measured.
    history.scrollRestoration = 'manual';
    const key = `rm-scroll:${location.pathname}`;
    const save = () => {
      try { sessionStorage.setItem(key, String(Math.round(window.scrollY))); } catch { /* storage blocked */ }
    };
    let saved = 0;
    try { saved = Number(sessionStorage.getItem(key)) || 0; sessionStorage.removeItem(key); } catch { /* storage blocked */ }
    window.addEventListener('pagehide', save);
    // Restore once the home film has pinned (it announces itself), or shortly
    // after mount on pages without one. Not on `load`: the film's frames keep
    // the load event waiting for seconds.
    let restoreTimer = 0;
    const restore = () => {
      window.clearTimeout(restoreTimer);
      window.removeEventListener('rm:pinned', restore);
      if (saved <= 0) return;
      ScrollTrigger.refresh();
      lenis.resize();
      window.scrollTo(0, saved);
      saved = 0;
    };
    if (saved > 0) {
      window.addEventListener('rm:pinned', restore);
      restoreTimer = window.setTimeout(restore, document.querySelector('[data-film]') ? 2500 : 400);
    }

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.clearTimeout(restoreTimer);
      window.removeEventListener('rm:pinned', restore);
      window.removeEventListener('pagehide', save);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
