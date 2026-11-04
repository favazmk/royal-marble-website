import Link from 'next/link';

import { STATS } from '@/lib/site';
import { Counter, Parallax, ScrubText } from '@/components/ui/motion';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';

const STAT_TONES = [
  { stone: 'Calacatta', bg: '#f3ece2', ring: 'rgb(180 142 85 / 0.28)', accent: '#8d6a37', object: '/img/objects/sphere.webp', dark: false },
  { stone: 'Travertine', bg: '#ead8bb', ring: 'rgb(141 106 55 / 0.25)', accent: '#7a5a2c', object: '/img/objects/discs.webp', dark: false },
  { stone: 'Nero', bg: '#1d1714', ring: 'rgb(214 180 122 / 0.22)', accent: '#d6b47a', object: '/img/objects/cube.webp', dark: true },
  { stone: 'Verde', bg: '#d9e3dc', ring: 'rgb(22 57 43 / 0.2)', accent: '#16392b', object: '/img/objects/arch.webp', dark: false },
];

/** Who we are: a scroll-lit statement, then a bento of proof (reference row 2). */
export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="u-shell pb-8 pt-24 md:pt-36">
      <h2 id="intro-title" className="sr-only">About Royal Marble</h2>
      <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr]">
        <p className="u-label flex items-start gap-3 text-[var(--color-ink-2)]">
          <span className="mt-[0.45em] h-px w-8 bg-current opacity-60" aria-hidden="true" />
          Who we are
        </p>
        <ScrubText
          className="text-[clamp(1.7rem,3.6vw,3.3rem)] font-light leading-[1.14] tracking-[-0.02em] [font-family:var(--font-outfit)]"
          text="Founded by a couple who see marble not as stone, but as *art.* From concept and selection to cutting, polishing and a flawless installation — every stage happens in-house, under one roof, on time and to the finest detail."
        />
      </div>

      <div className="mt-16 grid gap-3 md:mt-24 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.9fr]">
        {/* Card: factory story */}
        <Reveal className="u-card group relative flex flex-col justify-between overflow-hidden p-6 md:p-8 lg:row-span-2">
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
          <Parallax className="mt-8 aspect-[4/3] rounded-[var(--radius-lg)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/services/factory.webp" alt="CNC bridge saw cutting a Calacatta marble slab under a curtain of cooling water in the Royal Marble factory" className="h-full w-full object-cover" loading="lazy" width={1536} height={1024} />
          </Parallax>
          <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            Inside the factory <span className="icon-btn !h-8 !w-8 !bg-[var(--color-ink)] !text-white"><ArrowIcon /></span>
          </Link>
        </Reveal>

        {/* Stats: one stone per card, a polished object breaking out of the corner */}
        {STATS.map((s, i) => {
          const t = STAT_TONES[i];
          return (
            <Reveal key={s.label} delay={i * 70} className={`stat-card group ${t.dark ? 'stat-dark' : ''}`} style={{ '--tint': t.bg, '--ring': t.ring, '--accent': t.accent } as React.CSSProperties}>
              <span aria-hidden="true" className="stat-ring" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.object} alt="" aria-hidden="true" className="stat-object" loading="lazy" width={512} height={512} />
              <span className="stat-chip">0{i + 1} · {t.stone}</span>
              <div className="relative mt-auto pt-16">
                <p className="text-[clamp(2.8rem,5vw,4.4rem)] font-extralight leading-none tracking-[-0.04em] [font-family:var(--font-outfit)]">
                  <Counter to={s.value} prefix={'prefix' in s ? s.prefix : ''} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm opacity-75">{s.label}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
