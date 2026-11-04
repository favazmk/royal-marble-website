import type { Metadata } from 'next';

import { MATERIALS, MATERIAL_FAMILIES } from '@/content/data';
import { Breadcrumbs, PageHero } from '@/components/sections/PageHero';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/motion';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Marble, Granite & Stone Supplier in the UAE',
  description:
    'Calacatta, Nero Marquina, Verde, travertine, Azul quartzite, granite, quartz and porcelain — supplied, cut and polished in Umm Al Quwain.',
  alternates: { canonical: '/materials/' },
};

export default function MaterialsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Materials', href: '/materials/' }]} />
      <PageHero
        eyebrow="Materials"
        title="Natural. Engineered. Exact."
        intro="Local and imported marble, granite, quartz, quartzite, travertine, limestone and porcelain — matched block by block to the sample you approve."
        mega="stone"
        image="/img/work/factory-slab.webp"
        alt="A polished Calacatta slab standing in the Royal Marble warehouse, ready for selection"
        card={{ text: 'Visit our showroom and factory to choose your slabs in person.', href: '/contact', cta: 'Plan a visit ↗' }}
      />


      <section className="u-shell py-24 md:py-32" aria-labelledby="families">
        <Heading eyebrow="What we work with" lines={['Four families,', '*one standard.*']} />
        <h2 id="families" className="sr-only">Material families</h2>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {MATERIAL_FAMILIES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70} className="lift u-card p-6">
              <span className="u-label text-[var(--color-ink-3)]">0{i + 1}</span>
              <h3 className="mt-8 text-[1.5rem]">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)]">{f.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MATERIALS.map((m, i) => (
            <Reveal key={m.id} delay={i * 60} className="[perspective:1000px]">
              <Tilt max={8}>
                <figure className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-card)] shadow-[0_30px_60px_-40px_rgb(38_27_22/0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.photo} alt={`${m.name} in use — ${m.uses.join(', ').toLowerCase()}`} className="aspect-[2/3] w-full object-cover" loading="lazy" />
                  <figcaption className="p-4">
                    <p className="u-label text-[var(--color-ink-3)]">{m.family}</p>
                    <h3 className="mt-1 text-[1.25rem]">{m.name}</h3>
                    <p className="mt-1 text-xs text-[var(--color-ink-2)]">{m.uses.join(' · ')}</p>
                  </figcaption>
                </figure>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta image="/img/work/vanity-black.webp" body="Tell us the stone and the space. We reserve matching slabs, send photos of the actual blocks and quote cut-to-size or installed." title={['Found your stone?', 'Let’s cut it.']} />
    </>
  );
}
