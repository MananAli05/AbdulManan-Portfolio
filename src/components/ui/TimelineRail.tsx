import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';

/**
 * Vertical rail for the timeline sections. The lime line draws itself
 * downward as the section scrolls through the viewport.
 */
export default function TimelineRail({ containerId }: { containerId: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = fillRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: `#${containerId}`,
            start: 'top 72%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [containerId]);

  return (
    <span
      aria-hidden
      className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[2px] rounded-full bg-line overflow-hidden"
    >
      <span
        ref={fillRef}
        className="block w-full h-full origin-top rounded-full bg-lime"
      />
    </span>
  );
}
