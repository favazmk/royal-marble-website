import Link from 'next/link';

import { NAV, SITE, whatsappLink } from '@/lib/site';
import { ArrowIcon } from '@/components/ui/icons';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[var(--color-night)] text-[var(--color-paper)] grain">
      <div className="u-shell relative pb-10 pt-20 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-gold.webp" alt="Royal Marble" width={160} height={133} className="h-auto w-[150px]" loading="lazy" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              {SITE.legalName} — supply, cutting, polishing and installation of natural and engineered stone, from our own
              factory in Umm Al Quwain since {SITE.founded}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['ISO 9001', 'ISO 14001', 'ISO 45001', 'Cosentino recommended'].map((t) => (
                <span key={t} className="u-pill border border-white/15 text-white/75">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="u-label text-[var(--color-gold-2)]">Explore</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {[{ href: '/', label: 'Home' }, ...NAV, { href: '/contact', label: 'Contact' }].map((n) => (
                <li key={n.href}><Link href={n.href} className="link-draw text-white/80 hover:text-[var(--color-gold-2)]">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <address className="not-italic">
            <p className="u-label text-[var(--color-gold-2)]">{SITE.factory.label}</p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-white/80">
              {SITE.factory.street}<br />{SITE.factory.area}<br />{SITE.factory.city}, UAE
            </p>
            <a href={SITE.factory.directions} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-gold-2)]">
              Get directions <ArrowIcon />
            </a>
            <p className="u-label mt-8 text-[var(--color-gold-2)]">{SITE.office.label}</p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-white/80">
              {SITE.office.street}<br />{SITE.office.area}, {SITE.office.city}
            </p>
          </address>

          <div>
            <p className="u-label text-[var(--color-gold-2)]">Talk to us</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem] tabular-nums">
              <li><a href={SITE.phoneHref} className="link-draw text-white/80 hover:text-[var(--color-gold-2)]">{SITE.phone}</a></li>
              <li><a href={SITE.landlineHref} className="link-draw text-white/80 hover:text-[var(--color-gold-2)]">{SITE.landline}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="link-draw text-white/80 hover:text-[var(--color-gold-2)]">{SITE.email}</a></li>
            </ul>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-light mt-7">
              WhatsApp us <span className="btn-dot" aria-hidden="true"><ArrowIcon /></span>
            </a>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="wordmark pointer-events-none mt-20 select-none whitespace-nowrap text-center leading-[0.8] text-white/[0.07]"
          style={{ fontFamily: 'var(--font-outfit)', fontWeight: 200, fontSize: 'clamp(4rem, 16vw, 15rem)', letterSpacing: '-0.05em' }}
        >
          royal marble
        </p>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <p>© {year} {SITE.legalName}. Industrial licence LIC-IND-31380, Umm Al Quwain.</p>
          <p>Marble · Granite · Quartz · Porcelain · Natural stone · Ventilated facades</p>
        </div>
      </div>
    </footer>
  );
}
