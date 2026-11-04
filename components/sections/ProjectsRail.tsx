import Link from 'next/link';

import { WORK } from '@/content/data';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';

/** Recent work — an offset masonry of the client's own site photography. */
export function ProjectsRail() {
  return (
    <section aria-labelledby="work-title" className="u-shell py-24 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Heading id="work-title" eyebrow="Recent work" lines={['Fresh from', '*our sites.*']} />
        <Reveal className="max-w-md text-[var(--color-ink-2)]">
          <p>Lobbies, vanities, floors and facades — fabricated in our factory and installed by our own teams across the Emirates.</p>
          <Link href="/projects" className="btn btn-dark mt-6">All projects <span className="btn-dot"><ArrowIcon /></span></Link>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
        {WORK.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 70} className={i % 2 === 1 ? 'md:translate-y-16' : ''}>
            <div className="group">
              <div className="sheen relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-card)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`${p.title} — ${p.scope}, by Royal Marble`} className="zoom-img absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <span className="u-pill u-glass absolute left-3 top-3 !text-[0.68rem]">{p.category}</span>
              </div>
              <h3 className="mt-3 text-[1.1rem] leading-tight md:text-[1.25rem]">{p.title}</h3>
              <p className="text-[0.8rem] text-[var(--color-ink-2)]">{p.scope}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
