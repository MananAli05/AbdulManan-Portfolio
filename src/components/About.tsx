import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
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
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#070C08] text-[#F3F3EE] overflow-hidden border-t border-[#8E9B4D]/15"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_40%,rgba(142,155,77,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: About Content */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Large Editorial Heading */}
            <h2 className="text-[clamp(2.125rem,4.5vw,3.75rem)] font-semibold leading-[0.96] tracking-[0.02em] text-[#E9E5DF] mb-5 font-sans">
              THE ENGINEER <br className="hidden sm:block" />
              <span className="text-[#8E9B4D]">BEHIND THE AI</span>
            </h2>

            {/* Body Description */}
            <div className="space-y-4 text-[#9EA298] text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-[640px] mb-8 sm:mb-9">
              <p>
                I'm Abdul Manan, an AI Engineer focused on designing and building intelligent systems that solve real-world problems. My work combines artificial intelligence, RAG systems, voice AI agents, modern web technologies, and automation to create practical, production-focused digital products.
              </p>
              <p>
                I have experience working as a Python Developer at BuiltinSoft and am currently working at CodAgentic, where I focus on developing AI-powered products, automation systems, and intelligent solutions for real-world business needs.
              </p>
            </div>

            {/* Recruiter-Focused Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 sm:gap-y-0 pt-6 border-t border-[#8E9B4D]/20 max-w-[640px] sm:divide-x divide-[#8E9B4D]/25">
              {/* Stat 1 */}
              <div className="pr-3 sm:pr-5">
                <div className="text-2xl sm:text-3xl font-medium text-[#E9E5DF] tracking-tight">
                  01<span className="text-[#8E9B4D]">+</span>
                </div>
                <div className="text-[10px] font-mono text-[#8E9B4D] uppercase tracking-wider mt-1 font-medium leading-snug">
                  YEARS EXPERIENCE
                </div>
              </div>

              {/* Stat 2 */}
              <div className="px-0 sm:px-5">
                <div className="text-2xl sm:text-3xl font-medium text-[#E9E5DF] tracking-tight">
                  15<span className="text-[#8E9B4D]">+</span>
                </div>
                <div className="text-[10px] font-mono text-[#8E9B4D] uppercase tracking-wider mt-1 font-medium leading-snug">
                  AI PROJECTS
                </div>
              </div>

              {/* Stat 3 */}
              <div className="pr-3 sm:px-5">
                <div className="text-2xl sm:text-3xl font-medium text-[#E9E5DF] tracking-tight">
                  10<span className="text-[#8E9B4D]">+</span>
                </div>
                <div className="text-[10px] font-mono text-[#8E9B4D] uppercase tracking-wider mt-1 font-medium leading-snug">
                  TECHNOLOGIES
                </div>
              </div>

              {/* Stat 4 */}
              <div className="px-0 sm:pl-5">
                <div className="text-2xl sm:text-3xl font-medium text-[#E9E5DF] tracking-tight">
                  24<span className="text-[#8E9B4D]">/</span>7
                </div>
                <div className="text-[10px] font-mono text-[#8E9B4D] uppercase tracking-wider mt-1 font-medium leading-snug">
                  AI SYSTEMS
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Vertical Portrait */}
          <div
            className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group relative w-full max-w-[340px] sm:max-w-[360px]">
              {/* Subtle Decorative Corner Accent Lines */}
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 border-t-2 border-l-2 border-[#8E9B4D]/50 pointer-events-none transition-all duration-300 group-hover:border-[#8E9B4D] group-hover:-top-3 group-hover:-left-3" />
              <div className="absolute -bottom-2.5 -right-2.5 w-6 h-6 border-b-2 border-r-2 border-[#8E9B4D]/50 pointer-events-none transition-all duration-300 group-hover:border-[#8E9B4D] group-hover:-bottom-3 group-hover:-right-3" />

              {/* Clean Editorial Portrait Wrapper */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] border border-[#8E9B4D]/30 bg-[#0B1109] p-1.5 shadow-xl transition-all duration-500 group-hover:border-[#8E9B4D]/60 group-hover:shadow-[0_0_25px_rgba(142,155,77,0.15)]">
                <img
                  src="/manan.png"
                  alt="Abdul Manan - AI Engineer"
                  className="w-full h-full object-cover rounded-[2px] grayscale contrast-[1.08] brightness-95 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03] about-profile-img"
                  loading="lazy"
                />
              </div>

              {/* Subtle Olive Detail Tag */}
              <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 bg-[#070C08]/85 backdrop-blur-md border border-[#8E9B4D]/30 rounded-[3px] opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[9px] text-[#E9E5DF] tracking-widest uppercase">
                  ABDUL MANAN &nbsp;·&nbsp; <span className="text-[#8E9B4D]">AI ENG</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
