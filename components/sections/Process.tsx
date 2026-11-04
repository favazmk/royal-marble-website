import { PROCESS } from '@/content/data';
import { Reveal } from '@/components/ui/Reveal';
import { Heading } from '@/components/ui/Heading';
import { LineIcon } from '@/components/ui/icons';

const ICONS = ['chat', 'ruler', 'layers', 'blade', 'truck', 'check'];

/** "Transparent process" — six frosted steps on a dark stone ground; each lifts and lights gold on hover. */
export function Process({ title = ['A transparent process,', '*start to finish.*'] }: { title?: string[] }) {
  return (
    <section aria-labelledby="process-title" className="u-shell py-12 md:py-20">
      <div className="grain relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-night)] p-5 md:p-10 lg:p-14">
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(214_180_122/0.18),transparent_65%)]" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading id="process-title" eyebrow="How we work" lines={title} light />
          <Reveal className="max-w-sm text-sm text-white/60">
            <p>Six stages, one team, one programme — every step signed off with you before the next one starts.</p>
          </Reveal>
        </div>
        <ol className="relative mt-10 grid gap-3 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={(i % 3) * 90}>
              <div className="step-card sheen group">
                <div className="flex items-start justify-between">
                  <span className="step-icon"><LineIcon name={ICONS[i]} /></span>
                  <span className="step-n text-[2.4rem] font-extralight leading-none tracking-[-0.04em] text-white/35 [font-family:var(--font-outfit)]">{s.n}</span>
                </div>
                <h3 className="mt-10 text-[1.25rem] font-normal leading-tight">{s.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-white/65">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
