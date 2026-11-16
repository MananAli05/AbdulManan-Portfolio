import { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '../../lib/motion';

interface WordLightProps {
  text: string;
  className?: string;
  from?: string;
  to?: string;
}

export default function WordLight({
  text,
  className = '',
  from = '#C9C7BB',
  to = '#10130C',
}: WordLightProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const run = () => {
        const split = new SplitText(el, { type: 'words', autoSplit: true });

        gsap.fromTo(
          split.words,
          { color: from },
          {
            color: to,
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
  }, [text, from, to]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
