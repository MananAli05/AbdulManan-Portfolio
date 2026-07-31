import { useEffect, useRef, useState } from 'react';

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
    <circle cx="6" cy="6" r="2" fill="#8E9B4D" />
    <circle cx="6" cy="18" r="2" fill="#8E9B4D" />
    <circle cx="12" cy="12" r="2" fill="#8E9B4D" />
    <circle cx="18" cy="6" r="2" fill="#8E9B4D" />
    <circle cx="18" cy="18" r="2" fill="#8E9B4D" />
    <path stroke="#8E9B4D" strokeWidth="1.2" fill="none" d="M8 6h8M8 18h8M7.5 7.5l3 3M7.5 16.5l3-3M13.5 10.5l3-3M13.5 13.5l3 3" />
  </svg>
);

const OCRIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="none" stroke="#8E9B4D" strokeWidth="1.5" strokeLinecap="round" d="M4 8V5h3M17 5h3v3M4 16v3h3M20 16v3h-3M7 10h10M7 14h7" />
  </svg>
);

const GitHubOctocatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-white">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

interface TechItem {
  name: string;
  icon?: JSX.Element;
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
  placeholderLabel: string;
}

const PROJECTS: ProjectSlide[] = [
  {
    id: 'sage-salt',
    number: '01',
    title: 'Sage & Salt',
    tagline: 'AI Restaurant Management & Ordering System',
    description: 'AI-powered restaurant management and ordering system combining Voice AI, WhatsApp automation, QR ordering, and intelligent workflows to streamline restaurant operations and customer service.',
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
    githubUrl: 'https://github.com/manan/sage-and-salt',
    demoUrl: '#',
    demoButtonLabel: 'Live Demo ↗',
    placeholderLabel: 'SAGE & SALT MOCKUP PREVIEW',
  },
  {
    id: 'multilingual-healthcare',
    number: '02',
    title: 'Multilingual AI Healthcare',
    tagline: 'Intelligent Medical Assistant & Diagnostic Platform',
    description: 'AI-powered multilingual healthcare assistant combining intelligent symptom checking, X-ray analysis, lab report interpretation, voice interaction, and emergency support in a single mobile experience.',
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
    githubUrl: '#',
    demoUrl: '#',
    demoButtonLabel: 'View Case Study ↗',
    placeholderLabel: 'MULTILINGUAL AI HEALTHCARE MOCKUP PREVIEW',
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentProject = PROJECTS[currentIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#070C08] text-[#F3F3EE] overflow-hidden border-t border-[#8E9B4D]/15"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(142,155,77,0.04)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto">
        
        {/* SECTION HEADER */}
        <div
          className={`flex flex-col items-center justify-center text-center mb-8 sm:mb-10 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[clamp(2.125rem,4.5vw,3.75rem)] font-semibold leading-[0.96] tracking-[0.02em] text-[#E9E5DF] mb-3 font-sans text-center">
            FEATURED WORK <br className="hidden sm:block" />
            BUILT TO SOLVE <span className="text-[#8E9B4D]">REAL PROBLEMS</span>
          </h2>
          <p className="text-[#E9E5DF]/80 text-xs sm:text-sm md:text-base max-w-[660px] mx-auto font-normal leading-relaxed text-center">
            A selection of AI systems, intelligent applications, and production-focused products engineered to solve complex business challenges.
          </p>
        </div>

        {/* TOP CAROUSEL NAVIGATION ROW (ABOVE THE PROJECT CARD) */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#8E9B4D]/15">
          {/* TOP LEFT: Compact rounded-square arrow buttons [ ← ] [ → ] */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={prevSlide}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] border border-[#8E9B4D]/35 bg-[#121B10]/70 text-[#E9E5DF] hover:bg-[#8E9B4D] hover:text-[#070C08] hover:border-[#8E9B4D] transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
              aria-label="Previous Project"
            >
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] border border-[#8E9B4D]/35 bg-[#121B10]/70 text-[#E9E5DF] hover:bg-[#8E9B4D] hover:text-[#070C08] hover:border-[#8E9B4D] transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
              aria-label="Next Project"
            >
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* TOP RIGHT: 01 / 02 Indicator + 2 Horizontal Indicator Lines */}
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xs tracking-widest text-[#E9E5DF] font-bold">
              <span className="text-[#8E9B4D]">0{currentIndex + 1}</span> / 0{PROJECTS.length}
            </span>
            
            {/* Two Thin Horizontal Indicator Lines */}
            <div className="flex items-center gap-1.5">
              {PROJECTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer ${
                    currentIndex === index
                      ? 'w-8 bg-[#8E9B4D] shadow-[0_0_8px_rgba(142,155,77,0.5)]'
                      : 'w-3.5 bg-[#8E9B4D]/25 hover:bg-[#8E9B4D]/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CAROUSEL SLIDE CONTAINER */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* LEFT SIDE (~58–60%): Clean Visually Dominant Project Mockup Image */}
            <div className="lg:col-span-7 flex justify-center items-center group relative w-full">
              {currentProject.mockupImage ? (
                <div className="w-full relative flex items-center justify-center p-1 rounded-[10px] bg-[#0A1009]/60 border border-[#8E9B4D]/25 shadow-[0_12px_35px_rgba(0,0,0,0.55)] group-hover:border-[#8E9B4D]/50 transition-all duration-500 overflow-hidden">
                  {/* Subtle ambient olive glow behind image */}
                  <div className="absolute inset-0 bg-radial from-[#8E9B4D]/15 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                  
                  <img
                    src={currentProject.mockupImage}
                    alt={currentProject.title}
                    className="w-full h-auto max-h-[440px] sm:max-h-[480px] lg:max-h-[500px] object-contain rounded-[6px] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                </div>
              ) : (
                /* Mockup Placeholder Frame when image not present */
                <div className="w-full aspect-[16/10] max-h-[440px] rounded-[12px] bg-[#121B10] border border-[#8E9B4D]/25 shadow-2xl p-5 flex flex-col justify-between items-center text-center relative overflow-hidden transition-all duration-500 group-hover:border-[#8E9B4D]/50">
                  <div className="w-full flex items-center justify-between pb-2 border-b border-[#8E9B4D]/20">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="text-[10px] font-mono text-[#8E9B4D] uppercase tracking-wider">
                      PROJECT MOCKUP PREVIEW // {currentProject.number}
                    </span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center p-4">
                    <div className="w-12 h-12 rounded-full border border-[#8E9B4D]/40 bg-[#8E9B4D]/10 flex items-center justify-center text-[#8E9B4D] font-mono text-base font-bold mb-3 shadow-lg">
                      {currentProject.number}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-[#E9E5DF] tracking-tight mb-1">
                      {currentProject.title}
                    </h4>
                    <p className="text-[11px] font-mono text-[#8E9B4D] tracking-wider uppercase max-w-xs">
                      {currentProject.placeholderLabel}
                    </p>
                  </div>

                  <div className="w-full pt-2 border-t border-[#8E9B4D]/15 flex items-center justify-between text-[9px] font-mono text-[#9EA298]">
                    <span>16:10 ASPECT RATIO</span>
                    <span className="text-[#8E9B4D]">READY FOR FINAL IMAGE</span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE (~40–42%): Content & Overlapping Description Card */}
            <div className="lg:col-span-5 flex flex-col justify-center relative z-10">
              
              {/* Small label */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="font-mono text-[11px] font-semibold text-[#8E9B4D] uppercase tracking-[0.18em]">
                  FEATURED PROJECT
                </span>
                <span className="font-mono text-[11px] text-[#8E9B4D]/60 font-semibold">
                  // {currentProject.number}
                </span>
              </div>

              {/* Project Name */}
              <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#E9E5DF] tracking-tight leading-tight mb-3">
                {currentProject.title}
              </h3>

              {/* Compact Description Card (Slightly Overlapping Left Image on Desktop) */}
              <div className="relative lg:-ml-8 p-4 sm:p-5 rounded-[10px] bg-[#162214] border border-[#8E9B4D]/35 shadow-xl text-[#9EA298] text-xs sm:text-sm leading-relaxed mb-4 backdrop-blur-md">
                <p className="text-xs sm:text-[13px] text-[#E9E5DF] font-normal leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Key Features */}
              {currentProject.features && currentProject.features.length > 0 && (
                <div className="mb-4">
                  <span className="font-mono text-[10px] text-[#8E9B4D] uppercase tracking-wider block mb-1.5 font-semibold">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-1 text-xs text-[#9EA298]">
                    {currentProject.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="text-[#8E9B4D] text-xs font-mono mt-0.5">•</span>
                        <span className="text-[#E9E5DF]/90 font-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Chips with Real Logos & Hover Glow */}
              <div className="mb-5">
                <span className="font-mono text-[10px] text-[#8E9B4D] uppercase tracking-wider block mb-2 font-semibold">
                  TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#0E150D] border border-[#8E9B4D]/25 text-[11px] font-mono text-[#E9E5DF] hover:border-[#8E9B4D] hover:shadow-[0_0_10px_rgba(142,155,77,0.2)] transition-all duration-300 cursor-default"
                    >
                      {tech.icon && (
                        <span className="w-3.5 h-3.5 flex items-center justify-center">
                          {tech.icon}
                        </span>
                      )}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3.5 border-t border-[#8E9B4D]/15">
                <a
                  href={currentProject.demoUrl || '#'}
                  target={currentProject.demoUrl && currentProject.demoUrl !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#8E9B4D] hover:bg-[#a6b256] text-[#070C08] font-mono text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-[4px] shadow-sm transition-all duration-300 hover:translate-x-0.5 cursor-pointer"
                >
                  {currentProject.demoButtonLabel || 'Live Demo ↗'}
                </a>
                <a
                  href={currentProject.githubUrl || '#'}
                  target={currentProject.githubUrl && currentProject.githubUrl !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-transparent border border-[#8E9B4D]/40 hover:border-[#8E9B4D] text-[#E9E5DF] font-mono text-[11px] font-medium uppercase tracking-wider px-4 py-2 rounded-[4px] transition-all duration-300 hover:bg-[#8E9B4D]/10 hover:shadow-[0_0_10px_rgba(142,155,77,0.2)] cursor-pointer"
                >
                  <GitHubOctocatIcon />
                  <span>GitHub ↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
