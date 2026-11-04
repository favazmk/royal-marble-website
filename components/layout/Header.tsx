'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { NAV, SITE, whatsappLink } from '@/lib/site';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * Floating glass pill. Hides while scrolling down past the fold and returns on
 * the first scroll up, so it never sits on top of the film's type for long.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last.current + 4;
      const up = y < last.current - 4;
      if (down && y > 240) setHidden(true);
      else if (up || y < 80) setHidden(false);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the menu while it is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out)]"
        style={{ transform: hidden && !open ? 'translate3d(0,-120%,0)' : 'none' }}
      >
        <div className="u-shell pt-4 md:pt-5">
          <nav
            aria-label="Main"
            className="u-glass flex items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 shadow-[0_10px_40px_-20px_rgb(38_27_22/0.45)] md:pl-4"
          >
            <Link href="/" className="flex items-center gap-3" aria-label="Royal Marble — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/mark-ink.webp" alt="" width={44} height={30} className="h-[26px] w-auto md:h-[30px]" />
              <span className="leading-none">
                <span className="block text-[0.98rem] font-medium tracking-[-0.01em] [font-family:var(--font-outfit)]">Royal Marble</span>
                <span className="mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-2)]">Factory · UAE</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((n) => {
                const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? 'page' : undefined}
                      className={`rounded-full px-4 py-2 text-[0.88rem] font-medium transition-colors hover:bg-white/70 ${active ? 'bg-white/80' : ''}`}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a href={SITE.phoneHref} className="hidden rounded-full px-3 py-2 text-[0.85rem] font-medium tabular-nums xl:block">
                {SITE.phone}
              </a>
              <Link href="/contact" className="btn btn-dark hidden !py-3 sm:inline-flex">
                Get a quote
                <span className="btn-dot" aria-hidden="true"><ArrowIcon /></span>
              </Link>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                  <span className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ${open ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[var(--color-ground)] transition-[clip-path] duration-700 ease-[var(--ease-out)] lg:hidden ${open ? '' : 'pointer-events-none'}`}
        style={{ clipPath: open ? 'circle(150% at calc(100% - 40px) 40px)' : 'circle(0% at calc(100% - 40px) 40px)' }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="u-shell flex h-full flex-col pb-8 pt-28">
          <ul className="flex flex-col">
            {[{ href: '/', label: 'Home' }, ...NAV, { href: '/contact', label: 'Contact' }].map((n, i) => (
              <li key={n.href} className="border-b border-[var(--color-line)]">
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 text-[2.2rem] font-light [font-family:var(--font-outfit)]"
                  style={{
                    transform: open ? 'none' : 'translate3d(0,24px,0)',
                    opacity: open ? 1 : 0,
                    transition: `transform .8s var(--ease-out) ${120 + i * 50}ms, opacity .8s var(--ease-out) ${120 + i * 50}ms`,
                  }}
                >
                  {n.label}
                  <span className="u-label text-[var(--color-ink-3)]">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3">
            <a href={whatsappLink()} className="btn btn-dark justify-between" target="_blank" rel="noopener">
              WhatsApp us <span className="btn-dot" aria-hidden="true"><ArrowIcon /></span>
            </a>
            <a href={SITE.phoneHref} className="btn btn-ghost justify-between tabular-nums">
              {SITE.phone} <span className="btn-dot" aria-hidden="true"><ArrowIcon /></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
