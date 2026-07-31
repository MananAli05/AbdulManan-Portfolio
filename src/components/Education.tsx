import { useEffect, useRef, useState } from 'react';

interface EducationItem {
  id: string;
  year: string;
  degree: string;
  institution: string;
  location: string;
  logo: string;
  cgpa?: string;
}

const EDUCATION_ENTRIES: EducationItem[] = [
  {
    id: 'kfueit',
    year: '2022 — 2026',
    degree: 'Bachelor in Data Science',
    institution: 'Khwaja Fareed University of Engineering & Information Technology',
    location: 'Rahim Yar Khan, Pakistan',
    logo: '/kfueit.png',
    cgpa: '3.56 / 4.00',
  },
  {
    id: 'aspire',
    year: '2020 — 2022',
    degree: 'Intermediate — FSc Pre-Engineering',
    institution: 'Aspire College',
    location: 'Rahim Yar Khan, Pakistan',
    logo: '/aspire.png',
  },
];

export default function Education() {
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
      id="education"
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
            MY EDUCATION <br className="hidden sm:block" />
            <span className="text-[#8E9B4D]">& ACADEMIC BACKGROUND</span>
          </h2>

          <p className="text-[#E9E5DF]/80 text-xs sm:text-sm md:text-base max-w-[650px] mx-auto font-normal leading-relaxed text-center">
            Academic foundations in data, engineering, and problem-solving that shaped how I build intelligent systems today.
          </p>
        </div>

        {/* VERTICAL TIMELINE CONTAINER (MATCHING EXPERIENCE SECTION STYLE) */}
        <div className="max-w-[960px] mx-auto relative">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-[#8E9B4D]/35 pointer-events-none" />

          <div className="flex flex-col space-y-10 sm:space-y-12">
            {EDUCATION_ENTRIES.map((entry, idx) => (
              <div
                key={entry.id}
                className={`relative flex items-start pl-10 sm:pl-14 transition-all duration-700 ease-out group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Circular Timeline Node */}
                <div className="absolute left-0 top-6 sm:top-7 w-8 h-8 flex items-center justify-center -translate-x-[1px]">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#8E9B4D] border-2 border-[#070C08] shadow-[0_0_8px_rgba(142,155,77,0.4)] group-hover:scale-125 transition-transform duration-300" />
                </div>

                {/* Flat Minimal Rectangular Panel (#E9E5DF surface matching Experience section) */}
                <div className="w-full p-6 sm:p-8 rounded-[10px] bg-[#E9E5DF] text-[#11140F] border border-[#D6D2CA] transition-all duration-350 ease-out hover:-translate-y-1 hover:border-[#8E9B4D] hover:shadow-lg hover:shadow-black/20">
                  
                  {/* Top Row: Institution Logo (Left) & Date Range (Right) */}
                  <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[#11140F]/10">
                    <div className="h-10 sm:h-12 flex items-center justify-start">
                      <img
                        src={entry.logo}
                        alt={entry.institution}
                        className="h-full w-auto max-w-[140px] object-contain filter drop-shadow-sm"
                      />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#6F7B36] shrink-0">
                      {entry.year}
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#11140F] mb-1 font-sans">
                    {entry.degree}
                  </h3>

                  {/* Institution Name */}
                  <p className="text-sm sm:text-base font-semibold text-[#383D34] mb-1 font-sans">
                    {entry.institution}
                  </p>

                  {/* Location */}
                  <p className="font-mono text-xs text-[#52584D]">
                    {entry.location}
                  </p>

                  {/* CGPA Detail (if applicable) */}
                  {entry.cgpa && (
                    <div className="mt-4 pt-3 border-t border-[#11140F]/10 flex items-center justify-end">
                      <span className="font-mono text-xs font-bold text-[#6F7B36]">
                        CGPA {entry.cgpa}
                      </span>
                    </div>
                  )}

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
