import type { Metadata } from 'next';

import { FACADE_SYSTEMS, MATERIALS, MATERIAL_FAMILIES } from '@/content/data';
import { Breadcrumbs, PageHero } from '@/components/sections/PageHero';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Parallax, Tilt } from '@/components/ui/motion';
import { Faq } from '@/components/sections/Faq';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Marble, Stone & Ventilated Facades, UAE',
  description:
    'Calacatta, Nero Marquina, Verde, travertine and Azul quartzite cut in Umm Al Quwain — plus Rockany® SA6, CA, RA and undercut ventilated facade systems, designed and installed across the UAE.',
  alternates: { canonical: '/materials/' },
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

const JUMPS = [
  { href: '#stone', label: 'Stone' },
  { href: '#facades', label: 'Facade systems' },
  { href: '#onsite', label: 'On site' },
  { href: '#faq', label: 'FAQ' },
];

export default function MaterialsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Materials & Facades', href: '/materials/' }]} />
      <PageHero
        eyebrow="Materials & facades"
        title="Stone inside. Engineered systems outside."
        intro="Marble, granite, quartz, quartzite, travertine and porcelain matched block by block to your sample — and the ventilated facade systems that carry them on the outside of a building."
        mega="stone"
        image="/img/work/factory-slab.webp"
        alt="A polished Calacatta slab standing in the Royal Marble warehouse, ready for selection"
        card={{ text: 'Visit our showroom and factory to choose your slabs in person.', href: '/contact', cta: 'Plan a visit ↗' }}
      />

      <nav aria-label="On this page" className="u-shell mt-6 flex flex-wrap gap-2">
        {JUMPS.map((j) => (
          <a key={j.href} href={j.href} className="u-pill border border-[var(--color-line)] bg-[var(--color-card)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]">{j.label}</a>
        ))}
      </nav>

      {/* Stone */}
      <section id="stone" className="u-shell scroll-mt-28 py-20 md:py-28" aria-labelledby="families-title">
        <Heading id="families-title" eyebrow="What we work with" lines={['Four families,', '*one standard.*']} />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {MATERIAL_FAMILIES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70} className="lift u-card p-6">
              <span className="u-label text-[var(--color-ink-3)]">0{i + 1}</span>
              <h3 className="mt-8 text-[1.5rem]">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)]">{f.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading eyebrow="Signature stones" lines={['Five stones,', '*five rooms.*']} />
          <Reveal className="max-w-md text-[var(--color-ink-2)]">
            <p>Each one shown where it performs best — and each one in our yard as real blocks you can walk around before you commit.</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MATERIALS.map((m, i) => (
            <Reveal key={m.id} delay={i * 60} className="[perspective:1000px]">
              <Tilt max={8}>
                <figure className="sheen group overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-card)] shadow-[0_30px_60px_-40px_rgb(38_27_22/0.6)]">
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.photo} alt={`${m.name} in use — ${m.uses.join(', ').toLowerCase()}`} className="zoom-img aspect-[2/3] w-full object-cover" loading="lazy" />
                  </div>
                  <figcaption className="p-4">
                    <p className="u-label flex items-center gap-2 text-[var(--color-ink-3)]"><span className="h-2 w-2 rounded-full" style={{ background: m.tone }} />{m.family}</p>
                    <h3 className="mt-1 text-[1.25rem]">{m.name}</h3>
                    <p className="mt-1 text-xs text-[var(--color-ink-2)]">{m.uses.join(' · ')}</p>
                  </figcaption>
                </figure>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facades */}
      <section id="facades" className="u-shell scroll-mt-28 pb-24 md:pb-32" aria-labelledby="facades-title">
        <div className="relative isolate overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-espresso)] text-[var(--color-paper)]">
          <Parallax className="absolute inset-0 -z-10" amount={10}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/work/villa-cantilever.webp" alt="Cantilevered villa volume clad in white large-format porcelain on a ventilated facade by Royal Marble" className="h-full w-full object-cover" loading="lazy" />
          </Parallax>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="flex min-h-[26rem] flex-col justify-end p-6 md:min-h-[32rem] md:p-10">
            <Reveal className="max-w-xl">
              <p className="u-label text-[var(--color-gold-2)]">Facade division</p>
              <h2 id="facades-title" className="mt-4 text-[clamp(2rem,4vw,3.4rem)]">Ventilated facades, engineered to last.</h2>
              <p className="mt-4 max-w-md text-white/75">Four Rockany® fixing systems on aluminium sub-frames with stainless-steel fasteners — for towers, villas and public buildings. Designed, supplied and installed by one team.</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {FACADE_SYSTEMS.map((f, i) => (
            <Reveal key={f.id} delay={(i % 2) * 80} className="lift u-card sheen group grid grid-cols-[1fr_auto] gap-4 overflow-hidden p-6">
              <div>
                <span className="u-pill bg-[var(--color-ground)]">0{i + 1} · {f.code}</span>
                <h3 className="mt-5 text-[1.7rem]">{f.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">{f.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">{f.tags.map((t) => <li key={t} className="u-pill border border-[var(--color-line)] !py-1.5 text-[0.72rem]">{t}</li>)}</ul>
              </div>
              <div className="h-48 w-32 overflow-hidden rounded-[var(--radius-md)] md:h-56 md:w-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.detail} alt={`${f.name} installation detail`} className="zoom-img h-full w-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="onsite" className="grain relative scroll-mt-20 bg-[var(--color-night)] py-24 text-[var(--color-paper)] md:py-32" aria-labelledby="onsite-title">
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

      <div id="faq" className="scroll-mt-20">
        <Faq items={FACADE_FAQ} title={['Facades,', '*explained.*']} />
      </div>

      <Cta image="/img/work/vanity-black.webp" body="Tell us the stone or the elevation. We reserve matching slabs or propose the fixing system, send photos of the actual blocks and quote cut-to-size or installed." title={['Found your stone?', 'Let’s cut it.']} />
    </>
  );
}
