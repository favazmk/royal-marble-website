import type { MetadataRoute } from 'next';

import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'about/', 'services/', 'materials/', 'projects/', 'contact/'];
  return pages.map((p) => ({
    url: `${SITE.url}/${p}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.8,
  }));
}
