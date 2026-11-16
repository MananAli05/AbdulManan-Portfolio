import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';

interface CountUpProps {
  value: number;
  pad?: number;
  group?: boolean;
  className?: string;
}

export default function CountUp({ value, pad = 0, group = false, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = (n: number) =>
    group
      ? Math.round(n).toLocaleString('en-US')
      : String(Math.round(n)).padStart(pad, '0');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, pad, group]);

  return (
    <span ref={ref} className={className}>
      {format(prefersReducedMotion() ? value : 0)}
    </span>
  );
}
