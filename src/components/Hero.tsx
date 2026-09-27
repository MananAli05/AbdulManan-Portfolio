import { useLayoutEffect, useRef, type MouseEvent } from 'react';
import AgentTerminal from './AgentTerminal';
import ArrowButton from './ui/ArrowButton';
import TechMarquee from './ui/TechMarquee';
import SplitHeading from './motion/SplitHeading';
import { scrollToSection } from './motion/MotionProvider';
import { gsap, prefersReducedMotion, EASE } from '../lib/motion';

const SOCIALS = [
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
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 22,
        filter: 'blur(6px)',
        duration: 0.95,
        ease: EASE,
        stagger: 0.1,
        delay: 0.3,
      });

      // The portrait rises into place, then the terminal lands on top of it.
      if (portraitRef.current) {
        gsap.from(portraitRef.current, {
          opacity: 0,
          y: 48,
          scale: 0.97,
          duration: 1.25,
          ease: EASE,
          delay: 0.45,
        });
        gsap.to(portraitRef.current, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.9 },
        });
      }

      if (terminalRef.current) {
        gsap.from(terminalRef.current, {
          opacity: 0,
          y: 34,
          duration: 1,
          ease: EASE,
          delay: 0.85,
        });
        // Drifts faster than the portrait, so the two separate as you scroll.
        gsap.to(terminalRef.current, {
          yPercent: 24,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    scrollToSection('projects', -90);
  };

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative w-full bg-cream grain flex flex-col min-h-[100svh] overflow-hidden"
    >
      {/* Soft lime bloom behind the headline */}
      <div
        aria-hidden
        className="absolute -top-[18vw] -left-[10vw] w-[min(900px,80vw)] h-[min(620px,60vw)] rounded-full bg-lime/25 blur-[130px] pointer-events-none"
      />

      <div className="shell relative z-10 flex-1 flex items-center pt-[108px] md:pt-[150px] pb-14">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* LEFT — the statement */}
          <div className="lg:col-span-7">
            <div
              data-hero-fade
              className="inline-flex items-center gap-2.5 mb-8 pl-3 pr-4 py-2 rounded-full bg-white border border-line shadow-[0_2px_10px_-4px_rgba(16,19,12,0.10)]"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-deeplime" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                Available for projects
              </span>
            </div>

            <SplitHeading as="h1" immediate delay={0.08} className="title-xl mb-8">
              <span className="block text-ink">I build AI systems</span>
              <span className="block text-faint">that think, speak</span>
              <span className="block text-ink">
                &amp; <span className="text-deeplime">automate.</span>
              </span>
            </SplitHeading>

            <p
              data-hero-fade
              className="text-body text-[17px] md:text-[19px] leading-[1.6] max-w-[560px] mb-10"
            >
              AI Engineer building production-focused AI applications, LLM systems, voice
              agents and intelligent automation for real-world products.
            </p>

            <div
              data-hero-fade
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <ArrowButton
                href="#projects"
                onClick={handleExplore}
                variant="ink"
                className="justify-center"
              >
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

            {/* Social row — the fixed rail only appears on very wide screens */}
            <div
              data-hero-fade
              className="flex min-[1860px]:hidden items-center gap-3 mt-10 pt-8 border-t border-line"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  aria-label={s.label}
                  className="grid place-items-center w-11 h-11 rounded-full bg-white border border-line text-body transition-all duration-300 hover:bg-lime hover:border-lime hover:text-ink hover:-translate-y-0.5"
                >
                  <svg
                    className="w-[17px] h-[17px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — portrait with the terminal overlapping it */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[430px] lg:mr-4 xl:mr-10">
              <div
                ref={portraitRef}
                className="relative rounded-[36px] bg-white border border-line p-2.5 shadow-[0_2px_6px_rgba(16,19,12,0.04),0_40px_80px_-32px_rgba(16,19,12,0.28)]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[#EFEDE3]">
                  <img
                    src="/manan.png"
                    alt="Abdul Manan, AI Engineer"
                    className="w-full h-full object-cover object-[center_15%]"
                    fetchPriority="high"
                  />
                </div>

                <div className="absolute top-7 right-7 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-deeplime">
                    AI Engineer
                  </span>
                </div>
              </div>

              {/* Overlaps the portrait's lower-left on desktop; stacks below it
                  once the columns collapse. */}
              <div
                ref={terminalRef}
                className="hidden sm:block mt-5 lg:mt-0 lg:absolute lg:-left-36 xl:-left-48 lg:-bottom-12 lg:w-[300px] xl:w-[330px] z-20"
              >
                <AgentTerminal />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom anchor */}
      <TechMarquee />
    </section>
  );
}
