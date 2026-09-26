import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText, prefersReducedMotion, EASE } from '../../lib/motion';

interface SplitHeadingProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Play immediately on mount instead of waiting for the element to scroll in. */
  immediate?: boolean;
  delay?: number;
}

/**
 * Reveals a heading line by line: each line sits in a mask and slides up.
 * Falls back to plain rendered text when motion is reduced.
 */
export default function SplitHeading({
  children,
  as: Tag = 'h2',
  className = '',
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.visibility = 'visible';
      return;
    }

    const ctx = gsap.context(() => {
      // Wait for webfonts so line breaks are measured against the real face.
      const run = () => {
        const split = new SplitText(el, {
          type: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          mask: 'lines',
        });

        gsap.set(el, { visibility: 'visible' });

        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.05,
          ease: EASE,
          stagger: 0.08,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: 'top 88%', once: true },
        });
      };

      if (document.fonts?.status === 'loaded') run();
      else document.fonts?.ready.then(run) ?? run();
    }, el);

    return () => ctx.revert();
  }, [immediate, delay]);

  return (
    <Tag ref={ref} data-split className={className}>
      {children}
    </Tag>
  );
}
