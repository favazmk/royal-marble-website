import Link from 'next/link';

import { Parallax } from '@/components/ui/motion';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';
import { JsonLd } from '@/components/layout/JsonLd';
import { SITE } from '@/lib/site';

/**
 * Inner-page hero in the reference's card language: a rounded photo panel,
 * small headline top-left, giant word on the baseline, glass card bottom-right.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  mega,
  image,
  alt,
  card,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  mega: string;
  image: string;
  alt: string;
  card?: { text: string; href: string; cta: string };
}) {
  return (
    <section className="u-shell pt-[5.6rem] md:pt-28">
      <div className="relative isolate min-h-[min(88svh,52rem)] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-espresso)] text-[var(--color-paper)]">
        <Parallax className="absolute inset-0 -z-10" amount={10}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} className="h-full w-full object-cover" fetchPriority="high" />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/45 to-transparent" />

        <div className="flex min-h-[inherit] flex-col p-6 md:p-10">
          <Reveal className="max-w-[34rem]">
            <p className="u-label text-[var(--color-gold-2)]">{eyebrow}</p>
            <h1 className="mt-4 text-[clamp(2.1rem,4.4vw,3.8rem)]">{title}</h1>
            <p className="mt-4 max-w-md text-white/75">{intro}</p>
          </Reveal>

          <div className="mt-auto flex flex-col gap-6 pt-16 md:flex-row md:items-end md:justify-between">
            <p
              aria-hidden="true"
              className="select-none leading-[0.78] tracking-[-0.05em] text-[var(--color-paper)]"
              style={{ fontFamily: 'var(--font-outfit)', fontWeight: 200, fontSize: 'clamp(4rem, 13vw, 13rem)' }}
            >
              {mega}
            </p>
            {card ? (
              <Reveal delay={150} className="md:w-[20rem] md:shrink-0">
                <Link href={card.href} className="group u-glass block rounded-[var(--radius-lg)] p-5 text-[var(--color-ink)]">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[0.95rem] font-medium leading-snug">{card.text}</p>
                    <span className="icon-btn shrink-0 !bg-[var(--color-ink)] !text-white"><ArrowIcon /></span>
                  </div>
                  <p className="mt-4 text-xs text-[var(--color-ink-2)]">{card.cta}</p>
                </Link>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Home', href: '/' }, ...items].map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: `${SITE.url}${it.href}`,
        })),
      }}
    />
  );
}
