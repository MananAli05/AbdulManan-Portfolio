import type { ReactNode, MouseEvent } from 'react';

type Variant = 'ink' | 'lime' | 'outline' | 'light';

interface ArrowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  variant?: Variant;
  /** Arrow glyph — '→' by default, '↓' for downloads. */
  glyph?: string;
  className?: string;
  download?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  /** Render the arrow in a filled circular badge, as on the reference. */
  badge?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  ink: 'bg-ink text-cream hover:bg-[#1C2114]',
  lime: 'bg-lime text-ink hover:bg-[#B9D954]',
  outline: 'bg-transparent text-ink border border-line hover:border-ink',
  light: 'bg-card text-ink border border-line hover:border-ink',
};

const BADGE_TONE: Record<Variant, string> = {
  ink: 'bg-lime text-ink',
  lime: 'bg-ink text-lime',
  outline: 'bg-ink text-lime',
  light: 'bg-ink text-lime',
};

/**
 * Pill button whose arrow slides out to the right while a second arrow
 * slides in behind it, so the glyph appears to travel on hover.
 */
export default function ArrowButton({
  children,
  href,
  onClick,
  variant = 'ink',
  glyph = '→',
  className = '',
  download,
  external = false,
  type = 'button',
  badge = false,
}: ArrowButtonProps) {
  const base = [
    'group inline-flex items-center gap-3 rounded-full font-sans font-medium',
    'text-[14px] tracking-[-0.01em] transition-colors duration-300 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deeplime',
    badge ? 'pl-2 pr-6 py-2' : 'px-7 py-[14px]',
    VARIANTS[variant],
    className,
  ].join(' ');

  const arrow = (
    <span
      aria-hidden
      className={[
        'relative grid place-items-center overflow-hidden shrink-0',
        badge
          ? `w-9 h-9 rounded-full ${BADGE_TONE[variant]}`
          : 'w-4 h-4',
      ].join(' ')}
    >
      <span className="col-start-1 row-start-1 w-full text-center leading-none transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]">
        {glyph}
      </span>
      <span className="col-start-1 row-start-1 w-full text-center leading-none -translate-x-[140%] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0">
        {glyph}
      </span>
    </span>
  );

  const inner = badge ? (
    <>
      {arrow}
      <span>{children}</span>
    </>
  ) : (
    <>
      <span>{children}</span>
      {arrow}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        download={download}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={base}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {inner}
    </button>
  );
}
