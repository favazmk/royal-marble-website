import type { Metadata, Viewport } from 'next';
import { Manrope, Outfit } from 'next/font/google';

import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { PointerSheen } from '@/components/ui/PointerSheen';
import { SiteJsonLd } from '@/components/layout/JsonLd';
import { SITE } from '@/lib/site';

const outfit = Outfit({ subsets: ['latin'], weight: ['200', '300', '400', '500'], variable: '--font-outfit', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Royal Marble | Marble Factory & Installation, UAE',
    template: '%s | Royal Marble',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'marble factory UAE',
    'marble supplier Dubai',
    'marble installation Dubai',
    'stone cladding Dubai',
    'ventilated facade UAE',
    'granite and quartz countertops Dubai',
    'marble Umm Al Quwain',
    'porcelain cladding UAE',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_AE',
    url: SITE.url,
    title: 'Royal Marble — We realise your dreams in stone',
    description: SITE.description,
    images: [{ url: '/img/og.jpg', width: 1200, height: 630, alt: 'Polished marble slabs fanned out in a dark studio' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/brand/icon-192.png', apple: '/brand/apple-touch-icon.png' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#e9e6e1',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AE" className={`${outfit.variable} ${manrope.variable}`}>
      <body>
        <SiteJsonLd />
        <SmoothScroll />
        <PointerSheen />
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
