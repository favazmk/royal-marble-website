export const SITE = {
  name: 'Royal Marble',
  legalName: 'Royal Marble Factory L.L.C',
  tagline: 'We realise your dreams',
  url: 'https://royalmarble.ae',
  description:
    'Marble, granite, quartz and stone — supplied, cut, polished and installed across the UAE from our ISO-certified factory in Umm Al Quwain.',
  founded: 2019,
  phone: '+971 56 133 5885',
  phoneHref: 'tel:+971561335885',
  landline: '+971 6 539 5147',
  landlineHref: 'tel:+97165395147',
  fax: '+971 6 531 7340',
  email: 'salam@royalmarble.ae',
  whatsapp: '971561335885',
  contactPerson: 'Mr. Salam Daou',
  contactRole: 'General Manager',
  factory: {
    label: 'Factory & showroom',
    street: 'Al Ramla Street, Plot 5',
    area: 'Umm Al Thuoob 1, New Industrial Area',
    city: 'Umm Al Quwain',
    country: 'AE',
    lat: 25.5448095,
    lng: 55.7084707,
    directions: 'https://www.google.com/maps/dir/?api=1&destination=25.5448095,55.7084707',
  },
  office: {
    label: 'Head office',
    street: 'Prime Tower, 17th Floor, Office 25',
    area: 'Business Bay',
    city: 'Dubai',
    country: 'AE',
  },
  google: {
    rating: 4.2,
    count: 10,
    url: 'https://www.google.com/maps/place/Royal+Marble+Factory+LLC/@25.5448095,55.7084707,17z/data=!4m6!3m5!1s0x3ef5e5605077bacf:0x19f70ea7f073f7dc!8m2!3d25.5448095!4d55.7084707!16s%2Fg%2F11g_x9cz67',
  },
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/materials', label: 'Materials & Facades' },
  { href: '/projects', label: 'Projects' },
] as const;

export const STATS = [
  { value: 2019, label: 'Factory established', suffix: '' },
  { value: 18, label: 'Major contracts delivered', suffix: '+' },
  { value: 15, label: 'In completed stone packages', prefix: 'AED ', suffix: 'M+' },
  { value: 3, label: 'ISO certifications', suffix: '' },
] as const;

export function whatsappLink(text = 'Hello Royal Marble, I would like a quotation for a project.') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
