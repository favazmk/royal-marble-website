import type { NextConfig } from 'next';

// Fully static: every page pre-renders to HTML, so the site can be hosted on
// any static host (Hostinger, Vercel, S3). Enquiries go out over WhatsApp/email.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
