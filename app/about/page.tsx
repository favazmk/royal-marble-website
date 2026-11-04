import type { Metadata } from 'next';

import { SITE } from '@/lib/site';
import { Breadcrumbs, PageHero } from '@/components/sections/PageHero';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Parallax, ScrubText } from '@/components/ui/motion';
import { Cta } from '@/components/sections/Cta';
import { LineIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'About — Marble Factory in Umm Al Quwain',
  description:
    'Founded in 2019 by a couple who see marble as art: design support, cutting, polishing and installation, all in-house at our Umm Al Quwain factory.',
  alternates: { canonical: '/about/' },
};

const VALUES = [
  { icon: 'shield', tint: '#f3ece2', accent: '#8d6a37', t: 'Professionalism', b: 'Quality products and services that comply with local and international norms, standards and best practice for natural and reconstituted stone.' },
  { icon: 'gauge', tint: '#f6f4f0', accent: '#261b16', t: 'Functionality', b: 'Quality control is part of the culture — every member of the team takes part, in their own field and line of duty.' },
  { icon: 'link', tint: '#e3e8ee', accent: '#1f3c66', t: 'Credibility', b: 'Project management that commits the right resources, with products, services and tasks monitored and supervised throughout.' },
  { icon: 'leaf', tint: '#dfe7e0', accent: '#16392b', t: 'Sustainability', b: 'Lasting trust with our customers, suppliers, employees and the community we serve — and stone that lasts generations.' },
];

const MISSION = [
  'Work built on long-term partnerships with our clients.',
  'Enrich the market’s understanding of the marble art business and foster an innovative, creative culture.',
  'Promote prosperity and a good working environment, and keep developing our team’s skills.',
  'Quality control in both supply and application, with the best available resources and latest techniques.',
];

const PEOPLE = ['General management & administration', 'Technical & project management', 'Procurement & sales', 'QA/QC & HSE', 'Production & factory', 'Installation teams'];

const FACTORY = [
  { src: '/img/work/factory-yard.webp', alt: 'Marble and granite slabs stacked on A-frames in the Royal Marble slab yard', label: 'Slab yard', span: 'col-span-2 lg:row-span-2' },
  { src: '/img/work/factory-cnc.webp', alt: 'CNC stone router working a slab on the factory floor', label: 'CNC routing', span: 'row-span-2' },
  { src: '/img/work/factory-polish.webp', alt: 'Craftsman hand-polishing a marble edge at the factory', label: 'Hand finishing', span: '' },
  { src: '/img/work/factory-edge.webp', alt: 'Automatic edge-polishing line in the Royal Marble factory', label: 'Edge polishing', span: '' },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'About', href: '/about/' }]} />
      <PageHero
        eyebrow="About Royal Marble"
        title="Stone is not a material. It is a story."
        intro="Royal Marble Factory LLC supplies, fabricates and installs marble and natural stone across the UAE — from our own factory in Umm Al Quwain, since 2019."
        mega="since 2019"
        image="/img/services/block.webp"
        alt="A rough block of Calacatta marble lit by a shaft of warm light"
        card={{ text: 'Meet the team behind the stone — visit our factory and showroom in Umm Al Quwain.', href: '/contact', cta: 'Book a visit ↗' }}
      />

      <section className="u-shell pt-16 md:pt-32" aria-labelledby="factory-title">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Heading id="factory-title" eyebrow="Inside the factory" lines={['Umm Al Quwain.', '*Where the stone is made.*']} />
          <Reveal x={26} delay={120} className="max-w-md text-[var(--color-ink-2)]">
            <p>Slab yard, bridge saws, CNC and waterjet, edge-polishing lines and hand finishing — all on one site, run by our own team.</p>
          </Reveal>
        </div>
        <div className="mt-12 grid auto-rows-[15rem] grid-cols-2 gap-3 md:auto-rows-[18rem] lg:grid-cols-4">
          {FACTORY.map((f, i) => (
            <Reveal key={f.src} delay={(i % 4) * 70} className={`sheen group relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-card)] ${f.span}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} className="zoom-img absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-sm font-medium text-white">{f.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="u-shell py-16 md:py-32" aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Parallax className="aspect-[4/5] rounded-[var(--radius-xl)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/work/factory-saw.webp" alt="Bridge saw cutting a marble block under water spray on the Royal Marble factory floor" className="h-full w-full object-cover" loading="lazy" />
          </Parallax>
          <div>
            <Heading id="story-title" eyebrow="Our approach" lines={['Everything in-house.', '*Nothing left to chance.*']} />
            <Reveal x={26} delay={140} className="mt-8 space-y-5 text-[var(--color-ink-2)]">
              <p>
                Royal Marble was established in 2019 to complement and support its sister company, Al Jawda Wal Eltizam Technical
                Services — adding the factory, machinery and self-contained capability behind master-quality cladding, flooring,
                tiling, mosaic and decorative work.
              </p>
              <p>
                In a short time the business has stamped its landmark on the market: residential, commercial and public projects
                finished to perfection, with the eye of an eagle on every joint. Customer satisfaction, our people and health and
                safety come first, backed by modern management techniques.
              </p>
              <p>
                We check that the stone supplied matches the samples you approved and agreed — selecting and identifying quarry faces,
                numbering blocks, and labelling slabs and finished tiles — so that what arrives on site is exactly what you chose.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-night)] py-16 text-[var(--color-paper)] md:py-32 grain relative" aria-labelledby="vision-title">
        <div className="u-shell relative grid gap-12 lg:grid-cols-[0.35fr_1fr]">
          <p className="u-label text-[var(--color-gold-2)]" id="vision-title">Vision & mission</p>
          <div>
            <ScrubText
              className="text-[clamp(1.7rem,3.4vw,3rem)] font-light leading-[1.15] [font-family:var(--font-outfit)]"
              text="To be the leading company in the region for state-of-the-art work with the look, feel and sustainability of *marble* — unparalleled quality, delivered on time, through effective and innovative solutions."
            />
            <ul className="mt-14 grid gap-6 text-white/70 md:grid-cols-2">
              {MISSION.map((m, i) => (
                <Reveal as="li" key={m} delay={(i % 2) * 90}>{m}</Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="u-shell py-16 md:py-32" aria-labelledby="values-title">
        <Heading id="values-title" eyebrow="Quality management policy" lines={['Quality,', '*always prevails.*']} />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 70} className="lift u-card p-6">
              <span className="text-[2.4rem] font-extralight leading-none [font-family:var(--font-outfit)]">0{i + 1}</span>
              <h3 className="mt-6 text-[1.35rem]">{v.t}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)]">{v.b}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="u-card p-6 md:p-8">
            <p className="u-label text-[var(--color-ink-3)]">One team</p>
            <h3 className="mt-3 text-[1.6rem]">From enquiry to installation</h3>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {PEOPLE.map((p) => <li key={p} className="rounded-full bg-[var(--color-ground)] px-4 py-2.5 text-sm">{p}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={80} className="rounded-[var(--radius-xl)] bg-[var(--color-espresso)] p-6 text-[var(--color-paper)] md:p-8">
            <p className="u-label text-[var(--color-gold-2)]">Leadership</p>
            <h3 className="mt-3 text-[1.6rem]">{SITE.contactPerson}</h3>
            <p className="text-white/60">{SITE.contactRole}</p>
            <p className="mt-5 text-sm text-white/75">Your direct point of contact for enquiries, quotations and project discussions.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <a href={SITE.phoneHref} className="u-pill border border-white/20 tabular-nums">{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="u-pill border border-white/20">{SITE.email}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Cta image="/img/services/slab-trio.webp" body="Walk the slab yard in Umm Al Quwain, see the saws running and choose your blocks with the people who will cut them." title={['Come and see', 'the stone.']} />
    </>
  );
}
