import Link from 'next/link';

import { SERVICES } from '@/content/data';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/motion';
import { ArrowIcon } from '@/components/ui/icons';

/* Bento spans. On phones the grid is two columns: the lead service and the
   fourth take the full row, the rest pair up — four rows instead of six tall
   stacked cards. From md the original layout applies unchanged. */
const SPAN = [
  'col-span-2 md:col-span-1 lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'col-span-2 md:col-span-1 lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
];

/** What we do — image cards with glass captions (reference row 3). */
export function ServicesBento() {
  return (
    <section aria-labelledby="svc-title" className="u-shell py-16 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Heading id="svc-title" eyebrow="What we do" lines={['Complete stone', '*capability.*']} />
        <Reveal x={26} delay={120} className="max-w-md text-[var(--color-ink-2)]">
          <p>Supply only, or the full package. We template, cut, finish and install every stone element in a project — inside and out.</p>
          <Link href="/services" className="btn btn-ghost mt-6">All services <span className="btn-dot"><ArrowIcon /></span></Link>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-2 auto-rows-[minmax(11.5rem,auto)] gap-3 md:mt-14 md:auto-rows-[minmax(16rem,auto)] md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[17rem]">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 80} className={`${SPAN[i]} [perspective:1200px]`}>
            <Tilt className="h-full" max={4}>
              <Link
                href={`/services#${s.id}`}
                className="sheen group relative flex h-full min-h-[11.5rem] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-espresso)] md:min-h-[16rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" className="zoom-img absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="relative mt-auto flex w-full items-end justify-between gap-2 p-2.5 md:gap-3 md:p-3">
                  <div className="u-glass rounded-[var(--radius-md)] px-3 py-2.5 md:px-4 md:py-3">
                    <span className="u-label text-[var(--color-ink-3)]">0{i + 1}</span>
                    <h3 className="mt-1 text-[1.05rem] leading-tight md:text-[1.35rem]">{s.title}</h3>
                    {/* The one-line summary is desktop copy: in a half-width phone
                        cell it would be taller than the photo it sits on. */}
                    <p className="mt-1 hidden max-w-[30ch] text-[0.82rem] text-[var(--color-ink-2)] sm:block">{s.short}</p>
                  </div>
                  <span className="icon-btn !h-9 !w-9 shrink-0 md:!h-[2.4rem] md:!w-[2.4rem]"><ArrowIcon /></span>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
