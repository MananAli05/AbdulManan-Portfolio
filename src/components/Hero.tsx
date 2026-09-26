import { useLayoutEffect, useRef, type MouseEvent } from 'react';
import AgentTerminal from './AgentTerminal';
import ArrowButton from './ui/ArrowButton';
import SplitHeading from './motion/SplitHeading';
import { scrollToSection } from './motion/MotionProvider';
import { gsap, prefersReducedMotion, EASE } from '../lib/motion';

export default function Hero() {
  const introRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Supporting copy follows the headline in.
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 24,
        filter: 'blur(6px)',
        duration: 1,
        ease: EASE,
        stagger: 0.12,
        delay: 0.35,
      });

      // Terminal card drifts gently, then parallaxes on scroll.
      if (floatRef.current) {
        gsap.from(floatRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: EASE,
          delay: 0.6,
        });
        gsap.to(floatRef.current, {
          y: -18,
          duration: 3.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.8,
        });
        gsap.to(floatRef.current, {
          yPercent: 26,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.8 },
        });
      }
    }, introRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    scrollToSection('projects', -90);
  };

  return (
    <section
      id="home"
      ref={introRef}
      className="relative w-full bg-cream overflow-hidden pt-[128px] md:pt-[150px] pb-16 md:pb-24"
    >
      {/* Soft lime bloom behind the headline */}
      <div
        aria-hidden
        className="absolute -top-[14vw] left-1/2 -translate-x-1/2 w-[min(1100px,96vw)] h-[min(700px,80vw)] rounded-full bg-lime/20 blur-[120px] pointer-events-none"
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-10 items-center">
          {/* LEFT: headline block */}
          <div className="xl:col-span-8">
            <div data-hero-fade className="eyebrow mb-7">
              AI Engineer · AI Systems · Automation
            </div>

            <SplitHeading as="h1" immediate delay={0.1} className="title-xl mb-8">
              <span className="block text-ink">I build AI systems</span>
              <span className="block text-faint">that think, speak</span>
              <span className="block text-ink">
                &amp; <span className="text-deeplime">automate.</span>
              </span>
            </SplitHeading>

            <p
              data-hero-fade
              className="text-body text-[17px] md:text-[19px] leading-[1.6] max-w-[620px] mb-10"
            >
              AI Engineer building production-focused AI applications, LLM systems, voice
              agents and intelligent automation for real-world products.
            </p>

            <div data-hero-fade className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <ArrowButton href="#projects" onClick={handleExplore} variant="ink" className="justify-center">
                Explore my work
              </ArrowButton>
              <ArrowButton
                href="/AbdulManan_Resume.pdf"
                download="AbdulManan_Resume.pdf"
                variant="outline"
                glyph="↓"
                className="justify-center"
              >
                Resume
              </ArrowButton>
            </div>

            {/* Social row — small screens only; the sidebar covers desktop */}
            <div className="flex min-[1860px]:hidden items-center gap-3 mt-10 pt-8 border-t border-line">
              {[
                {
                  href: 'https://github.com/MananAli05',
                  label: 'GitHub',
                  path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
                },
                {
                  href: 'https://www.linkedin.com/in/abdul-manan05',
                  label: 'LinkedIn',
                  path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
                },
                {
                  href: 'mailto:abdulmannan.developer@gmail.com',
                  label: 'Email',
                  path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={s.label}
                  className="grid place-items-center w-11 h-11 rounded-full border border-line text-body hover:bg-lime hover:border-lime hover:text-ink transition-colors duration-300"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.7">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: floating terminal card */}
          <div className="xl:col-span-4 flex justify-center xl:justify-end">
            <div ref={floatRef} className="w-full max-w-[380px]">
              <AgentTerminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
