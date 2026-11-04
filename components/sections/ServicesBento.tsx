import Link from 'next/link';

import { SERVICES } from '@/content/data';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/motion';
import { ArrowIcon } from '@/components/ui/icons';

const SPAN = ['lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];

/** What we do — image cards with glass captions (reference row 3). */
export function ServicesBento() {
  return (
    <section aria-labelledby="svc-title" className="u-shell py-24 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Heading id="svc-title" eyebrow="What we do" lines={['Complete stone', '*capability.*']} />
        <Reveal className="max-w-md text-[var(--color-ink-2)]">
          <p>Supply only, or the full package. We template, cut, finish and install every stone element in a project — inside and out.</p>
          <Link href="/services" className="btn btn-ghost mt-6">All services <span className="btn-dot"><ArrowIcon /></span></Link>
        </Reveal>
      </div>

      <div className="mt-14 grid auto-rows-[minmax(16rem,auto)] gap-3 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[17rem]">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 80} className={`${SPAN[i]} [perspective:1200px]`}>
            <Tilt className="h-full" max={4}>
              <Link
                href={`/services#${s.id}`}
                className="sheen group relative flex h-full min-h-[16rem] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-espresso)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" className="zoom-img absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-3">
                  <div className="u-glass rounded-[var(--radius-md)] px-4 py-3">
                    <span className="u-label text-[var(--color-ink-3)]">0{i + 1}</span>
                    <h3 className="mt-1 text-[1.35rem] leading-tight">{s.title}</h3>
                    <p className="mt-1 max-w-[30ch] text-[0.82rem] text-[var(--color-ink-2)]">{s.short}</p>
                  </div>
                  <span className="icon-btn shrink-0"><ArrowIcon /></span>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
