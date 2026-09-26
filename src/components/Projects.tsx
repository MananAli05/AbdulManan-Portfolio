import React, { useLayoutEffect, useRef, useState } from 'react';
import SplitHeading from './motion/SplitHeading';
import Reveal from './motion/Reveal';
import ArrowButton from './ui/ArrowButton';
import { gsap, prefersReducedMotion, EASE } from '../lib/motion';

// Tech SVG Icons in Recognizable Original Brand Colors
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const ViteIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#646CFF" d="M21.5 3.5l-8.5 17-2.5-4.5L18 3.5h3.5z" />
    <path fill="#FFD21E" d="M2.5 3.5l8 17 2-4L5.5 3.5h-3z" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#3776AB" d="M11.914 2c-4.49 0-4.21 1.947-4.21 1.947l.006 2.016h4.264s2.052-.008 2.052 1.986c0 1.996 0 3.12 0 3.12h-6.19s-2.032.062-2.032-2.055V4.67s.103-2.67 4.257-2.67h1.853zm.086 2.115a.73.73 0 1 0 0 1.46.73.73 0 0 0 0-1.46z" />
    <path fill="#FFD43B" d="M12.086 22c4.49 0 4.21-1.947 4.21-1.947l-.006-2.016H12.026s-2.052.008-2.052-1.986c0-1.996 0-3.12 0-3.12h6.19s2.032-.062 2.032 2.055v4.344s-.103 2.67-4.257 2.67h-1.853zm-.086-2.115a.73.73 0 1 0 0 1.46.73.73 0 0 0 0 1.46z" />
  </svg>
);

const FastAPIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="11" fill="#009688" />
    <path fill="#FFFFFF" d="M12.8 4L6 13h5v7l6.8-9h-5V4z" />
  </svg>
);

const FirebaseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#FFCA28" d="M3.8 17.5l4-11.8 4.2 4.1L3.8 17.5z" />
    <path fill="#FFA000" d="M13.2 11.2l2.6-4.9 4.4 11.2-7-6.3z" />
    <path fill="#F57C00" d="M3.8 17.5L12 22l8.2-4.5L13.2 11.2z" />
  </svg>
);

const TwilioIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="11" fill="#F22F46" />
    <circle cx="8" cy="8" r="2.2" fill="#FFFFFF" />
    <circle cx="16" cy="8" r="2.2" fill="#FFFFFF" />
    <circle cx="8" cy="16" r="2.2" fill="#FFFFFF" />
    <circle cx="16" cy="16" r="2.2" fill="#FFFFFF" />
  </svg>
);

const GroqIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <rect width="24" height="24" rx="6" fill="#F05023" />
    <path fill="#FFFFFF" d="M7 8h10v2H7V8zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
  </svg>
);

const ElevenLabsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <rect x="7" y="5" width="3.5" height="14" rx="1.5" fill="#FFFFFF" />
    <rect x="13.5" y="5" width="3.5" height="14" rx="1.5" fill="#FFFFFF" />
  </svg>
);

const FlutterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#47C5FB" d="M14.3 2.5L7 9.8l4.6 4.6 7.3-7.3z" />
    <path fill="#02569B" d="M11.6 14.4l2.7 2.7 4.6-4.6h-5.4z" />
    <path fill="#01579B" d="M14.3 17.1l-2.7 2.7h5.4l1.9-1.9z" />
  </svg>
);

const DartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#0175C2" d="M4.5 3.5L13.5 12.5L20 6L9.5 3.5L4.5 3.5z" />
    <path fill="#00B4AB" d="M13.5 12.5L7 19L14.5 21.5L20 15L13.5 12.5z" />
    <path fill="#01579B" d="M7 19L2 14L4.5 3.5L13.5 12.5L7 19z" />
  </svg>
);

const GoogleMLKitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#4285F4" d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5l5.5 3.5-5.5 3.5-5.5-3.5L12 4.5zM6 9.5l5 3v5.5l-5-3.2V9.5zm7 8.5v-5.5l5-3v5.3l-5 3.2z" />
  </svg>
);

const CNNIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <circle cx="6" cy="6" r="2" fill="#5E7D12" />
    <circle cx="6" cy="18" r="2" fill="#5E7D12" />
    <circle cx="12" cy="12" r="2" fill="#5E7D12" />
    <circle cx="18" cy="6" r="2" fill="#5E7D12" />
    <circle cx="18" cy="18" r="2" fill="#5E7D12" />
    <path stroke="#5E7D12" strokeWidth="1.2" fill="none" d="M8 6h8M8 18h8M7.5 7.5l3 3M7.5 16.5l3-3M13.5 10.5l3-3M13.5 13.5l3 3" />
  </svg>
);

const OCRIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="none" stroke="#5E7D12" strokeWidth="1.5" strokeLinecap="round" d="M4 8V5h3M17 5h3v3M4 16v3h3M20 16v3h-3M7 10h10M7 14h7" />
  </svg>
);

const GitHubOctocatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-white">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);


interface TechItem {
  name: string;
  icon: React.JSX.Element;
}

interface ProjectSlide {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: TechItem[];
  mockupImage?: string;
  githubUrl?: string;
  demoUrl?: string;
  demoButtonLabel?: string;
  isInternalLink?: boolean;
  placeholderLabel: string;
}

const PROJECTS: ProjectSlide[] = [
  {
    id: 'sage-salt',
    number: '01',
    title: 'Sage & Salt',
    tagline: 'AI Restaurant Management & Ordering System',
    description:
      'AI-powered restaurant management and ordering system combining Voice AI, WhatsApp automation, QR ordering, and intelligent workflows to streamline restaurant operations and customer service.',
    features: [
      'Voice AI Agent for phone ordering',
      'WhatsApp ordering & automated conversations',
      'QR-based digital menu and ordering',
      'Admin dashboard & order management',
      'Real-time order tracking and analytics',
    ],
    techStack: [
      { name: 'React', icon: <ReactIcon /> },
      { name: 'Vite', icon: <ViteIcon /> },
      { name: 'Firebase', icon: <FirebaseIcon /> },
      { name: 'Twilio', icon: <TwilioIcon /> },
      { name: 'Groq', icon: <GroqIcon /> },
      { name: 'ElevenLabs', icon: <ElevenLabsIcon /> },
    ],
    mockupImage: '/sag&salt.png',
    githubUrl: 'https://github.com/MananAli05',
    demoUrl: 'https://sage-and-salt.vercel.app/',
    demoButtonLabel: 'Live demo',
    placeholderLabel: 'SAGE & SALT MOCKUP PREVIEW',
  },
  {
    id: 'multilingual-healthcare',
    number: '02',
    title: 'Multilingual AI Healthcare',
    tagline: 'Intelligent Medical Assistant & Diagnostic Platform',
    description:
      'AI-powered multilingual healthcare assistant combining intelligent symptom checking, X-ray analysis, lab report interpretation, voice interaction, and emergency support in a single mobile experience.',
    features: [
      'Multilingual AI symptom checker with voice input',
      'AI-based X-ray analysis and pneumonia detection',
      'Lab report analysis using OCR',
      'Health activity and diagnosis history',
      'Emergency calling for quick assistance',
      'Voice-powered AI healthcare interaction',
    ],
    techStack: [
      { name: 'Flutter', icon: <FlutterIcon /> },
      { name: 'Dart', icon: <DartIcon /> },
      { name: 'Python', icon: <PythonIcon /> },
      { name: 'Firebase', icon: <FirebaseIcon /> },
      { name: 'Groq', icon: <GroqIcon /> },
      { name: 'Google ML Kit', icon: <GoogleMLKitIcon /> },
      { name: 'CNN', icon: <CNNIcon /> },
      { name: 'OCR', icon: <OCRIcon /> },
    ],
    mockupImage: '/medical.png',
    demoUrl: '/projects/medicare',
    demoButtonLabel: 'View case study',
    isInternalLink: true,
    placeholderLabel: 'MULTILINGUAL AI HEALTHCARE MOCKUP PREVIEW',
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const project = PROJECTS[currentIndex];
  const total = PROJECTS.length;

  // Cross-fade the panel whenever the slide changes.
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 28 * direction, filter: 'blur(6px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, ease: EASE }
      );
    }, el);

    return () => ctx.revert();
  }, [currentIndex, direction]);

  const goTo = (next: number) => {
    setDirection(next > currentIndex ? 1 : -1);
    setCurrentIndex((next + total) % total);
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 60) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!project.isInternalLink || !project.demoUrl) return;
    e.preventDefault();
    window.history.pushState({}, '', project.demoUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="projects" className="relative w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        {/* Section head */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14 md:mb-16">
          <div className="max-w-[900px]">
            <Reveal className="eyebrow mb-7">Featured work</Reveal>
            <SplitHeading className="title-xl">
              <span className="block text-ink">Built to solve</span>
              <span className="block text-faint">real problems.</span>
            </SplitHeading>
          </div>

          {/* Counter + controls */}
          <Reveal className="flex items-center gap-8 shrink-0">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[13px] text-ink tracking-[0.06em]">
                {project.number} <span className="text-faint">/ {String(total).padStart(2, '0')}</span>
              </span>
              <span className="block w-[120px] h-[3px] rounded-full bg-line overflow-hidden">
                <span
                  className="block h-full rounded-full bg-lime transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="grid place-items-center w-12 h-12 rounded-full border border-line text-ink transition-colors duration-300 hover:bg-ink hover:border-ink hover:text-cream cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next project"
                className="grid place-items-center w-12 h-12 rounded-full border border-line text-ink transition-colors duration-300 hover:bg-ink hover:border-ink hover:text-cream cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Project card */}
        <Reveal>
          <div
            ref={panelRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="card-surface overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image */}
            <div className="lg:col-span-7 relative bg-[#F2F0E8] flex items-center justify-center p-6 sm:p-10 lg:p-14 min-h-[300px]">
              {project.mockupImage ? (
                <img
                  src={project.mockupImage}
                  alt={`${project.title} — product preview`}
                  className="w-full h-auto max-h-[520px] object-contain rounded-[18px]"
                  loading="lazy"
                />
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  {project.placeholderLabel}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-deeplime mb-5">
                {project.tagline}
              </span>

              <h3 className="font-display font-bold text-ink text-[clamp(28px,2.6vw,44px)] tracking-[-0.045em] leading-[1.02] mb-5">
                {project.title}
              </h3>

              <p className="text-body text-[15px] md:text-[16px] leading-[1.65] mb-8">
                {project.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-9">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[15px] text-ink leading-[1.5]">
                    <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-9 pb-9 border-b border-line">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-cream border border-line text-[13px] text-ink"
                  >
                    <span className="w-4 h-4 flex items-center justify-center">{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 mt-auto">
                {project.demoUrl && (
                  <ArrowButton
                    href={project.demoUrl}
                    onClick={project.isInternalLink ? handleDemoClick : undefined}
                    external={!project.isInternalLink}
                    variant="ink"
                  >
                    {project.demoButtonLabel ?? 'View project'}
                  </ArrowButton>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-[14px] rounded-full border border-line text-ink text-[14px] font-medium transition-colors duration-300 hover:border-ink"
                  >
                    <span className="w-4 h-4 flex items-center justify-center">
                      <GitHubOctocatIcon />
                    </span>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Slide dots */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === currentIndex}
              className={`h-[3px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                i === currentIndex ? 'w-10 bg-lime' : 'w-5 bg-line hover:bg-faint'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
