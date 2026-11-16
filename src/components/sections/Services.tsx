import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SplitHeading from '../motion/SplitHeading';
import Reveal from '../motion/Reveal';
import TechIcon from '../ui/TechIcon';
import { gsap, prefersReducedMotion, EASE } from '../../lib/motion';
import { SERVICES, type Service } from '../../data/services';

const pad = (n: number) => String(n).padStart(2, '0');

function ServiceBody({ service }: { service: Service }) {
  return (
    <>
      <p className="text-body text-[15px] md:text-[16px] leading-[1.55] max-w-[540px]">
        {service.description}
      </p>

      <div className="max-w-[620px]">
        <ul className="border-t border-ink/12">
          {service.points.map((point) => (
            <li
              key={point}
              className="flex items-center justify-between gap-4 py-3 border-b border-ink/12 text-[14px] font-medium text-ink"
            >
              {point}
              <span aria-hidden className="w-2 h-2 rounded-full bg-lime ring-1 ring-ink/20 shrink-0" />
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2">
          {service.tech.map((name) => (
            <li
              key={name}
              className="inline-flex items-center gap-2 h-8 pl-2.5 pr-3 rounded-[8px] border border-ink/12 bg-white text-[13px] font-medium text-ink"
            >
              <TechIcon name={name} />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (min-width: 1024px)');
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-service]', {
        opacity: 0,
        y: 70,
        duration: 1,
        ease: EASE,
        stagger: 0.09,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '[data-services]', start: 'top 82%', once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={rootRef}
      className="relative w-full bg-night text-bone rounded-[32px] md:rounded-[48px] py-20 md:py-24 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(42% 46% at 14% 0%, rgba(200, 240, 75, 0.10), rgba(200, 240, 75, 0) 72%)',
        }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-9 md:mb-11">
          <SplitHeading className="lg:col-span-7 text-[clamp(30px,3.5vw,58px)] leading-[1]">
            <span className="block text-bone">What I can</span>
            <span className="block text-bone">
              <span className="hero-mark">build for you.</span>
            </span>
          </SplitHeading>
          <Reveal className="lg:col-span-5 lg:pb-2">
            <p className="text-bone/60 text-[15px] md:text-[16px] leading-[1.6] max-w-[420px] lg:ml-auto">
              Apps, web products and AI agents, designed, built and supported by one
              developer from start to launch.
            </p>
          </Reveal>
        </div>

        <div data-services className="hidden lg:flex gap-3 h-[clamp(430px,calc(100svh-350px),500px)]">
          {SERVICES.map((service, i) => {
            const open = i === active;
            return (
              <article
                key={service.id}
                data-service
                onMouseEnter={() => canHover && setActive(i)}
                onClick={() => setActive(i)}
                className={`relative min-w-0 rounded-[28px] overflow-hidden border transition-[flex-grow,flex-basis,background-color,border-color] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open
                    ? 'grow basis-0 bg-cream border-transparent'
                    : 'grow-0 basis-[84px] bg-white/[0.04] border-white/10 hover:bg-white/[0.07] cursor-pointer'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`service-panel-${service.id}`}
                  onFocus={() => setActive(i)}
                  tabIndex={open ? -1 : 0}
                  className={`absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-lime ${
                    open ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'
                  }`}
                >
                  <span className="font-mono text-[12px] tracking-[0.1em] text-bone/45">{pad(i + 1)}</span>
                  <span className="[writing-mode:vertical-rl] rotate-180 font-display font-bold text-bone text-[22px] tracking-[-0.02em] whitespace-nowrap">
                    {service.title}
                  </span>
                </button>

                <div
                  id={`service-panel-${service.id}`}
                  inert={!open}
                  className={`absolute inset-0 flex flex-col justify-between gap-5 p-8 xl:p-9 text-ink transition-opacity ${
                    open ? 'opacity-100 duration-500 delay-300' : 'opacity-0 duration-150 pointer-events-none'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="text-ink text-[clamp(30px,3vw,46px)] leading-[0.98] tracking-[-0.025em]">
                        {service.title}
                      </h3>
                      <span className="font-mono text-[12px] tracking-[0.1em] text-deeplime whitespace-nowrap pt-2">
                        {pad(i + 1)} · {service.kind}
                      </span>
                    </div>
                  </div>
                  <ServiceBody service={service} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="lg:hidden flex flex-col gap-3">
          {SERVICES.map((service, i) => {
            const open = i === active;
            return (
              <article
                key={service.id}
                className={`rounded-[24px] border overflow-hidden transition-colors duration-500 ${
                  open ? 'bg-cream border-transparent' : 'bg-white/[0.04] border-white/10'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`service-acc-${service.id}`}
                  onClick={() => setActive(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`font-mono text-[12px] ${open ? 'text-deeplime' : 'text-bone/45'}`}>
                      {pad(i + 1)}
                    </span>
                    <span
                      className={`font-display font-bold text-[24px] tracking-[-0.02em] ${
                        open ? 'text-ink' : 'text-bone'
                      }`}
                    >
                      {service.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`grid place-items-center w-8 h-8 rounded-full border text-[18px] leading-none transition-transform duration-500 ${
                      open ? 'rotate-45 border-ink/20 text-ink' : 'border-white/20 text-bone'
                    }`}
                  >
                    +
                  </span>
                </button>

                {open && (
                  <div id={`service-acc-${service.id}`} className="px-6 pb-7 flex flex-col gap-6">
                    <ServiceBody service={service} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
