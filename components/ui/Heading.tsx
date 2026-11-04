import { Reveal } from './Reveal';

/**
 * Section heading whose lines rise out of a mask when revealed. Pass lines as
 * an array; wrap a word in *asterisks* to set it in brushed gold.
 */
export function Heading({
  id,
  eyebrow,
  lines,
  as: Tag = 'h2',
  className = '',
  size = 'headline',
  light = false,
}: {
  id?: string;
  eyebrow?: string;
  lines: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  size?: 'display' | 'headline';
  light?: boolean;
}) {
  return (
    <Reveal className={className}>
      {eyebrow ? (
        <p className={`u-label flex items-center gap-3 ${light ? 'text-[var(--color-gold-2)]' : 'text-[var(--color-ink-2)]'}`}>
          <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={`${eyebrow ? 'mt-5' : ''} ${size === 'display' ? 'text-[length:var(--text-display)]' : 'text-[length:var(--text-headline)]'}`}>
        {lines.map((l, i) => (
          <span key={i} className="line-mask">
            <span style={{ transitionDelay: `${i * 90}ms` }}>
              {l.split(/(\*[^*]+\*)/).map((part, j) =>
                part.startsWith('*') ? <span key={j} className="u-gold-text">{part.slice(1, -1)}</span> : part,
              )}
            </span>
          </span>
        ))}
      </Tag>
    </Reveal>
  );
}
