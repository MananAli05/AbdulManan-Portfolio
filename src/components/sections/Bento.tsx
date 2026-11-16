import { useLayoutEffect, useRef } from 'react';
import SplitHeading from '../motion/SplitHeading';
import CountUp from '../motion/CountUp';
import { gsap, prefersReducedMotion, EASE } from '../../lib/motion';

const STACK = ['Flutter', 'Next.js', 'React', 'n8n'];

const STORE_FACTS = ['Premium Store', 'Chat-based store', 'Flutter admin app'];

const RELEASES = ['v0.1', 'v0.2', 'v0.3', 'v0.4', 'Launch'];

const DECISIONS = ['Approve', 'Change', 'Pause'];

const CARD_TITLE = 'text-[clamp(26px,2.3vw,40px)] leading-[1] tracking-[-0.02em]';
const CARD_COPY = 'mt-3 text-[15px] leading-[1.55]';
const CARD_INDEX = 'font-mono text-[11px] tracking-[0.14em] shrink-0 pt-1.5';
export default function Bento() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-bento-card]').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 64,
          scale: 0.96,
          duration: 1.1,
          ease: EASE,
          delay: i * 0.1,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });

      gsap.fromTo(
        '[data-orbit]',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.18,
          scrollTrigger: {
            trigger: '[data-orbits]',
            start: 'top 92%',
            end: 'top 35%',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        '[data-ring]',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '[data-ring]', start: 'top 92%', once: true },
        }
      );

      const trackTrigger = { trigger: '[data-track]', start: 'top 96%', once: true };
      gsap.from('[data-track-line]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: EASE,
        delay: 0.2,
        scrollTrigger: trackTrigger,
      });
      gsap.from('[data-track-node]', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2.2)',
        stagger: 0.18,
        delay: 0.35,
        scrollTrigger: trackTrigger,
      });

      gsap.utils.toArray<HTMLElement>('[data-pills]').forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 16,
          scale: 0.9,
          duration: 0.6,
          ease: 'back.out(1.8)',
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: { trigger: group, start: 'top 96%', once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={rootRef}
      className="relative w-full bg-cream py-24 md:py-28"
    >
      <div className="shell">
        <SplitHeading className="title-lg mb-10 md:mb-12">
          <span className="block text-ink">One developer.</span>
          <span className="block text-ink">
            The <span className="hero-mark">whole build.</span>
          </span>
        </SplitHeading>

        <div
          data-bento-grid
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 lg:h-[clamp(600px,calc(100svh-150px),760px)]"
        >
          <article
            data-bento-card
            className="group lift relative lg:col-span-5 flex flex-col justify-between gap-8 min-h-[440px] lg:min-h-0 p-8 md:p-10 rounded-[32px] bg-night text-bone overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(72% 44% at 70% 62%, rgba(200, 240, 75, 0.17), rgba(200, 240, 75, 0) 70%)',
              }}
            />

            <svg
              data-orbits
              aria-hidden
              viewBox="-170 -110 340 220"
              className="absolute max-w-none pointer-events-none w-[340px] -right-24 top-[68%] -translate-y-1/2 opacity-70 lg:opacity-100 lg:w-[min(520px,36vw)] lg:-right-[9vw] lg:top-[62%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-6"
              fill="none"
            >
              <g transform="rotate(-18)" stroke="#F2EFE8" strokeWidth="1.2" strokeLinecap="round">
                <ellipse data-orbit cx="0" cy="0" rx="160" ry="58" pathLength={1} strokeDasharray={1} opacity="0.5" />
                <ellipse data-orbit cx="0" cy="0" rx="112" ry="40" pathLength={1} strokeDasharray={1} opacity="0.7" />
                <ellipse data-orbit cx="0" cy="0" rx="64" ry="23" pathLength={1} strokeDasharray={1} opacity="0.9" />
                <circle cx="160" cy="0" r="5" fill="#F2EFE8" stroke="none" />
                <circle cx="-112" cy="0" r="3.5" fill="#F2EFE8" stroke="none" opacity="0.7" />
              </g>
              <circle cx="0" cy="0" r="20" fill="#C8F04B" opacity="0.18" />
              <circle cx="0" cy="0" r="11" fill="#C8F04B" />
            </svg>

            <div className="relative flex items-start justify-between gap-4">
              <div className="max-w-[420px]">
                <h3 className={`${CARD_TITLE} text-bone`}>
                  Built, <span className="text-bone/40">not generated.</span>
                </h3>
                <p className={`${CARD_COPY} text-bone/65`}>
                  Hand-written code, shaped around your business. No templates, no
                  copy-paste, no logo dropped onto someone else's app.
                </p>
              </div>
              <span className={`${CARD_INDEX} text-bone/35`}>01</span>
            </div>

            <ul data-pills className="relative flex flex-wrap gap-2">
              {STACK.map((name) => (
                <li
                  key={name}
                  className="inline-flex items-center h-8 px-3.5 rounded-full border border-white/15 bg-night/60 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/75"
                >
                  {name}
                </li>
              ))}
            </ul>
          </article>

          <div className="lg:col-span-7 grid gap-4 md:gap-5 lg:min-h-0 lg:grid-rows-[minmax(0,1.12fr)_minmax(0,1fr)]">
            <article
              data-bento-card
              className="lift card-surface relative flex flex-col justify-between gap-5 lg:min-h-0 p-8 min-[1400px]:p-10 overflow-hidden"
            >
              <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-6">
                <div className="max-w-[440px]">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`${CARD_INDEX} !pt-0 text-faint`}>02</span>
                    <span className="inline-flex items-center gap-2.5 h-7 pl-2.5 pr-3.5 rounded-full bg-night text-bone font-mono text-[10px] uppercase tracking-[0.14em]">
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-75 animate-ping" />
                        <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-lime" />
                      </span>
                      Live
                    </span>
                  </div>
                  <h3 className={`${CARD_TITLE} text-ink`}>
                    Runs for <span className="text-faint">real users.</span>
                  </h3>
                  <p className={`${CARD_COPY} text-body`}>
                    My subscription store is live and in daily use. I build things to be
                    used, not just demoed.
                  </p>
                </div>

                <div className="shrink-0 flex flex-row sm:flex-col items-center gap-4 sm:gap-3">
                  <div
                    role="img"
                    aria-label="More than 2,300 customers served"
                    className="relative grid place-items-center w-[120px] h-[120px] md:w-[148px] md:h-[148px] rounded-full bg-night text-bone"
                  >
                    <svg viewBox="0 0 124 124" className="absolute inset-0 w-full h-full -rotate-90" fill="none">
                      <circle cx="62" cy="62" r="50" stroke="rgba(242,239,232,0.14)" strokeWidth="6" />
                      <circle
                        data-ring
                        cx="62"
                        cy="62"
                        r="50"
                        stroke="#C8F04B"
                        strokeWidth="6"
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray={1}
                      />
                    </svg>
                    <span className="font-display font-bold text-[25px] md:text-[32px] tracking-[-0.04em] leading-none">
                      <CountUp value={2300} group />
                      <span className="text-lime">+</span>
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    Customers
                  </span>
                </div>
              </div>

              <ul data-pills className="flex flex-wrap gap-2">
                {STORE_FACTS.map((fact) => (
                  <li
                    key={fact}
                    className="inline-flex items-center h-8 px-3.5 rounded-full border border-ink/12 font-mono text-[10px] uppercase tracking-[0.14em] text-body"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:min-h-0">
              <article
                data-bento-card
                className="lift relative flex flex-col justify-between gap-8 lg:min-h-0 p-8 rounded-[32px] bg-lime text-ink overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`${CARD_TITLE} text-ink`}>
                      Fast, <span className="text-ink/45">not rushed.</span>
                    </h3>
                    <p className={`${CARD_COPY} text-ink/75`}>
                      Working releases, early and often. No big-reveal surprises.
                    </p>
                  </div>
                  <span className={`${CARD_INDEX} text-ink/45`}>03</span>
                </div>

                <div data-track className="relative">
                  <span
                    data-track-line
                    aria-hidden
                    className="absolute left-[7px] right-[7px] top-[7px] h-[2px] rounded-full bg-ink/25"
                  />
                  <ol className="relative flex justify-between">
                    {RELEASES.map((release, i) => {
                      const last = i === RELEASES.length - 1;
                      return (
                        <li key={release} data-track-node className="flex flex-col items-center gap-2.5">
                          <span
                            className={`block w-4 h-4 rounded-full border-2 border-ink ${
                              last ? 'bg-lime shadow-[0_0_0_5px_rgba(16,19,12,0.12)]' : 'bg-ink'
                            }`}
                          />
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                              last ? 'text-ink font-semibold' : 'text-ink/65'
                            }`}
                          >
                            {release}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </article>

              <article
                data-bento-card
                className="lift card-surface relative flex flex-col justify-between gap-8 lg:min-h-0 p-8 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(16, 19, 12, 0.13) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                    maskImage: 'linear-gradient(315deg, transparent 40%, #000 100%)',
                    WebkitMaskImage: 'linear-gradient(315deg, transparent 40%, #000 100%)',
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`${CARD_TITLE} text-ink`}>
                      You make <span className="text-faint">the calls.</span>
                    </h3>
                    <p className={`${CARD_COPY} text-body`}>
                      I recommend, you decide. The code and accounts stay yours.
                    </p>
                  </div>
                  <span className={`${CARD_INDEX} text-faint`}>04</span>
                </div>

                <ul data-pills className="relative flex flex-wrap gap-2">
                  {DECISIONS.map((decision, i) => (
                    <li
                      key={decision}
                      className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-[13px] font-medium border ${
                        i === 0
                          ? 'bg-ink border-ink text-cream shadow-[0_10px_24px_-10px_rgba(16,19,12,0.5)]'
                          : 'bg-white border-ink/15 text-ink'
                      }`}
                    >
                      {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-lime" />}
                      {decision}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
