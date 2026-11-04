import type { Metadata } from 'next';
import Link from 'next/link';

import { SERVICES } from '@/content/data';
import { Breadcrumbs, PageHero } from '@/components/sections/PageHero';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Parallax } from '@/components/ui/motion';
import { ArrowIcon } from '@/components/ui/icons';
import { Process } from '@/components/sections/Process';
import { Cta } from '@/components/sections/Cta';
import { JsonLd } from '@/components/layout/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Marble & Stone Services in Dubai & the UAE',
  description:
    'Stone cladding, marble flooring, countertops, staircases, mosaics and ventilated facades — fabricated and installed across Dubai and the UAE.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Services', href: '/services/' }]} />
      <JsonLd
        data={{
          '@type': 'ItemList',
          itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: { '@type': 'Service', name: s.title, description: s.body, provider: { '@id': `${SITE.url}/#org` }, areaServed: 'AE' },
          })),
        }}
      />
      <PageHero
        eyebrow="Services"
        title="Every stone element, from one accountable team."
        intro="Supply only, or the complete package: survey, samples, fabrication, delivery, installation, snagging and handover."
        mega="services"
        image="/img/services/hero.webp"
        alt="Double-height hall with a book-matched Statuario wall, a waterjet-cut marble floor medallion and a travertine bench in warm afternoon light"
        card={{ text: 'Send your drawings and quantities — we reply with a quotation and programme.', href: '/contact', cta: 'Request a quotation ↗' }}
      />

      <section className="u-shell py-24 md:py-32" aria-labelledby="svc-list">
        <Heading eyebrow="Six disciplines" lines={['Cut in our factory,', '*fixed by our masons.*']} />
        <h2 id="svc-list" className="sr-only">Our services</h2>
        <div className="mt-14 space-y-3">
          {SERVICES.map((s, i) => (
            <article key={s.id} id={s.id} className="u-card grid scroll-mt-28 gap-6 overflow-hidden p-3 md:grid-cols-2 md:p-4">
              <Parallax className={`aspect-[4/3] rounded-[var(--radius-lg)] md:aspect-auto md:min-h-[26rem] ${i % 2 ? 'md:order-2' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photo} alt={`${s.title} by Royal Marble`} className="h-full w-full object-cover" loading="lazy" />
              </Parallax>
              <Reveal className="flex flex-col p-3 md:p-8">
                <span className="text-[3rem] font-extralight leading-none tracking-[-0.04em] text-[var(--color-ink-3)] [font-family:var(--font-outfit)]">0{i + 1}</span>
                <h3 className="mt-6 text-[clamp(1.8rem,3vw,2.6rem)]">{s.title}</h3>
                <p className="mt-4 max-w-lg text-[var(--color-ink-2)]">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => <li key={p} className="u-pill bg-[var(--color-ground)]">{p}</li>)}
                </ul>
                <Link href="/contact" className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-semibold">
                  Discuss {s.title.toLowerCase()} <span className="icon-btn !h-9 !w-9 !bg-[var(--color-ink)] !text-white"><ArrowIcon /></span>
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <Process />
      <Cta image="/img/work/corridor.webp" body="Supply only or the full package: send drawings and quantities and get a priced breakdown per element, usually within two working days." title={['Tell us what', 'you are building.']} />
    </>
  );
}
