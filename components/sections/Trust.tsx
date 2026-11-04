import { CERTIFICATIONS, REVIEWS } from '@/content/data';

const STONES = ['Calacatta Gold', 'Statuario', 'Nero Marquina', 'Verde Guatemala', 'Travertine Navona', 'Azul Macaubas', 'Emperador', 'Carrara', 'Onyx', 'Quartzite', 'Granite', 'Cosentino surfaces'];
import { SITE } from '@/lib/site';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon, StarIcon } from '@/components/ui/icons';

/** Certifications, Google rating and a marquee of the contractors we have delivered for. */
export function Trust() {
  const r = REVIEWS[0];
  return (
    <section aria-labelledby="trust-title" className="py-16 md:py-32">
      <div className="u-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <Heading id="trust-title" eyebrow="Quality you can verify" lines={['Certified.', '*Accountable.*']} />
          <Reveal x={26} delay={120} className="text-[var(--color-ink-2)] lg:max-w-lg lg:justify-self-end">
            Quality, environmental and safety systems certified to international standards, fully insured, and recommended by
            Cosentino as a fabricator and installer.
          </Reveal>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.code} delay={i * 70} className="lift u-card group relative overflow-hidden p-6">
              <span aria-hidden="true" className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[var(--color-line)] transition-transform duration-700 group-hover:scale-125" />
              <p className="text-[1.6rem] font-light leading-none [font-family:var(--font-outfit)]">{c.code}</p>
              <p className="mt-3 font-semibold">{c.title}</p>
              <p className="mt-1 text-xs text-[var(--color-ink-3)]">{c.note}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[0.9fr_1.6fr]">
          <Reveal className="flex flex-col justify-between rounded-[var(--radius-xl)] bg-[var(--color-espresso)] p-7 text-[var(--color-paper)]">
            <p className="u-label text-[var(--color-gold-2)]">Google reviews</p>
            <div className="mt-8">
              <p className="text-[4.4rem] font-extralight leading-none tracking-[-0.04em] [font-family:var(--font-outfit)]">{SITE.google.rating}<span className="text-2xl text-white/50">/5</span></p>
              <div className="mt-2 flex gap-1 text-[var(--color-gold-2)]" aria-label={`Rated ${SITE.google.rating} out of 5`}>
                {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}
              </div>
              <a href={SITE.google.url} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
                {SITE.google.count} reviews on Google <ArrowIcon />
              </a>
            </div>
          </Reveal>
          <Reveal delay={80} className="u-card flex flex-col justify-between p-7 md:p-10">
            <blockquote className="text-[clamp(1.3rem,2.2vw,1.9rem)] font-light leading-snug [font-family:var(--font-outfit)]">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <p className="mt-8 flex items-center gap-3 text-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-ground)] font-semibold">{r.name[0]}</span>
              <span><span className="font-semibold">{r.name}</span><br /><span className="text-[var(--color-ink-3)]">Google review</span></span>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 overflow-hidden border-y md:mt-20 border-[var(--color-line)] py-6" aria-label="Stones we cut and install">
        <p className="u-shell u-label mb-5 text-[var(--color-ink-3)]">Stones we cut and install</p>
        <div className="marquee gap-14 pr-14">
          {[...STONES, ...STONES].map((t, i) => (
            <span key={i} className="flex shrink-0 items-baseline gap-3 whitespace-nowrap" aria-hidden={i >= STONES.length}>
              <span className="text-[1.35rem] font-light [font-family:var(--font-outfit)]">{t}</span>
              <span className="text-[var(--color-gold)]" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
