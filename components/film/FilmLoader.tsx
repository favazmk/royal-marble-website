'use client';

/** The wait for the opening frames is the first brand impression, not a spinner. */
export function FilmLoader({ progress, failed }: { progress: number; failed: boolean }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[var(--color-night)]/80 text-[var(--color-paper)] backdrop-blur-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-gold.webp" alt="" width={140} height={117} className="h-auto w-[140px] opacity-95" />
      <div className="mt-10 w-[min(18rem,60vw)]">
        <div className="h-px w-full bg-white/20">
          <div
            className="h-full origin-left bg-[var(--color-gold-2)] transition-transform duration-300 ease-out"
            style={{ transform: `scaleX(${Math.max(0.02, progress)})` }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          <span className="u-label text-white/50">{failed ? 'Reduced quality' : 'Preparing the stone'}</span>
          <span className="u-label tabular-nums text-white/50">{String(Math.round(progress * 100)).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
