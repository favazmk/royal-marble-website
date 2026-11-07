/* All site copy that is data rather than layout lives here. */

export type Material = {
  id: string;
  name: string;
  accent: string;
  family: string;
  texture: string;
  /** The stone in use — materials page only; `texture` feeds the 3D slab on home. */
  photo: string;
  tone: string;
  body: string;
  uses: string[];
};

export const MATERIALS: Material[] = [
  {
    id: 'calacatta',
    name: 'Calacatta Gold',
    accent: 'Calacatta',
    family: 'Natural marble',
    texture: '/img/stone/calacatta.webp',
    photo: '/img/materials/calacatta.webp',
    tone: '#efe7dc',
    body: 'Bright warm white with bold grey and gold-beige veining. Book-matched slab to slab for feature walls, islands and statement floors.',
    uses: ['Feature walls', 'Kitchen islands', 'Bathrooms'],
  },
  {
    id: 'nero',
    name: 'Nero Black & Gold',
    accent: 'Nero',
    family: 'Natural marble',
    texture: '/img/stone/blackgold.webp',
    photo: '/img/materials/nero.webp',
    tone: '#1d1714',
    body: 'Deep black marble crossed with flowing veins of gold. Made for lobbies, staircases and surfaces that should stop people mid-step.',
    uses: ['Staircases', 'Lobbies', 'Countertops'],
  },
  {
    id: 'emerald',
    name: 'Verde Emerald',
    accent: 'Emerald',
    family: 'Natural marble',
    texture: '/img/stone/emerald.webp',
    photo: '/img/materials/emerald.webp',
    tone: '#16392b',
    body: 'Rich green marble with white and jade veins. A jewel for reception desks, bars, vanities and luxury hospitality interiors.',
    uses: ['Reception desks', 'Vanities', 'Hospitality'],
  },
  {
    id: 'travertine',
    name: 'Travertine Navona',
    accent: 'Travertine',
    family: 'Natural stone',
    texture: '/img/stone/travertine.webp',
    photo: '/img/materials/travertine.webp',
    tone: '#cdb48f',
    body: 'Warm honey travertine with horizontal strata. Filled and honed for facades, pool decks, spa interiors and calm, sunlit floors.',
    uses: ['Facades', 'Pool decks', 'Floors'],
  },
  {
    id: 'azul',
    name: 'Azul Macaubas',
    accent: 'Azul',
    family: 'Exotic quartzite',
    texture: '/img/stone/azul.webp',
    photo: '/img/materials/azul.webp',
    tone: '#1f3c66',
    body: 'Rare blue quartzite with waves of white and silver. Harder than marble, for signature countertops and bespoke one-off pieces.',
    uses: ['Signature counters', 'Bars', 'Bespoke pieces'],
  },
];

export const MATERIAL_FAMILIES = [
  {
    title: 'Marble',
    body: 'Calacatta, Carrara, Statuario, Nero Marquina, Emperador and Verde — matched block by block to your approved sample.',
  },
  {
    title: 'Granite & quartz',
    body: 'Dense, stain-resistant surfaces for kitchens, high-traffic floors, stair treads and exterior paving.',
  },
  {
    title: 'Natural stone',
    body: 'Travertine, limestone, sandstone and exotic quartzites for facades, landscaping and feature walls.',
  },
  {
    title: 'Porcelain & ceramic',
    body: 'Large-format porcelain slabs and tiles, including Cosentino surfaces, for floors, cladding and ventilated facades.',
  },
];

export type Service = {
  id: string;
  title: string;
  short: string;
  body: string;
  /** Home bento render. */
  image: string;
  /** Real site photography for the services page. */
  photo: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: 'cladding',
    title: 'Wall cladding',
    short: 'Interior and exterior marble and stone cladding.',
    body: 'Book-matched feature walls, lobby cladding and full-height stone panelling, cut in our factory and fixed by our own masons with mechanical or adhesive systems to suit the substrate.',
    image: '/img/services/bathroom.webp',
    photo: '/img/work/bookmatch-wall.webp',
    points: ['Book-matched panels', 'Mechanical & adhesive fixing', 'Interior and exterior'],
  },
  {
    id: 'flooring',
    title: 'Flooring',
    short: 'Polished, honed and patterned stone floors.',
    body: 'Large-format marble and porcelain floors with razor-thin joints, inlays and borders — levelled, laid, ground and polished on site to a mirror or honed finish.',
    image: '/img/services/hall.webp',
    photo: '/img/work/lobby-inlay.webp',
    points: ['Inlays & borders', 'On-site grinding & polishing', 'Large-format porcelain'],
  },
  {
    id: 'countertops',
    title: 'Countertops & vanities',
    short: 'Kitchens, islands and vanities in stone and quartz.',
    body: 'Waterfall islands, mitred edges, integrated sinks and vanities in marble, granite, quartz and porcelain, templated on site and finished in our Umm Al Quwain factory.',
    image: '/img/services/kitchen.webp',
    photo: '/img/work/kitchen-calacatta.webp',
    points: ['Waterfall & mitred edges', 'Templated on site', 'Marble, quartz, granite'],
  },
  {
    id: 'facades',
    title: 'Ventilated facades',
    short: 'Engineered stone and porcelain facade systems.',
    body: 'Rockany® ventilated facade systems in porcelain, natural stone, terracotta and fibre-cement, on aluminium sub-frames with stainless-steel fixings — designed, supplied and installed.',
    image: '/img/services/facade.webp',
    photo: '/img/work/villa-white.webp',
    points: ['Rockany® SA6, CA, RA, Undercut', 'Aluminium sub-frames', 'Design to installation'],
  },
  {
    id: 'stairs',
    title: 'Staircases & steps',
    short: 'Treads, risers and floating stairs in solid stone.',
    body: 'Solid and cladded stone staircases, floating treads, stringers and landings — cut to the millimetre, edge-profiled and installed with anti-slip finishes where needed.',
    image: '/img/services/stair.webp',
    photo: '/img/services/stair-floating.webp',
    points: ['Floating treads', 'Edge profiling', 'Anti-slip finishes'],
  },
  {
    id: 'mosaic',
    title: 'Mosaic & decorative',
    short: 'Waterjet inlays, mosaics and carved stonework.',
    body: 'Waterjet-cut medallions, mosaics, carved panels and bespoke decorative pieces that turn a surface into the detail people remember.',
    image: '/img/services/mosaic.webp',
    photo: '/img/work/factory-waterjet.webp',
    points: ['Waterjet medallions', 'Mosaics', 'Bespoke carving'],
  },
];

export const FACADE_SYSTEMS = [
  {
    id: 'sa6',
    short: 'Light, fast and precise — the go-to for large porcelain elevations.',
    code: 'SA6',
    name: 'Rockany® SA6 System',
    body: 'Aluminium sub-frame assembled vertically and horizontally with stainless-steel fasteners, carrying 6 mm porcelain panels. Light, fast and precise for large elevations.',
    tags: ['Aluminium frame', '6 mm porcelain', 'Stainless fixings'],
    image: '/img/facade/sa6.webp',
    detail: '/img/facade/sa6-detail.webp',
  },
  {
    id: 'ca',
    short: 'Continuous rails that carry porcelain, terracotta or stone panels.',
    code: 'CA',
    name: 'Rockany® CA Railing',
    body: 'Fixed on vertical aluminium T-profiles to hold the facade panel on continuous rails. Recommended for porcelain, terracotta and natural stone.',
    tags: ['Vertical T-profile', 'Porcelain · terracotta · stone', 'Rail system'],
    image: '/img/facade/ca.webp',
    detail: '/img/facade/ca-detail.webp',
  },
  {
    id: 'ra',
    short: 'Independently adjustable clips for heavy natural-stone panels.',
    code: 'RA',
    name: 'Rockany® RA Clip',
    body: 'Visible or concealed clips fixed on vertical aluminium T and L profiles to hold natural stone panels with independent adjustment.',
    tags: ['T & L profiles', 'Natural stone', 'Clip system'],
    image: '/img/facade/ra.webp',
    detail: '/img/facade/ra-detail.webp',
  },
  {
    id: 'uc',
    short: 'No visible fixings at all — just clean, uninterrupted joints.',
    code: 'UC',
    name: 'Rockany® Undercut',
    body: 'Concealed undercut anchors on an aluminium rail system for natural stone, porcelain and fibre-cement panels — no visible fixings, clean joints.',
    tags: ['Concealed anchors', 'Stone · porcelain · fibre-cement', 'Invisible fixing'],
    image: '/img/facade/uc.webp',
    detail: '/img/facade/uc-detail.webp',
  },
];

export type ProjectCategory = 'High-rise' | 'Residential' | 'Hospitality' | 'Commercial' | 'Public';

export type Project = {
  id: string;
  name: string;
  location: string;
  category: ProjectCategory;
  scope: string;
  image: string;
};

export const PROJECTS: Project[] = [
  { id: 'najmat-towers', name: 'Najmat Towers', location: 'Al Reem Island, Abu Dhabi', category: 'High-rise', scope: 'Facade stone cladding', image: '/img/projects/reem-towers.webp' },
  { id: 'marsa-al-arab', name: 'Marsa Al Arab', location: 'Jumeirah, Dubai', category: 'Hospitality', scope: '3D porcelain curved tiles & marble flooring', image: '/img/projects/marsa-al-arab.webp' },
  { id: 'quay-villas', name: 'Quay Villas', location: 'Marsa Al Arab, Dubai', category: 'Residential', scope: 'External porcelain cladding', image: '/img/projects/quay-villas.webp' },
  { id: 'spanish-pavilion', name: 'Spanish Pavilion', location: 'Expo 2020, Dubai', category: 'Public', scope: 'Wall panelling', image: '/img/projects/spain-pavilion-2.webp' },
  { id: 'nour-tower', name: 'Nour Tower', location: 'Downtown Dubai', category: 'High-rise', scope: 'Stone & porcelain cladding', image: '/img/projects/nour-tower.webp' },
  { id: 'etisalat', name: 'Etisalat Building', location: 'Sharjah', category: 'Commercial', scope: 'Facade cladding', image: '/img/projects/etisalat-1.webp' },
  { id: 'facebook-hq', name: 'TECOM Site A — Facebook', location: 'Dubai', category: 'Commercial', scope: 'Facade cladding', image: '/img/projects/facebook-2.webp' },
  { id: 'firmenich', name: 'Firmenich Building', location: 'Al Barsha 3, Dubai', category: 'Commercial', scope: 'Stone facade', image: '/img/projects/firmenich-1.webp' },
  { id: 'dubai-hills-black', name: 'Dubai Hills Villa', location: 'Dubai Hills Estate', category: 'Residential', scope: 'Black marble cladding', image: '/img/projects/dubai-hills-villa-black.webp' },
  { id: 'palm-jumeirah', name: 'Palm Jumeirah Villa', location: 'Palm Jumeirah, Dubai', category: 'Residential', scope: 'Porcelain & stone facade', image: '/img/projects/palm-jumeirah-villa.webp' },
  { id: 'raha-beach', name: 'Raha Beach', location: 'Abu Dhabi', category: 'Residential', scope: 'Facade cladding', image: '/img/projects/raha-beach.webp' },
  { id: 'red-sea', name: 'Red Sea Project', location: 'Saudi Arabia', category: 'Hospitality', scope: 'Stone decking & pool surrounds', image: '/img/projects/redsea-1.webp' },
  { id: 'shcc', name: 'Sharjah Healthcare City', location: 'Sharjah', category: 'Public', scope: 'Facade cladding', image: '/img/projects/shcc-1.webp' },
  { id: 'gate-avenue', name: 'Gate Avenue', location: 'DIFC, Dubai', category: 'Commercial', scope: 'Timber-look porcelain cladding', image: '/img/projects/gate-avenue-1.webp' },
  { id: 'utmost', name: 'Utmost Showroom', location: 'Dubai', category: 'Commercial', scope: 'Showroom cladding', image: '/img/projects/utmost-1.webp' },
  { id: 'um-al-sheif', name: 'Jumeirah Villa', location: 'Um Al Sheif, Dubai', category: 'Residential', scope: 'Stone cladding', image: '/img/projects/villa-umalsheif-1.webp' },
  { id: 'dubai-hills-classical', name: 'Dubai Hills Classical Villa', location: 'Dubai Hills Estate', category: 'Residential', scope: 'Marble & stone works', image: '/img/projects/dubai-hills-villa-classical.webp' },
  { id: 'dubai-hills-stone', name: 'Dubai Hills Stone Villa', location: 'Dubai Hills Estate', category: 'Residential', scope: 'Natural stone cladding', image: '/img/projects/dubai-hills-villa-stone.webp' },
  { id: 'dubai-hills-commercial', name: 'Dubai Hills Commercial', location: 'Dubai Hills Estate', category: 'Commercial', scope: 'Marble & stone works', image: '/img/projects/dubai-hills-commercial.webp' },
];

/** Recent site photography from the client's own shoot — home page only, so nothing repeats the project archive. */
export const WORK = [
  { id: 'lobby', title: 'Residential tower lobby', scope: 'Book-matched marble walls & polished floors', category: 'Residential', image: '/img/work/lobby-blue.webp' },
  { id: 'vanity', title: 'Calacatta double vanity', scope: 'Templated, mitred & installed', category: 'Interiors', image: '/img/work/vanity-calacatta.webp' },
  { id: 'facade', title: 'Mid-rise apartment block', scope: 'Large-format porcelain facade', category: 'Facades', image: '/img/work/facade-apartment.webp' },
  { id: 'inlay', title: 'Waterjet floor inlay', scope: 'Nero bands set in white marble', category: 'Flooring', image: '/img/work/floor-inlay.webp' },
  { id: 'reception', title: 'Reception & entrance hall', scope: 'Marble desk, walls and floor', category: 'Commercial', image: '/img/work/reception.webp' },
  { id: 'columns', title: 'Lit marble columns', scope: 'Cladding with integrated light lines', category: 'Interiors', image: '/img/work/column-detail.webp' },
  { id: 'lounge', title: 'Lobby lounge', scope: 'Polished stone floor, full-height cladding', category: 'Residential', image: '/img/work/lounge.webp' },
  { id: 'tables', title: 'Stone-topped tables', scope: 'Bespoke cut-to-shape tops', category: 'Bespoke', image: '/img/work/tables-detail.webp' },
];

/** From the pre-qualification record of completed packages. Values withheld on purpose. */
export const TRACK_RECORD = [
  { project: 'Capriole Construction', client: 'Al Diyar International Stone Fixing Works' },
  { project: 'Al Reem Island — Najmat Towers', client: 'Al Diyar International Stone Fixing Works' },
  { project: 'TECOM Site A — Facebook', client: 'CONDOR – Al Lailac Marble Cutting' },
  { project: 'TECOM — BTS — Firmenich', client: 'Al Ashram Contracting L.L.C.' },
  { project: 'EXPO 2020 — Spain Pavilion', client: 'RIMOND Middle East Gen. Contr. LLC' },
  { project: 'Sharjah Healthcare City', client: 'United Engineering Construction' },
  { project: 'Victoria International School, Khorfakkan', client: 'United Engineering Construction · Darwish Engineering' },
  { project: 'Red Crescent Medical Center, Sharjah', client: 'Al Hazaa Building Contracting Co.' },
  { project: 'Marsa Al Arab — Quay Villas', client: 'Technical Glass & Aluminum Co.' },
  { project: 'Riggat Al Buteen Commercial & Residential Tower', client: 'Alrostamani Pegel' },
  { project: 'Noble Tower', client: 'Granitech Building Materials Trading LLC' },
  { project: 'Private villas — Al Khawaneej, Nad Al Shiba, District One', client: 'CUBE · Ghayathi Construction · MJU Engineering' },
];

export const PROCESS = [
  { n: '01', title: 'Brief & consultation', body: 'We discuss the scope, budget and timeline, and help you shape a clear specification for every stone element.' },
  { n: '02', title: 'Survey & samples', body: 'We study the drawings, measure on site, recommend materials and fixing systems, and approve physical samples with you.' },
  { n: '03', title: 'Selection & costing', body: 'Blocks and slabs are selected, numbered and labelled against the approved sample. You receive a clear quotation and programme.' },
  { n: '04', title: 'Cutting & fabrication', body: 'Cut, ground and polished in our Umm Al Quwain factory, with QA/QC checks on thickness, finish and veining at every stage.' },
  { n: '05', title: 'Delivery & installation', body: 'Careful packing and delivery, then precise fixing by our own masons and tile setters, sequenced to your site programme.' },
  { n: '06', title: 'Snagging & handover', body: 'Joint inspection, snag list, final clean and seal. Photo documentation and a complete, on-time handover.' },
];

export const CERTIFICATIONS = [
  { code: 'ISO 9001:2015', title: 'Quality management', note: 'Cert. RM260110QM21A · valid to Jan 2029' },
  { code: 'ISO 14001:2015', title: 'Environmental management', note: 'Cert. RM260110EM21A · valid to Jan 2029' },
  { code: 'ISO 45001:2018', title: 'Occupational health & safety', note: 'Cert. RM260110HM21A · valid to Jan 2029' },
  { code: 'Cosentino', title: 'Recommended fabricator & installer', note: 'Letter of recommendation' },
];

export const FAQ = [
  {
    q: 'Do you supply only, or supply and install?',
    a: 'Both. We can supply cut-to-size material from our factory, or take the full package — survey, fabrication, delivery, installation, snagging and handover — with our own installation teams.',
  },
  {
    q: 'Where is your factory and do you work across the UAE?',
    a: 'Our factory and showroom are in Umm Al Thuoob, Umm Al Quwain, and our head office is in Business Bay, Dubai. We deliver projects across all seven emirates and have also supplied work in Saudi Arabia.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope and material availability. Residential packages are often fabricated in two to six weeks; larger facade and high-rise packages are programmed with the main contractor. You get a written programme with your quotation.',
  },
  {
    q: 'Which stones and surfaces can you work with?',
    a: 'Natural marble, granite, quartz, quartzite, travertine, limestone and other natural stones, plus porcelain, ceramic and engineered surfaces such as Cosentino. Local and imported.',
  },
  {
    q: 'How do you make sure the stone matches the sample?',
    a: 'Every block and slab is selected and identified against the approved sample, numbered and labelled through cutting and finishing, so what arrives on site is what you approved.',
  },
  {
    q: 'Are you certified?',
    a: 'Yes. Royal Marble Factory is certified to ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018, fully insured, and recommended by Cosentino as a fabricator and installer.',
  },
];

export const REVIEWS = [
  {
    name: 'Nisar Ahmad',
    text: 'Royal Marble offers premium quality and elegant natural stone with exceptional craftsmanship and service. Truly a reliable choice for any project — had a great experience with them!',
  },
];
