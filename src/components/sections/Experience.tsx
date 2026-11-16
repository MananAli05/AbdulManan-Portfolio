import { useLayoutEffect, useRef } from 'react';
import SplitHeading from '../motion/SplitHeading';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from '../../lib/motion';
import { JOURNEY } from '../../data/journey';

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-rail-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '[data-timeline]',
            start: 'top 68%',
            end: 'bottom 62%',
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-entry]').forEach((entry) => {
        const dot = entry.querySelector('[data-dot]');

        ScrollTrigger.create({
          trigger: entry,
          start: 'top 66%',
          onEnter: () => dot?.classList.add('is-on'),
          onLeaveBack: () => dot?.classList.remove('is-on'),
        });

        gsap.from(entry.querySelectorAll('[data-entry-part]'), {
          opacity: 0,
          x: 36,
          duration: 0.9,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: entry, start: 'top 82%', once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={rootRef} className="relative w-full bg-cream py-24 md:py-32 overflow-hidden">
      <div className="shell">
        <SplitHeading className="title-lg mb-14 md:mb-20">
          <span className="block text-ink">Where I've</span>
          <span className="block text-ink">
            <span className="hero-mark">worked and learned.</span>
          </span>
        </SplitHeading>

        <div data-timeline className="relative">
          <span
            aria-hidden
            className="absolute top-3 bottom-3 left-[8px] lg:left-[clamp(180px,22vw,320px)] w-px bg-ink/12"
          />
          <span
            data-rail-fill
            aria-hidden
            className="absolute top-3 bottom-3 left-[8px] lg:left-[clamp(180px,22vw,320px)] w-px bg-ink"
          />

          <ol className="flex flex-col gap-16 md:gap-24">
            {JOURNEY.map((entry) => (
              <li
                key={entry.id}
                data-entry
                className="relative grid grid-cols-1 lg:grid-cols-[clamp(180px,22vw,320px)_minmax(0,1fr)] pl-10 lg:pl-0"
              >
                <span
                  data-dot
                  aria-hidden
                  className="absolute top-2 left-[1px] lg:left-[clamp(180px,22vw,320px)] lg:-translate-x-1/2 w-[15px] h-[15px] rounded-full bg-cream border-2 border-ink/30 transition-[background-color,border-color,box-shadow] duration-500 [&.is-on]:bg-lime [&.is-on]:border-ink [&.is-on]:shadow-[0_0_0_6px_rgba(200,240,75,0.35)]"
                />

                <div data-entry-part className="lg:pr-10 mb-4 lg:mb-0">
                  <p className="font-display font-bold text-ink/[0.09] text-[clamp(64px,8vw,132px)] leading-[0.8] tracking-[-0.05em] select-none">
                    {entry.year}
                  </p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-body">
                    {entry.period}
                  </p>
                </div>

                <div className="lg:pl-14 max-w-[820px]">
                  <div data-entry-part>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deeplime mb-3">
                      {entry.kind}
                    </p>
                    <h3 className="text-ink text-[clamp(28px,3vw,46px)] leading-[1.02] tracking-[-0.025em]">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-[16px] md:text-[17px] text-ink font-medium">
                      {entry.place}
                      <span className="text-body font-normal"> · {entry.location}</span>
                    </p>
                  </div>

                  {entry.points.length > 0 && (
                    <ul data-entry-part className="mt-7 border-t border-ink/12">
                      {entry.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-4 py-4 border-b border-ink/12 text-[15px] md:text-[16px] leading-[1.5] text-ink"
                        >
                          <span aria-hidden className="mt-[9px] w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.badge && (
                    <p
                      data-entry-part
                      className="mt-7 inline-flex items-center gap-3 h-11 pl-4 pr-5 rounded-full bg-night text-bone"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
                        {entry.badge.label}
                      </span>
                      <span className="font-display font-bold text-[17px] text-lime">{entry.badge.value}</span>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
