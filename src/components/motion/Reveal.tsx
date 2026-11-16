import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap, prefersReducedMotion, EASE } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  y?: number;
}

export default function Reveal({
  children,
  className = '',
  stagger = false,
  delay = 0,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el];

      if (stagger) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        { opacity: 0, y, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: EASE,
          delay,
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
