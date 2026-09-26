import { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '../../lib/motion';

interface WordLightProps {
  text: string;
  className?: string;
}

/**
 * A long paragraph whose words brighten from faint grey to full ink as
 * the passage scrolls through the viewport.
 */
export default function WordLight({ text, className = '' }: WordLightProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const run = () => {
        const split = new SplitText(el, { type: 'words', autoSplit: true });

        gsap.fromTo(
          split.words,
          { color: '#C9C7BB' },
          {
            color: '#10130C',
            duration: 1,
            stagger: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 78%',
              end: 'bottom 45%',
              scrub: 0.6,
            },
          }
        );
      };

      if (document.fonts?.status === 'loaded') run();
      else document.fonts?.ready.then(run) ?? run();
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
