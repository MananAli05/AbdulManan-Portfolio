import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';

export default function MotionProvider() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add('motion-ready');
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add('motion-ready');

    const handleScrollTo = (event: Event) => {
      const { target, offset } = (event as CustomEvent<{ target: string; offset?: number }>).detail;
      const el = document.getElementById(target);
      if (el) lenis.scrollTo(el, { offset: offset ?? -90 });
    };
    window.addEventListener('lenis:scroll-to', handleScrollTo);

    const handleScrollTop = (event: Event) => {
      const { top, duration } = (event as CustomEvent<{ top: number; duration?: number }>).detail;
      lenis.scrollTo(top, { duration: duration ?? 0.9, force: true });
    };
    window.addEventListener('lenis:scroll-top', handleScrollTop);

    return () => {
      window.removeEventListener('lenis:scroll-to', handleScrollTo);
      window.removeEventListener('lenis:scroll-top', handleScrollTop);
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return null;
}

export function scrollToSection(id: string, offset = -90) {
  if (prefersReducedMotion() || !document.documentElement.classList.contains('motion-ready')) {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + offset,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
    return;
  }
  window.dispatchEvent(
    new CustomEvent('lenis:scroll-to', { detail: { target: id, offset } })
  );
}
