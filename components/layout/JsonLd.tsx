import { SITE } from '@/lib/site';

/** Organisation + LocalBusiness graph for the whole site. */
export function SiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#org`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: `${SITE.url}/brand/logo-gold.png`,
        foundingDate: String(SITE.founded),
        email: SITE.email,
        telephone: SITE.phone,
        slogan: 'We realise your dreams',
        hasCredential: ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'].map((name) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'certification',
          name,
        })),
      },
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': `${SITE.url}/#factory`,
        name: `${SITE.name} Factory`,
        parentOrganization: { '@id': `${SITE.url}/#org` },
        image: `${SITE.url}/img/og.jpg`,
        url: SITE.url,
        telephone: SITE.phone,
        email: SITE.email,
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${SITE.factory.street}, ${SITE.factory.area}`,
          addressLocality: SITE.factory.city,
          addressRegion: 'Umm Al Quwain',
          addressCountry: 'AE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: SITE.factory.lat, longitude: SITE.factory.lng },
        areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'].map((name) => ({ '@type': 'City', name })),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: SITE.google.rating, reviewCount: SITE.google.count },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '18:00' },
        ],
        knowsAbout: ['Marble', 'Granite', 'Quartz', 'Porcelain', 'Natural stone', 'Stone cladding', 'Ventilated facades', 'Countertops'],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE.url}/#office`,
        name: `${SITE.name} — Head Office`,
        parentOrganization: { '@id': `${SITE.url}/#org` },
        telephone: SITE.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.office.street,
          addressLocality: 'Business Bay, Dubai',
          addressCountry: 'AE',
        },
      },
      { '@type': 'WebSite', '@id': `${SITE.url}/#web`, url: SITE.url, name: SITE.name, publisher: { '@id': `${SITE.url}/#org` } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }) }} />;
}
