import type { Metadata } from 'next';

import { SITE, whatsappLink } from '@/lib/site';
import { Breadcrumbs } from '@/components/sections/PageHero';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon, StarIcon, WhatsAppIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Contact — Request a Stone Quotation',
  description:
    'Request a quotation. Factory in Umm Al Quwain, head office in Business Bay, Dubai. Call or WhatsApp +971 56 133 5885.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact/' }]} />
      <section className="u-shell pb-16 pt-32 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Heading as="h1" size="display" eyebrow="Contact" lines={['Let’s realise', '*your dream.*']} />
            <Reveal className="mt-6 max-w-md text-[var(--color-ink-2)]">
              Tell us about your project — materials, quantities, drawings, timeline. We&rsquo;ll come back with advice, a quotation
              and a programme.
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Reveal className="u-card p-5">
                <p className="u-label text-[var(--color-ink-3)]">Call</p>
                <a href={SITE.phoneHref} className="mt-2 block text-[1.25rem] tabular-nums">{SITE.phone}</a>
                <a href={SITE.landlineHref} className="block text-sm tabular-nums text-[var(--color-ink-2)]">{SITE.landline}</a>
              </Reveal>
              <Reveal delay={60} className="u-card p-5">
                <p className="u-label text-[var(--color-ink-3)]">Email</p>
                <a href={`mailto:${SITE.email}`} className="mt-2 block break-all text-[1.1rem]">{SITE.email}</a>
                <p className="text-sm text-[var(--color-ink-2)]">{SITE.contactPerson}, {SITE.contactRole}</p>
              </Reveal>
              <Reveal delay={120} className="sm:col-span-2">
                <a href={whatsappLink()} target="_blank" rel="noopener" className="group flex items-center justify-between rounded-[var(--radius-xl)] bg-[var(--color-espresso)] p-5 text-[var(--color-paper)]">
                  <span className="flex items-center gap-3"><WhatsAppIcon size={22} /> Chat on WhatsApp — fastest reply</span>
                  <span className="icon-btn"><ArrowIcon /></span>
                </a>
              </Reveal>
            </div>
          </div>

          <Reveal className="u-card p-6 md:p-10">
            <h2 className="text-[1.8rem]">Request a quote</h2>
            <p className="mb-8 mt-2 text-sm text-[var(--color-ink-2)]">Fields marked * are required.</p>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="u-shell pb-24" aria-labelledby="visit">
        <h2 id="visit" className="sr-only">Visit us</h2>
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1.2fr]">
          <Reveal className="u-card flex flex-col p-6 md:p-8">
            <p className="u-label text-[var(--color-ink-3)]">{SITE.factory.label}</p>
            <h3 className="mt-3 text-[1.7rem]">{SITE.factory.city}</h3>
            <address className="mt-2 not-italic text-[var(--color-ink-2)]">{SITE.factory.street}<br />{SITE.factory.area}<br />{SITE.factory.city}, UAE</address>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              <a href={SITE.factory.directions} target="_blank" rel="noopener" className="btn btn-dark">Get directions <span className="btn-dot"><ArrowIcon /></span></a>
              <a href={SITE.google.url} target="_blank" rel="noopener" className="u-pill border border-[var(--color-line)]">
                <span className="text-[var(--color-gold)]"><StarIcon size={12} /></span> {SITE.google.rating} · {SITE.google.count} Google reviews
              </a>
            </div>
          </Reveal>
          <Reveal delay={70} className="u-card flex flex-col p-6 md:p-8">
            <p className="u-label text-[var(--color-ink-3)]">{SITE.office.label}</p>
            <h3 className="mt-3 text-[1.7rem]">{SITE.office.city}</h3>
            <address className="mt-2 not-italic text-[var(--color-ink-2)]">{SITE.office.street}<br />{SITE.office.area}, {SITE.office.city}<br />United Arab Emirates</address>
            <p className="mt-auto pt-6 text-sm text-[var(--color-ink-3)]">Meetings by appointment.</p>
          </Reveal>
          <Reveal delay={140} className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card)]">
            <iframe
              title="Map: Royal Marble factory, Umm Al Quwain"
              src={`https://www.google.com/maps?q=${SITE.factory.lat},${SITE.factory.lng}&z=15&output=embed`}
              className="h-full min-h-[20rem] w-full grayscale-[0.6] sepia-[0.15]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
