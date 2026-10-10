import { useLayoutEffect, useRef } from 'react';
import AskManan from './hero/AskManan';
import TechMarquee from './ui/TechMarquee';
import SplitHeading from './motion/SplitHeading';
import { gsap, prefersReducedMotion, EASE } from '../lib/motion';

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: EASE,
        stagger: 0.1,
        delay: 0.35,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative w-full bg-cream flex flex-col min-h-[100svh] overflow-hidden"
    >
      <div className="shell relative z-10 flex-1 flex items-center pt-[120px] md:pt-[140px] pb-16">
        <div className="w-full max-w-[1100px]">
          {/* Status — accent spot 1 */}
          <div data-hero-fade className="flex items-center gap-2.5 mb-9">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-lime" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Available for projects
            </span>
            <span aria-hidden className="w-8 h-px bg-ink/15" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Abdul Manan · AI Engineer
            </span>
          </div>

          <SplitHeading as="h1" immediate delay={0.08} className="title-xl mb-8">
            <span className="block text-ink">I build AI systems that</span>
            <span className="block text-ink">
              think, speak <span className="text-faint">&amp; automate.</span>
            </span>
          </SplitHeading>

          <p
            data-hero-fade
            className="text-body text-[17px] md:text-[19px] leading-[1.6] max-w-[620px] mb-11"
          >
            AI applications, LLM and RAG systems, voice agents and automation — built to
            run in production. Ask the assistant below; it answers from my real work.
          </p>

          {/* The proof — accent spots 2 and 3 live inside (send button, cursor) */}
          <div data-hero-fade>
            <AskManan />
          </div>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
