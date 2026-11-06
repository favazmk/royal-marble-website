import type { Metadata } from 'next';

import manifest from '@/public/film/manifest.json';
import chapterData from '@/content/film-chapters.json';
import { FAQ } from '@/content/data';
import { ScrollFilm } from '@/components/film/ScrollFilm';
import type { FilmManifest } from '@/components/film/useFrameLoader';
import { Intro } from '@/components/sections/Intro';
import { MaterialsStudio } from '@/components/sections/MaterialsStudio';
import { ServicesBento } from '@/components/sections/ServicesBento';
import { FacadeRail } from '@/components/sections/FacadeRail';
import { ProjectsRail } from '@/components/sections/ProjectsRail';
import { Trust } from '@/components/sections/Trust';
import { Faq } from '@/components/sections/Faq';
import { Cta } from '@/components/sections/Cta';
import { JsonLd } from '@/components/layout/JsonLd';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <ScrollFilm manifest={manifest as FilmManifest} chapters={chapterData.chapters} scrollLength={4} />
      <Intro />
      <MaterialsStudio />
      <ServicesBento />
      <FacadeRail />
      <ProjectsRail />
      <Trust />
      <Faq items={FAQ} />
      <Cta />
      <JsonLd
        data={{
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
    </>
  );
}
