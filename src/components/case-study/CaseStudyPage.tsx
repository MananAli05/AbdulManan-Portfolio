import { useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react';
import { FaGithub } from 'react-icons/fa';
import SplitHeading from '../motion/SplitHeading';
import Reveal from '../motion/Reveal';
import { gsap, prefersReducedMotion, EASE } from '../../lib/motion';
import type { CaseStudy, Crop, FeatureVisual } from '../../data/case-studies';

const pad = (n: number) => String(n).padStart(2, '0');

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.2em] text-body';

function goHome(e: MouseEvent<HTMLAnchorElement>, sectionId: string) {
  e.preventDefault();
  window.history.pushState({}, '', `/#${sectionId}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.setTimeout(() => {
    const el = document.getElementById(sectionId);
    window.scrollTo(0, el ? el.getBoundingClientRect().top + window.scrollY : 0);
  }, 60);
}

function CropView({
  crop,
  image,
  label,
  radius = 'rounded-[18px]',
}: {
  crop: Crop;
  image: { src: string; width: number; height: number; alt?: string };
  label?: string;
  radius?: string;
}) {
  const shift = (start: number, size: number) => (size >= 1 ? 0 : (start / (1 - size)) * 100);
  return (
    <figure>
      <div
        role="img"
        aria-label={label ?? image.alt}
        className={`w-full ${radius} border border-ink/10 shadow-[0_24px_50px_-28px_rgba(16,19,12,0.45)]`}
        style={{
          aspectRatio: `${crop.w * image.width} / ${crop.h * image.height}`,
          backgroundImage: `url("${image.src}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${100 / crop.w}% ${100 / crop.h}%`,
          backgroundPosition: `${shift(crop.x, crop.w)}% ${shift(crop.y, crop.h)}%`,
        }}
      />
      {label && <Caption>{label}</Caption>}
    </figure>
  );
}

function Caption({ children }: { children: string }) {
  return (
    <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-body text-center">
      {children}
    </figcaption>
  );
}

const SCREEN_FRAME =
  'block w-full h-auto border border-ink/10 shadow-[0_24px_50px_-28px_rgba(16,19,12,0.45)]';

function FeatureFigure({ visual, image }: { visual: FeatureVisual; image: CaseStudy['image'] }) {
  if (visual.kind === 'crop') {
    return <CropView crop={visual.crop} image={visual.source ?? image} label={visual.label} />;
  }

  if (visual.kind === 'phones') {
    const width = ['max-w-[290px]', 'max-w-[250px]', 'max-w-[210px]'][Math.min(visual.screens.length, 3) - 1];
    return (
      <div className="flex items-start justify-center gap-4 sm:gap-6">
        {visual.screens.map((screen) => (
          <figure key={screen.src} className={`w-full ${width}`}>
            <img
              src={screen.src}
              alt={screen.label}
              width={screen.width ?? 716}
              height={screen.height ?? 1600}
              loading="lazy"
              className={`${SCREEN_FRAME} rounded-[20px]`}
            />
            <Caption>{screen.label}</Caption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <figure className={visual.shape === 'tall' ? 'mx-auto w-full max-w-[340px]' : ''}>
      <img
        src={visual.src}
        alt={visual.label}
        width={visual.width}
        height={visual.height}
        loading="lazy"
        className="block w-full h-auto rounded-[18px] border border-ink/10 shadow-[0_24px_50px_-28px_rgba(16,19,12,0.45)]"
      />
      <Caption>{visual.label}</Caption>
    </figure>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = `${study.title} · Abdul Manan`;
    return () => {
      document.title = previous;
    };
  }, [study.slug, study.title]);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-cs-hero]', {
        opacity: 0,
        y: 70,
        scale: 0.97,
        duration: 1.3,
        ease: EASE,
        delay: 0.35,
      });

      gsap.utils.toArray<HTMLElement>('[data-cs-visual]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 70,
          duration: 1.1,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.from('[data-cs-flow] [data-node]', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: '[data-cs-flow]', start: 'top 82%', once: true },
      });
      gsap.from('[data-cs-flow] [data-link]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: EASE,
        delay: 0.35,
        scrollTrigger: { trigger: '[data-cs-flow]', start: 'top 82%', once: true },
      });

      gsap.from('[data-cs-row]', {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-cs-stack]', start: 'top 85%', once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [study.slug]);

  return (
    <div ref={rootRef} className="min-h-screen w-full bg-cream text-ink">
      <header className="sticky top-0 z-40 w-full bg-cream/90 backdrop-blur-md border-b border-ink/10">
        <div className="shell h-[68px] flex items-center justify-between gap-4">
          <a
            href="/#projects"
            onClick={(e) => goHome(e, 'projects')}
            className="group inline-flex items-center gap-2.5 text-[14px] text-ink"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to portfolio
          </a>

          <div className="flex items-center gap-2.5">
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-ink/15 text-[13px] font-medium text-ink transition-colors duration-300 hover:border-ink"
              >
                <FaGithub aria-hidden className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 h-10 px-5 rounded-full bg-ink text-cream text-[13px] font-medium transition-colors duration-300 hover:bg-[#1C2114]"
              >
                View live product
                <span aria-hidden className="text-lime transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="shell pt-16 md:pt-24">
          <Reveal className={`${EYEBROW} mb-8`}>
            {study.kind}
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <SplitHeading
              as="h1"
              immediate
              delay={0.05}
              className="lg:col-span-7 text-[clamp(56px,9.4vw,168px)] leading-[0.88]"
            >
              <span className="block text-ink">{study.title}</span>
            </SplitHeading>

            <Reveal className="lg:col-span-5 lg:pb-3" delay={0.2}>
              <p className="text-body text-[17px] md:text-[19px] leading-[1.55] mb-8">{study.summary}</p>
              <dl className="border-t border-ink/15">
                {study.meta.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-6 py-3 border-b border-ink/15"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-body">
                      {item.label}
                    </dt>
                    <dd className="text-[14px] font-medium text-ink text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div
            data-cs-hero
            className="mt-14 md:mt-20 rounded-[28px] md:rounded-[40px] p-4 sm:p-8 md:p-10"
            style={{ background: 'linear-gradient(135deg, #C8F04B 0%, #DDF58A 46%, #EEF7CF 100%)' }}
          >
            {study.heroImage ? (
              <img
                src={study.heroImage.src}
                alt={study.heroImage.alt}
                width={study.heroImage.width}
                height={study.heroImage.height}
                className="block w-full h-auto rounded-[14px] md:rounded-[22px] border border-ink/10 shadow-[0_40px_80px_-40px_rgba(16,19,12,0.55)]"
              />
            ) : study.heroCrop ? (
              <CropView crop={study.heroCrop} image={study.image} radius="rounded-[14px] md:rounded-[22px]" />
            ) : (
              <img
                src={study.image.src}
                alt={study.image.alt}
                width={study.image.width}
                height={study.image.height}
                className="block mx-auto w-auto h-auto max-w-full max-h-[64svh] rounded-[18px] md:rounded-[26px] shadow-[0_40px_80px_-40px_rgba(16,19,12,0.55)]"
              />
            )}
          </div>
        </section>

        <section className="shell pt-28 md:pt-40">
          <Reveal className={`${EYEBROW} mb-9`}>
            The challenge
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <SplitHeading className="lg:col-span-7 text-[clamp(34px,4.6vw,76px)] leading-[1]">
              <span className="block text-ink">{study.challenge.statement}</span>
            </SplitHeading>
            <Reveal className="lg:col-span-5 lg:pt-3 flex flex-col gap-5 text-body text-[16px] md:text-[17px] leading-[1.65]">
              {study.challenge.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </Reveal>
          </div>

          <Reveal
            stagger
            className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/15"
          >
            {study.challenge.steps.map((step, i) => (
              <div
                key={step}
                className="flex flex-col justify-between gap-12 md:gap-16 p-5 md:p-7 border-r border-b border-ink/15"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-body">{pad(i + 1)}</span>
                <span className="text-ink text-[17px] md:text-[20px] font-medium leading-[1.2]">{step}</span>
              </div>
            ))}
          </Reveal>
        </section>

        <div className="shell">
          {study.features.map((feature, i) => {
            const flip = i % 2 === 1;
            return (
              <section
                key={feature.label}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-28 md:pt-40"
              >
                <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
                  <Reveal className={`${EYEBROW} mb-7`}>
                    {pad(i + 1)} / {feature.label}
                  </Reveal>
                  <SplitHeading className="text-[clamp(30px,3.6vw,58px)] leading-[1.02] mb-6">
                    <span className="block text-ink">{feature.title}</span>
                  </SplitHeading>
                  <Reveal>
                    <p className="text-body text-[16px] md:text-[17px] leading-[1.65] mb-8">{feature.body}</p>
                    <ul className="border-t border-ink/15">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3.5 py-3.5 border-b border-ink/15 text-[15px] text-ink"
                        >
                          <span
                            aria-hidden
                            className="mt-[3px] grid place-items-center w-[18px] h-[18px] rounded-full bg-ink text-lime shrink-0"
                          >
                            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2.5 6.2l2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                <div
                  data-cs-visual
                  className={`lg:col-span-7 rounded-[28px] bg-[#EEF3DC] border border-ink/8 p-5 sm:p-8 md:p-10 ${
                    flip ? 'lg:order-1' : ''
                  }`}
                >
                  <FeatureFigure visual={feature.visual} image={study.image} />
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-28 md:mt-40 bg-night text-bone rounded-[32px] md:rounded-[48px] py-20 md:py-28">
          <div className="shell">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 md:mb-20">
              <div className="lg:col-span-7">
                <Reveal className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50 mb-8">
                  How it connects
                </Reveal>
                <SplitHeading className="text-[clamp(34px,4.6vw,76px)] leading-[1]">
                  <span className="block text-bone">{study.flow.title}</span>
                </SplitHeading>
              </div>
              <Reveal className="lg:col-span-5 lg:pt-14 text-bone/60 text-[16px] md:text-[17px] leading-[1.65]">
                <p>{study.flow.intro}</p>
              </Reveal>
            </div>

            <div
              data-cs-flow
              className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1.1fr)_72px_minmax(0,1fr)] gap-5 lg:gap-0 items-center"
            >
              <ul className="grid gap-2.5">
                {study.flow.inputs.map((input) => (
                  <li
                    key={input.name}
                    data-node
                    className="flex items-center justify-between gap-4 h-[54px] px-5 rounded-[14px] border border-white/12 bg-white/[0.04]"
                  >
                    <span className="text-[15px] font-medium text-bone">{input.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone/45">
                      {input.via}
                    </span>
                  </li>
                ))}
              </ul>

              <span data-link aria-hidden className="hidden lg:block h-px bg-lime/70" />

              <div
                data-node
                className="rounded-[22px] bg-lime text-ink p-7 md:p-9 flex flex-col justify-center min-h-[200px]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60 mb-4">
                  The backend
                </span>
                <span className="font-display font-bold text-[26px] md:text-[32px] leading-[1.02] tracking-[-0.02em]">
                  {study.flow.hub.name}
                </span>
                <span className="mt-4 text-[14px] leading-[1.5] text-ink/75">{study.flow.hub.detail}</span>
              </div>

              <span data-link aria-hidden className="hidden lg:block h-px bg-lime/70" />

              <ul className="grid gap-2.5">
                {study.flow.outputs.map((output) => (
                  <li
                    key={output.name}
                    data-node
                    className="flex flex-col justify-center min-h-[82px] px-5 py-4 rounded-[14px] border border-white/12 bg-white/[0.04]"
                  >
                    <span className="text-[15px] font-medium text-bone">{output.name}</span>
                    <span className="mt-1 text-[13px] text-bone/50">{output.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="shell pt-28 md:pt-40">
          <Reveal className={`${EYEBROW} mb-9`}>
            Engineering highlights
          </Reveal>
          <SplitHeading className="text-[clamp(34px,4.6vw,76px)] leading-[1] max-w-[14em] mb-14 md:mb-20">
            <span className="block text-ink">The parts you do not see.</span>
          </SplitHeading>

          <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {study.highlights.map((item, i) => (
              <article key={item.title} className="card-surface lift p-8 md:p-10 flex flex-col gap-10">
                <span className="font-mono text-[11px] tracking-[0.14em] text-body">{pad(i + 1)}</span>
                <div>
                  <h3 className="text-ink text-[24px] md:text-[28px] leading-[1.08] tracking-[-0.02em] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-body text-[15px] md:text-[16px] leading-[1.65]">{item.body}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        <section className="shell pt-28 md:pt-40 pb-28 md:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal className={`${EYEBROW} mb-9`}>
                Technology
              </Reveal>
              <SplitHeading className="text-[clamp(34px,4.2vw,68px)] leading-[1]">
                <span className="block text-ink">{study.stack.title}</span>
              </SplitHeading>
            </div>

            <dl data-cs-stack className="lg:col-span-7 border-t border-ink/15">
              {study.stack.rows.map((row) => (
                <div
                  key={row.layer}
                  data-cs-row
                  className="grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] gap-1 sm:gap-6 py-5 border-b border-ink/15"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-body sm:pt-1">
                    {row.layer}
                  </dt>
                  <dd className="text-[15px] md:text-[16px] text-ink leading-[1.5]">{row.tech}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="relative bg-night text-bone rounded-t-[32px] md:rounded-t-[48px] py-24 md:py-36 text-center overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(52% 60% at 50% 100%, rgba(200, 240, 75, 0.16), rgba(200, 240, 75, 0) 72%)',
            }}
          />
          <div className="shell relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50 mb-8">
              Have a similar project?
            </p>
            <SplitHeading className="text-[clamp(40px,7vw,128px)] leading-[0.92] mb-12">
              <span className="block text-bone">Let's build the</span>
              <span className="block text-bone">
                <span className="hero-mark">system</span> behind it.
              </span>
            </SplitHeading>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/#contact"
                onClick={(e) => goHome(e, 'contact')}
                className="group inline-flex items-center gap-3 h-[54px] px-7 rounded-[6px] bg-lime text-ink text-[13px] font-semibold uppercase tracking-[0.04em] transition-all duration-300 hover:brightness-95"
              >
                Start a project
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/#projects"
                onClick={(e) => goHome(e, 'projects')}
                className="group inline-flex items-center gap-3 h-[54px] px-7 rounded-[6px] border border-lime/30 text-bone text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-300 hover:border-lime/70"
              >
                <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                View projects
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
