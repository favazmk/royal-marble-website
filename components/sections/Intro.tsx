import Link from 'next/link';

import { STATS } from '@/lib/site';
import { Counter, Parallax, ScrubText } from '@/components/ui/motion';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';

/** Who we are: a scroll-lit statement, then a bento of proof (reference row 2). */
export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="u-shell pb-8 pt-16 md:pt-36">
      <h2 id="intro-title" className="sr-only">About Royal Marble</h2>
      <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr]">
        <Reveal as="p" className="u-label flex items-start gap-3 text-[var(--color-ink-2)]">
          <span className="mt-[0.45em] h-px w-8 bg-current opacity-60" aria-hidden="true" />
          Who we are
        </Reveal>
        <ScrubText
          className="text-[clamp(1.7rem,3.6vw,3.3rem)] font-light leading-[1.14] tracking-[-0.02em] [font-family:var(--font-outfit)]"
          text="Founded by a couple who see marble not as stone, but as *art.* From concept and selection to cutting, polishing and a flawless installation — every stage happens in-house, under one roof, on time and to the finest detail."
        />
      </div>

      {/* Bento: on phones the factory card spans both columns, the two short
          stats sit side by side under it and the wide figure takes the full row. */}
      <div className="mt-12 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.9fr]">
        {/* Card: factory story */}
        <Reveal className="u-card group relative col-span-2 flex flex-col justify-between overflow-hidden p-5 md:col-span-1 md:p-8 lg:row-span-2">
          <div>
            <div className="flex items-start justify-between">
              <h3 className="max-w-[16ch] text-[clamp(1.6rem,2.4vw,2.2rem)]">A factory contractors <span className="u-gold-text">trust.</span></h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/mark-ink.webp" alt="" width={40} height={27} className="h-6 w-auto opacity-70" />
            </div>
            <ul className="mt-5 space-y-1 text-sm text-[var(--color-ink-2)]">
              <li>Luxury villas & residences</li>
              <li>High-rise & commercial facades</li>
              <li>Hospitality & retail interiors</li>
              <li>Public & government buildings</li>
            </ul>
          </div>
          <Parallax className="mt-6 aspect-[4/3] rounded-[var(--radius-lg)] md:mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/services/factory.webp" alt="CNC bridge saw cutting a Calacatta marble slab under a curtain of cooling water in the Royal Marble factory" className="h-full w-full object-cover" loading="lazy" width={1536} height={1024} />
          </Parallax>
          <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            Inside the factory <span className="icon-btn !h-8 !w-8 !bg-[var(--color-ink)] !text-white"><ArrowIcon /></span>
          </Link>
        </Reveal>

        {/* Stats */}
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 70} className={`u-card flex flex-col justify-between p-5 md:p-7 ${i === 2 ? 'bg-[var(--color-espresso)] text-[var(--color-paper)]' : ''}`}>
            <span className={`u-label ${i === 2 ? 'text-[var(--color-gold-2)]' : 'text-[var(--color-ink-3)]'}`}>0{i + 1}</span>
            <div className="mt-8 md:mt-10">
              {/* The prefixed figure (AED 15M+) is the long one: it gets a smaller
                  phone step so it never wraps in a half-width bento cell. Both
                  clamps cap at the same 4.4rem, so desktop is unchanged. */}
              <p className={`font-extralight leading-[1.05] tracking-[-0.04em] md:leading-none [font-family:var(--font-outfit)] ${'prefix' in s ? 'text-[clamp(1.5rem,6.2vw,4.4rem)]' : 'text-[clamp(2rem,8.6vw,4.4rem)]'}`}>
                <Counter to={s.value} prefix={'prefix' in s ? s.prefix : ''} suffix={s.suffix} />
              </p>
              <p className={`mt-2 text-[0.82rem] md:mt-3 md:text-sm ${i === 2 ? 'text-white/70' : 'text-[var(--color-ink-2)]'}`}>{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
