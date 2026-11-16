import { useLayoutEffect, useRef } from 'react';
import AgentTerminal from '../ui/AgentTerminal';
import TechMarquee from '../ui/TechMarquee';
import SplitHeading from '../motion/SplitHeading';
import { scrollToSection } from '../motion/MotionProvider';
import { gsap, prefersReducedMotion, EASE } from '../../lib/motion';
import { RESUME_URL, RESUME_FILE } from '../../data/site';

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
      className="relative w-full bg-night text-bone flex flex-col min-h-[100svh] overflow-hidden rounded-b-[32px] md:rounded-b-[48px]"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(58% 46% at 50% 0%, rgba(200, 240, 75, 0.10), rgba(200, 240, 75, 0) 72%)',
        }}
      />

      <div className="shell relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-[112px] md:pt-[132px] pb-10">
        <div className="relative w-full mb-6">
        <SplitHeading as="h1" immediate delay={0.08} className="hero-title">
          <span className="block text-bone">I build apps &amp; AI systems</span>
          <span className="block text-bone">
            that <span className="hero-mark">think, speak</span>{' '}
            <span className="text-bone/35">&amp; scale.</span>
          </span>
        </SplitHeading>

          <div
            data-hero-fade
            className="hidden min-[1240px]:block absolute right-0 top-1/2 -translate-y-1/2"
            style={{ width: 'clamp(212px, 17.5vw, 290px)' }}
          >
            <AgentTerminal />
          </div>
        </div>

        <div className="relative w-full max-w-[640px]">
          <p
            data-hero-fade
            className="text-bone/65 text-[15px] md:text-[17px] leading-[1.6] mb-9"
          >
            Full stack developer building web apps, Flutter mobile apps and AI agents
            (chatbots, voice agents and automation) that run for real businesses. Ask my
            AI assistant; it answers from my real work.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('projects', -92)}
              className="group inline-flex items-center gap-3 h-[54px] px-7 rounded-[6px] bg-lime text-ink text-[13px] font-semibold uppercase tracking-[0.04em] transition-all duration-300 hover:brightness-95 cursor-pointer"
            >
              Explore my work
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <a
              href={RESUME_URL}
              download={RESUME_FILE}
              className="group inline-flex items-center gap-3 h-[54px] px-7 rounded-[6px] border border-lime/30 text-bone text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-300 hover:border-lime/70"
            >
              Resume
              <span
                aria-hidden
                className="text-lime transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>

          <div
            data-hero-fade
            className="min-[1240px]:hidden mt-10 mx-auto w-full max-w-[320px]"
          >
            <AgentTerminal />
          </div>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
