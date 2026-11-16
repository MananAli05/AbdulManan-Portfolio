import { useLayoutEffect, useRef } from 'react';
import SplitHeading from '../motion/SplitHeading';
import Reveal from '../motion/Reveal';
import CountUp from '../motion/CountUp';
import WordLight from '../motion/WordLight';
import { gsap, prefersReducedMotion, EASE } from '../../lib/motion';

const FOCUS = ['Flutter Apps', 'Web Apps', 'AI Agents', 'Voice AI', 'Automation'];

const STATS = [
  { value: 1, pad: 2, suffix: '+', label: 'Years experience' },
  { value: 8, pad: 2, suffix: '+', label: 'Projects' },
  { value: 10, pad: 0, suffix: '+', label: 'Technologies' },
  { value: 4, pad: 2, suffix: '', label: 'Live in production' },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-portrait]', {
        opacity: 0,
        y: 90,
        scale: 0.94,
        duration: 1.3,
        ease: EASE,
        scrollTrigger: { trigger: '[data-portrait]', start: 'top 88%', once: true },
      });

      gsap.from('[data-focus] > *', {
        opacity: 0,
        y: 14,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.8)',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-focus]', start: 'top 92%', once: true },
      });

      gsap.from('[data-stats-rule]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: EASE,
        scrollTrigger: { trigger: '[data-stats-rule]', start: 'top 94%', once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative w-full bg-night text-bone rounded-[32px] md:rounded-[48px] py-20 md:py-24 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(40% 50% at 82% 42%, rgba(200, 240, 75, 0.10), rgba(200, 240, 75, 0) 72%)',
        }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/45 mb-5">
              Abdul Manan · Full Stack &amp; AI Engineer
            </Reveal>

            <SplitHeading className="text-[clamp(28px,3.3vw,54px)] leading-[1] mb-7">
              <span className="block text-bone">The developer</span>
              <span className="block text-bone">
                behind <span className="hero-mark">the build.</span>
              </span>
            </SplitHeading>

            <WordLight
              from="rgba(242, 239, 232, 0.24)"
              to="#F2EFE8"
              className="text-[17px] md:text-[19px] leading-[1.5] font-display font-medium tracking-[-0.01em] max-w-[620px] mb-5"
              text="I'm Abdul Manan, a full stack and AI engineer. I build web apps with Next.js and React, mobile apps with Flutter, and AI agents that chat, answer the phone and automate the busy work, for businesses that need them to run every day."
            />

            <Reveal className="text-bone/60 text-[15px] md:text-[16px] leading-[1.6] max-w-[580px] mb-7">
              <p>
                I started as a Python developer at BuiltinSoft and now work at CodAgentic,
                building AI-powered products end to end: the backend, the frontend and the
                AI in between.
              </p>
            </Reveal>

            <ul data-focus className="flex flex-wrap gap-2 mb-9">
              {FOCUS.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2.5 h-9 px-4 rounded-full border border-white/15 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/75"
                >
                  <span className="w-1 h-1 rounded-full bg-lime" />
                  {item}
                </li>
              ))}
            </ul>

            <span data-stats-rule aria-hidden className="block h-px w-full max-w-[640px] bg-white/15" />
            <Reveal
              stagger
              className="grid grid-cols-2 sm:grid-cols-4 gap-y-7 gap-x-4 pt-7 max-w-[640px]"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-bone text-[clamp(28px,2.6vw,42px)] tracking-[-0.04em] leading-none">
                    <CountUp value={stat.value} pad={stat.pad} />
                    <span className="text-lime">{stat.suffix}</span>
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-bone/45 mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div data-portrait className="group relative w-full max-w-[360px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#161614]">
                <img
                  src="/manan.webp"
                  alt="Abdul Manan, Full Stack and AI Engineer"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/70 to-transparent pointer-events-none"
                />
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-full bg-night/75 backdrop-blur-md border border-white/12 pl-5 pr-4 py-3">
                <span className="font-display font-bold text-bone text-[15px] tracking-[-0.02em]">
                  Abdul Manan
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-lime whitespace-nowrap">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-75 animate-ping" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-lime" />
                  </span>
                  Available
                </span>
              </div>

              <span
                aria-hidden
                className="absolute -top-3 -right-3 grid place-items-center w-14 h-14 rounded-full bg-lime text-ink font-display font-bold text-[18px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45"
              >
                ↗
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
