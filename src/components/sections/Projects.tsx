import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { FaGithub } from 'react-icons/fa';
import Reveal from '../motion/Reveal';
import TechIcon from '../ui/TechIcon';
import { prefersReducedMotion } from '../../lib/motion';
import { PROJECTS, type Project } from '../../data/projects';

const SCROLL_PER_PROJECT_SVH = 85;
const STEP_LOCK_MS = 1050;

const pad = (n: number) => String(n).padStart(2, '0');

function usePinned(): boolean {
  const query = '(min-width: 1024px) and (min-height: 720px)';
  const [pinned, setPinned] = useState<boolean>(
    () => typeof window !== 'undefined' && !prefersReducedMotion() && window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setPinned(!prefersReducedMotion() && media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return pinned;
}

function openCaseStudy(e: MouseEvent<HTMLAnchorElement>, url: string) {
  e.preventDefault();
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

function ProjectLinks({ project }: { project: Project }) {
  const link =
    'group inline-flex items-center gap-2.5 pb-2 border-b border-ink/30 text-ink text-[15px] transition-colors duration-300 hover:border-ink';
  const arrow =
    'text-[13px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5';

  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      {project.caseStudyUrl && (
        <a
          href={project.caseStudyUrl}
          onClick={(e) => openCaseStudy(e, project.caseStudyUrl as string)}
          className={link}
        >
          View project details <span aria-hidden className={arrow}>↗</span>
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={link}>
          View live product <span aria-hidden className={arrow}>↗</span>
        </a>
      )}
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={link}>
        <FaGithub aria-hidden className="w-4 h-4" />
        GitHub <span aria-hidden className={arrow}>↗</span>
      </a>
    </div>
  );
}

function StatusPill({ status }: { status: NonNullable<Project['status']> }) {
  return (
    <span className="inline-flex items-center gap-2 h-6 px-2.5 rounded-full bg-night text-bone font-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap">
      <span className={`w-1.5 h-1.5 rounded-full ${status.live ? 'bg-lime' : 'bg-white/40'}`} />
      {status.label}
    </span>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-deeplime mb-3">Tech stack</p>
      <ul className="flex flex-wrap gap-2">
        {tech.map((name) => (
          <li
            key={name}
            className="inline-flex items-center gap-2 h-9 pl-2.5 pr-3.5 rounded-[8px] border border-ink/12 bg-white text-[13px] font-medium text-ink"
          >
            <TechIcon name={name} />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHead({ active, total }: { active: number | null; total: number }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12 pb-6 border-b border-ink/15">
      <div>
        <h2 className="text-ink text-[clamp(38px,4.6vw,78px)] leading-[0.95]">
          Featured <span className="hero-mark">projects.</span>
        </h2>
      </div>

      <div className="flex items-end justify-between gap-10 lg:gap-14">
        <p className="text-body text-[15px] md:text-[16px] leading-[1.6] max-w-[480px]">
          Products I designed and built end to end, from the first screen to the AI
          behind it.
        </p>

        {active !== null && (
          <div className="shrink-0" aria-label={`Project ${active + 1} of ${total}`}>
            <p className="font-display font-medium text-ink text-[40px] leading-none tracking-[-0.03em] text-right tabular-nums">
              {pad(active + 1)}
              <span className="font-mono text-[12px] text-body tracking-normal"> / {pad(total)}</span>
            </p>
            <div className="mt-3 flex gap-1.5 justify-end">
              {Array.from({ length: total }, (_, i) => (
                <span
                  key={i}
                  className={`block h-[2px] w-8 rounded-full transition-colors duration-500 ${
                    i <= active ? 'bg-ink' : 'bg-ink/15'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const pinned = usePinned();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) return;

    const geometry = () => {
      const rect = track.getBoundingClientRect();
      const travel = track.offsetHeight - window.innerHeight;
      return {
        top: rect.top,
        travel,
        pageTop: rect.top + window.scrollY,
        engaged: travel > 0 && rect.top <= 1 && rect.bottom >= window.innerHeight - 1,
      };
    };
    const indexAt = (top: number, travel: number) => {
      const progress = Math.min(1, Math.max(0, -top / travel));
      return Math.min(total - 1, Math.floor(progress * total));
    };
    const positionOf = (i: number, g: ReturnType<typeof geometry>) =>
      Math.round(g.pageTop + g.travel * ((i + 0.5) / total));
    const scrollToProject = (i: number, g: ReturnType<typeof geometry>, duration = 0.9) => {
      window.dispatchEvent(
        new CustomEvent('lenis:scroll-top', { detail: { top: positionOf(i, g), duration } })
      );
    };

    let frame = 0;
    let wasEngaged = geometry().engaged;
    let lastTop = geometry().top;
    let lockedUntil = 0;
    let lastWheelAt = -Infinity;
    let jumpingUntil = 0;

    const onJump = () => {
      jumpingUntil = performance.now() + 2600;
    };

    const measure = () => {
      frame = 0;
      const g = geometry();
      if (g.travel <= 0) return;
      setActive(indexAt(g.top, g.travel));

      const now = performance.now();
      const byWheel = now - lastWheelAt < 1400 && now > jumpingUntil;
      if (g.engaged && !wasEngaged && byWheel && now > lockedUntil) {
        const fromAbove = lastTop > g.top;
        lockedUntil = now + STEP_LOCK_MS;
        scrollToProject(fromAbove ? 0 : total - 1, g, 0.7);
      }
      wasEngaged = g.engaged;
      lastTop = g.top;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const now = performance.now();
      lastWheelAt = now;
      jumpingUntil = 0;

      const g = geometry();
      if (!g.engaged) return;

      if (now < lockedUntil) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const current = indexAt(g.top, g.travel);
      const next = current + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next > total - 1) return;

      e.preventDefault();
      e.stopPropagation();
      lockedUntil = now + STEP_LOCK_MS;
      scrollToProject(next, g);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('lenis:scroll-to', onJump);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('lenis:scroll-to', onJump);
      cancelAnimationFrame(frame);
    };
  }, [pinned, total]);

  if (!pinned) {
    return (
      <section id="projects" className="relative w-full bg-cream py-24 md:py-28">
        <div className="shell">
          <SectionHead active={null} total={total} />

          <div className="flex flex-col gap-16 md:gap-20 pt-12 md:pt-14">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.id}>
                <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 lg:order-2">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="block w-full h-auto rounded-[24px] border border-ink/10"
                      loading="lazy"
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-body mb-4">
                      {pad(i + 1)} · {project.category}
                      {project.status && <StatusPill status={project.status} />}
                    </p>
                    <h3 className="text-ink text-[clamp(34px,8vw,56px)] leading-[0.98] mb-5">
                      {project.title}
                    </h3>
                    <p className="text-body text-[16px] leading-[1.6] mb-6">{project.description}</p>
                    <div className="mb-8">
                      <TechTags tech={project.tech} />
                    </div>
                    <ProjectLinks project={project} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative w-full bg-cream">
      <div
        ref={trackRef}
        style={{ height: `calc(100svh + ${total * SCROLL_PER_PROJECT_SVH}svh)` }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="shell h-full flex flex-col pt-[106px] pb-7">
            <SectionHead active={active} total={total} />

            <div className="relative flex-1 min-h-0 grid">
              {PROJECTS.map((project, i) => {
                const state = i === active ? 'on' : i < active ? 'before' : 'after';
                return (
                  <article
                    key={project.id}
                    inert={state !== 'on'}
                    className={`col-start-1 row-start-1 min-h-0 grid grid-cols-12 gap-8 xl:gap-12 items-center pt-6 transition-opacity duration-500 ${
                      state === 'on' ? 'opacity-100 delay-150' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <div
                      className={`col-span-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        state === 'on'
                          ? 'translate-y-0 delay-150'
                          : state === 'before'
                            ? '-translate-y-12'
                            : 'translate-y-12'
                      }`}
                    >
                      <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-body mb-5">
                        {project.category}
                        {project.status && <StatusPill status={project.status} />}
                      </p>
                      <h3 className="text-ink text-[clamp(34px,3.7vw,68px)] leading-[0.96] mb-5">
                        {project.title}
                      </h3>
                      <p className="text-body text-[15px] xl:text-[17px] leading-[1.6] mb-6 line-clamp-5">
                        {project.description}
                      </p>
                      <div className="mb-7">
                        <TechTags tech={project.tech} />
                      </div>
                      <ProjectLinks project={project} />
                    </div>

                    <div
                      className={`col-span-8 h-full min-h-0 flex items-center justify-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        state === 'on'
                          ? 'translate-y-0 scale-100 delay-150'
                          : state === 'before'
                            ? '-translate-y-16 scale-[0.96]'
                            : 'translate-y-16 scale-[0.96]'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="block w-auto h-auto max-w-full max-h-[min(calc(100svh-272px),760px)] rounded-[24px] border border-ink/10"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
