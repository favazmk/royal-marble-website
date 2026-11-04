import { PROCESS } from '@/content/data';
import { Reveal } from '@/components/ui/Reveal';
import { PlusIcon } from '@/components/ui/icons';

/** "Transparent process" — six numbered cards joined by + connectors (reference footer block). */
export function Process({ title = 'A transparent process, start to finish.' }: { title?: string }) {
  return (
    <section aria-labelledby="process-title" className="u-shell py-12 md:py-20">
      <div className="u-card p-5 md:p-10 lg:p-14">
        <div className="flex items-start justify-between gap-6">
          <Reveal>
            <h2 id="process-title" className="max-w-[18ch] text-[length:var(--text-headline)]">{title}</h2>
          </Reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/mark-ink.webp" alt="" width={48} height={32} className="hidden h-8 w-auto opacity-70 md:block" />
        </div>
        <ol className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={(i % 3) * 90} className="relative">
              <div className="group h-full rounded-[var(--radius-lg)] bg-[var(--color-paper)] p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgb(38_27_22/0.45)]">
                <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-4">
                  <h3 className="max-w-[14ch] text-[1.2rem] font-normal leading-tight">{s.title}</h3>
                  <span className="text-[2.6rem] font-extralight leading-[0.8] tracking-[-0.04em] text-[var(--color-ink)] transition-colors duration-500 group-hover:text-[var(--color-gold)] [font-family:var(--font-outfit)]">{s.n}</span>
                </div>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--color-ink-2)]">{s.body}</p>
              </div>
              {i % 3 !== 2 ? (
                <span aria-hidden="true" className="absolute -right-[1.05rem] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-espresso)] text-white lg:grid">
                  <PlusIcon />
                </span>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
