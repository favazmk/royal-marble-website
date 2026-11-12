import type { Metadata } from 'next';

import { TRACK_RECORD } from '@/content/data';
import { Breadcrumbs, PageHero } from '@/components/sections/PageHero';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Cta } from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Marble & Stone Projects Across the UAE',
  description:
    'Najmat Towers, Marsa Al Arab, Quay Villas, Expo 2020 Spanish Pavilion, Nour Tower and luxury villas in Dubai Hills and Palm Jumeirah.',
  alternates: { canonical: '/projects/' },
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Projects', href: '/projects/' }]} />
      <PageHero
        eyebrow="Selected work"
        title="Built across the Emirates."
        intro="High-rise facades, waterfront villas, hospitality and public landmarks — fabricated in our factory and installed by our own teams."
        mega="projects"
        image="/img/projects/hero.webp"
        alt="Contemporary villa clad in white large-format porcelain on a ventilated facade by Royal Marble"
        card={{ text: 'Your project could be next. Tell us what you are building.', href: '/contact', cta: 'Start a project ↗' }}
      />

      <section className="u-shell py-14 md:py-28" aria-label="Project gallery">
        <ProjectGrid />
      </section>

      <section className="u-shell pb-16" aria-labelledby="record">
        <Reveal className="u-card p-6 md:p-12">
          <Heading eyebrow="Track record" lines={['Completed packages for', '*leading contractors.*']} />
          <h2 id="record" className="sr-only">Completed packages</h2>
          <ul className="mt-10 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {TRACK_RECORD.map((t, i) => (
              <Reveal as="li" key={t.project} delay={i * 30} className="grid gap-1 py-4 md:grid-cols-[3rem_1.2fr_1fr] md:items-baseline md:gap-6">
                <span className="u-label tabular-nums text-[var(--color-ink-3)]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[1.15rem] font-light [font-family:var(--font-outfit)]">{t.project}</span>
                <span className="text-sm text-[var(--color-ink-2)]">{t.client}</span>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </section>

      <Cta image="/img/stone/carrara-slab.webp" body="Main contractor, consultant or homeowner — share the scope and we come back with a package price, samples and a fabrication schedule." title={['Your project', 'could be next.']} />
    </>
  );
}
