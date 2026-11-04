import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="u-shell flex min-h-[80svh] flex-col items-start justify-center pt-28">
      <p className="u-label text-[var(--color-ink-3)]">404</p>
      <h1 className="mt-4 text-[length:var(--text-display)]">This slab is <span className="u-gold-text">missing.</span></h1>
      <p className="mt-4 max-w-md text-[var(--color-ink-2)]">The page you are looking for has moved or never existed.</p>
      <Link href="/" className="btn btn-dark mt-8">Back to home <span className="btn-dot">→</span></Link>
    </section>
  );
}
