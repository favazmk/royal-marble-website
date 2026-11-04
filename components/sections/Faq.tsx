import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { PlusIcon } from '@/components/ui/icons';

/** Native <details> accordion: works without JS, readable by crawlers. */
export function Faq({ items, title = ['Questions,', '*answered.*'] }: { items: { q: string; a: string }[]; title?: string[] }) {
  return (
    <section aria-labelledby="faq-title" className="u-shell py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Heading id="faq-title" eyebrow="FAQ" lines={title} />
        <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.1rem] font-medium md:text-[1.2rem]">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-card)] transition-transform duration-500 group-open:rotate-45 group-open:bg-[var(--color-ink)] group-open:text-white">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="max-w-2xl pb-1 pt-3 text-[var(--color-ink-2)]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
