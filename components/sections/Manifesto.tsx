import Link from 'next/link';

import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';

const POINTS = [
  'Backed by extensive industry experience, we bring expertise, reliability, and uncompromising quality to every project.',
  'Combining technical expertise, precision engineering, and superior craftsmanship, we deliver complete solutions — from design development and material selection to fabrication and professional installation.',
  'Our advanced facade systems combine innovative engineering with exceptional aesthetics, ensuring lasting performance and architectural distinction.',
  'From intricate architectural details to large-scale developments, we deliver precision, consistency, and excellence at every stage.',
  'From luxury villas to landmark commercial developments, every detail reflects our commitment to quality, durability, and architectural excellence.',
];

/** Client-supplied brand statement on facades and natural stone cladding. */
export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="u-shell py-16 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr]">
        <Reveal as="p" className="u-label flex items-start gap-3 text-[var(--color-ink-2)]">
          <span className="mt-[0.45em] h-px w-8 bg-current opacity-60" aria-hidden="true" />
          Our promise
        </Reveal>
        <div>
          <Reveal>
            <h2 id="manifesto-title" className="text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.1] tracking-[-0.02em] [font-family:var(--font-outfit)]">
              Exceptional architecture deserves an <span className="u-gold-text">exceptional facade.</span>
            </h2>
          </Reveal>
          <Reveal as="p" delay={80} className="mt-6 max-w-3xl text-lg text-[var(--color-ink-2)]">
            At Royal Marble, we transform architectural visions into remarkable exteriors through premium natural stone and advanced facade cladding solutions.
          </Reveal>
        </div>
      </div>

      <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((p, i) => (
          <Reveal key={i} delay={i * 60} className="u-card flex flex-col gap-6 p-6 md:p-8">
            <span className="u-label text-[var(--color-ink-3)]">0{i + 1}</span>
            <p className="text-[var(--color-ink-2)]">{p}</p>
          </Reveal>
        ))}
        <Reveal delay={POINTS.length * 60} className="u-card flex flex-col justify-between gap-6 bg-[var(--color-espresso)] p-6 text-[var(--color-paper)] md:p-8">
          <p className="text-xl font-light [font-family:var(--font-outfit)]">
            Royal Marble — <span className="u-gold-text">Engineering Excellence. Defining Elegance.</span>
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold">
            Contact us to elevate your next project. <span className="icon-btn !h-8 !w-8 !bg-[var(--color-paper)] !text-[var(--color-ink)]"><ArrowIcon /></span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
