import type { Metadata } from 'next';

import { FACADE_SYSTEMS } from '@/content/data';
import { Breadcrumbs, PageHero } from '@/components/sections/PageHero';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Faq } from '@/components/sections/Faq';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Ventilated Facades & Stone Cladding, UAE',
  description:
    'Rockany® SA6, CA, RA and undercut ventilated facade systems in porcelain, stone, terracotta and fibre-cement — designed and installed across the UAE.',
  alternates: { canonical: '/facades/' },
};

const FACADE_FAQ = [
  { q: 'What is a ventilated facade?', a: 'A rainscreen system where the cladding panels hang on an aluminium sub-frame with an air gap behind them. The gap ventilates the wall, improves thermal performance and keeps moisture away from the structure.' },
  { q: 'Which panels can be used?', a: 'Porcelain (including 6 mm large-format panels), natural stone, terracotta and fibre-cement, depending on the system. We advise on the right panel and fixing for your elevation and wind load.' },
  { q: 'Visible or concealed fixings?', a: 'Both are available. Clip and rail systems can be visible or hidden; the undercut system uses concealed anchors for clean joints with no visible fixings.' },
];

const ONSITE = [
  { src: '/img/work/facade-detail.webp', alt: 'Beige porcelain facade panels with recessed window reveals on a residential block', label: 'Stone-look porcelain · window reveals' },
  { src: '/img/work/facade-dark.webp', alt: 'Charcoal porcelain ventilated facade with flush joints along a walkway', label: 'Charcoal porcelain · flush joints' },
  { src: '/img/work/facade-corner.webp', alt: 'Two-tone porcelain facade meeting at a building corner', label: 'Two-tone corner detail' },
  { src: '/img/work/facade-travertine.webp', alt: 'Travertine-look facade with horizontal strata on a commercial building', label: 'Travertine-look cladding' },
];

export default function FacadesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Facades', href: '/facades/' }]} />
      <PageHero
        eyebrow="Facade division"
        title="Ventilated facades, engineered to last."
        intro="Four Rockany® fixing systems on aluminium sub-frames with stainless-steel fasteners — for towers, villas and public buildings."
        mega="facades"
        image="/img/work/villa-cantilever.webp"
        alt="Cantilevered villa volume clad in white large-format porcelain on a ventilated facade by Royal Marble"
        card={{ text: 'Share your elevations — we propose the system, panel and fixing layout.', href: '/contact', cta: 'Talk to our facade team ↗' }}
      />
      <section className="u-shell py-24 md:py-32">
        <Heading eyebrow="Systems" lines={['Choose the fixing.', '*We engineer the rest.*']} />
        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {FACADE_SYSTEMS.map((f, i) => (
            <Reveal key={f.id} delay={(i % 2) * 80} className="lift u-card grid grid-cols-[1fr_auto] gap-4 overflow-hidden p-6">
              <div>
                <span className="u-pill bg-[var(--color-ground)]">0{i + 1} · {f.code}</span>
                <h3 className="mt-5 text-[1.7rem]">{f.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">{f.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">{f.tags.map((t) => <li key={t} className="u-pill border border-[var(--color-line)] !py-1.5 text-[0.72rem]">{t}</li>)}</ul>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.detail} alt={`${f.name} installation detail`} className="h-48 w-32 rounded-[var(--radius-md)] object-cover md:h-56 md:w-40" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="relative bg-[var(--color-night)] py-24 text-[var(--color-paper)] md:py-32 grain" aria-labelledby="onsite-title">
        <div className="u-shell relative">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Heading id="onsite-title" eyebrow="On site" lines={['Panels, joints,', '*shadow lines.*']} light />
            <Reveal className="max-w-md text-white/70">
              <p>Recent ventilated facades by our installation teams — large-format porcelain and stone, set out to the millimetre and fixed on concealed sub-frames.</p>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {ONSITE.map((f, i) => (
              <Reveal key={f.src} delay={i * 70} className={`sheen group relative aspect-[2/3] overflow-hidden rounded-[var(--radius-lg)] ${i % 2 ? 'lg:translate-y-12' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.alt} className="zoom-img absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-sm text-white">{f.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Faq items={FACADE_FAQ} title={['Facades,', '*explained.*']} />
      <Cta image="/img/work/villa-pool.webp" body="Send elevations and sections. We propose the fixing system, panel sizes and joint layout, with a programme to suit your site." title={['Share your', 'elevations.']} />
    </>
  );
}
