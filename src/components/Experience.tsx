import { useEffect, useRef, useState } from 'react';

interface ExperienceData {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

const EXPERIENCES: ExperienceData[] = [
  {
    id: 'codagentic',
    role: 'Junior AI Engineer',
    company: 'Codagentic',
    location: 'Remote',
    date: 'APRIL 2026 — PRESENT',
    bullets: [
      'Contributed to 2+ AI-powered web applications, collaborating with developers to deliver backend services and client features.',
      'Developed RESTful APIs using FastAPI and integrated Supabase for scalable backend services.',
      'Built frontend features using React and TypeScript, contributing to full-stack application development.',
      'Participated in code reviews, debugging, testing, and deployment to ensure production-ready releases.',
      'Performed API and UI testing, resolving bugs before production deployment.',
    ],
  },
  {
    id: 'builtinsoft',
    role: 'Python Developer',
    company: 'BuiltinSoft',
    location: 'Rahim Yar Khan, Pakistan',
    date: 'JULY 2025 — JANUARY 2026',
    bullets: [
      'Developed and maintained RESTful APIs using Django REST Framework for client applications.',
      'Integrated machine learning models into backend APIs for real-time prediction services.',
      'Designed and optimized PostgreSQL databases, improving query performance and response time.',
      'Collaborated with developers on debugging, testing, and backend optimization for production deployments.',
    ],
  },
];

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#070C08] text-[#F3F3EE] overflow-hidden border-t border-[#8E9B4D]/15"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(142,155,77,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto">
        
        {/* SECTION HEADER */}
        <div
          className={`flex flex-col items-center justify-center text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[clamp(2.125rem,4.5vw,3.75rem)] font-semibold leading-[0.96] tracking-[0.02em] text-[#E9E5DF] mb-3 font-sans text-center">
            WHERE I’VE <br className="hidden sm:block" />
            <span className="text-[#8E9B4D]">BUILT & GROWN</span>
          </h2>

          <p className="text-[#E9E5DF]/80 text-xs sm:text-sm md:text-base max-w-[650px] mx-auto font-normal leading-relaxed text-center">
            Building real-world software and AI solutions through hands-on development, collaboration, and production-focused engineering.
          </p>
        </div>

        {/* VERTICAL TIMELINE CONTAINER */}
        <div className="max-w-[960px] mx-auto relative">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-[#8E9B4D]/35 pointer-events-none" />

          <div className="flex flex-col space-y-10 sm:space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.id}
                className={`relative flex items-start pl-10 sm:pl-14 transition-all duration-700 ease-out group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Circular Timeline Node */}
                <div className="absolute left-0 top-6 sm:top-7 w-8 h-8 flex items-center justify-center -translate-x-[1px]">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#8E9B4D] border-2 border-[#070C08] shadow-[0_0_8px_rgba(142,155,77,0.4)] group-hover:scale-125 transition-transform duration-300" />
                </div>

                {/* Flat Minimal Rectangular Panel (#E9E5DF light surface, #11140F main text) */}
                <div className="w-full p-6 sm:p-8 rounded-[10px] bg-[#E9E5DF] text-[#11140F] border border-[#D6D2CA] transition-all duration-350 ease-out hover:-translate-y-1 hover:border-[#8E9B4D] hover:shadow-lg hover:shadow-black/20">
                  
                  {/* Top Row: Date Range (Small Uppercase Mono) */}
                  <div className="mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#6F7B36]">
                      {exp.date}
                    </span>
                  </div>

                  {/* Role Title (Bold & Prominent) & Company Name (Olive Accent) */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#11140F] mb-1">
                    {exp.role} <span className="text-[#6F7B36] font-semibold ml-1.5">— {exp.company}</span>
                  </h3>

                  {/* Location / Work Mode */}
                  <p className="font-mono text-xs text-[#52584D] mb-5">
                    {exp.location}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#383D34] leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-[#6F7B36] font-mono text-xs mt-0.5">•</span>
                        <span className="font-normal">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
