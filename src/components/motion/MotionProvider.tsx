import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';

/**
 * Drives Lenis smooth scrolling and keeps ScrollTrigger in step with it.
 * Mounted once at the app root. With reduced motion requested it does
 * nothing at all, leaving the browser's own scrolling in place.
 */
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

    // Let Lenis own the scroll loop; ScrollTrigger reads from it.
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add('motion-ready');

    // Anchor buttons dispatch this instead of window.scrollTo so the
    // smooth-scroll engine stays the single source of truth.
    const handleScrollTo = (event: Event) => {
      const { target, offset } = (event as CustomEvent<{ target: string; offset?: number }>).detail;
      const el = document.getElementById(target);
      if (el) lenis.scrollTo(el, { offset: offset ?? -90 });
    };
    window.addEventListener('lenis:scroll-to', handleScrollTo);

    return () => {
      window.removeEventListener('lenis:scroll-to', handleScrollTo);
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return null;
}

/** Scroll helper that works whether or not Lenis is running. */
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
