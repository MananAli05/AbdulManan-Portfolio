import { useEffect, useRef, useState } from 'react';
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiLangchain,
  SiHuggingface,
  SiFastapi,
  SiDjango,
  SiPostgresql,
  SiSupabase,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiGit,
  SiGithub,
  SiDocker,
} from 'react-icons/si';
import { Database, Sparkles, Webhook, Cloud, Bot } from 'lucide-react';

interface TechCategory {
  title: string;
  items: { name: string; icon: JSX.Element }[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'AI / ML',
    items: [
      { name: 'Python', icon: <SiPython color="#3776AB" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'TensorFlow', icon: <SiTensorflow color="#FF6F00" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'PyTorch', icon: <SiPytorch color="#EE4C2C" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn color="#F7931E" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'OpenCV', icon: <SiOpencv color="#5C3EE8" className="w-7 h-7 sm:w-8 sm:h-8" /> },
    ],
  },
  {
    title: 'LLM / AI',
    items: [
      { name: 'OpenAI', icon: <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-[#10A37F]" /> },
      { name: 'LangChain', icon: <SiLangchain color="#38BDF8" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'Hugging Face', icon: <SiHuggingface color="#FFD21E" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'RAG', icon: <Database className="w-6 h-6 sm:w-7 sm:h-7 text-[#8E9B4D]" /> },
      { name: 'LLMs', icon: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#8E9B4D]" /> },
    ],
  },
  {
    title: 'BACKEND',
    items: [
      { name: 'FastAPI', icon: <SiFastapi color="#009688" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'Django', icon: <SiDjango color="#44B78B" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'REST API', icon: <Webhook className="w-6 h-6 sm:w-7 sm:h-7 text-[#8E9B4D]" /> },
    ],
  },
  {
    title: 'DATA',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'Supabase', icon: <SiSupabase color="#3ECF8E" className="w-7 h-7 sm:w-8 sm:h-8" /> },
    ],
  },
  {
    title: 'FRONTEND',
    items: [
      { name: 'React', icon: <SiReact color="#61DAFB" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" className="w-7 h-7 sm:w-8 sm:h-8" /> },
    ],
  },
  {
    title: 'DEV TOOLS',
    items: [
      { name: 'Git', icon: <SiGit color="#F05032" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'GitHub', icon: <SiGithub color="#FFFFFF" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'Docker', icon: <SiDocker color="#2496ED" className="w-7 h-7 sm:w-8 sm:h-8" /> },
      { name: 'Cloud', icon: <Cloud className="w-6 h-6 sm:w-7 sm:h-7 text-[#8E9B4D]" /> },
    ],
  },
];

export default function TechStack() {
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
      id="tech-stack"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#070C08] text-[#F3F3EE] overflow-hidden border-t border-[#8E9B4D]/15"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(142,155,77,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto">
        
        {/* HEADER */}
        <div
          className={`flex flex-col items-center justify-center text-center mb-10 md:mb-12 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Heading */}
          <h2 className="text-[clamp(2.125rem,4.5vw,3.75rem)] font-semibold leading-[0.96] tracking-[0.02em] text-[#E9E5DF] mb-4 font-sans text-center">
            ENGINEERED WITH <br className="hidden sm:block" />
            <span className="text-[#8E9B4D]">THE BEST</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#9EA298] text-xs sm:text-sm md:text-base max-w-[580px] font-normal leading-relaxed text-center">
            Technologies I use to turn ideas into production-ready AI products.
          </p>
        </div>

        {/* 3-COLUMN × 2-ROW CLEAN CATEGORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {TECH_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.title}
              className={`flex flex-col border-t border-[#8E9B4D]/25 pt-5 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              {/* Category Label */}
              <div className="flex items-center justify-between mb-4 pb-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.18em] font-semibold text-[#8E9B4D]">
                  {cat.title}
                </span>
                <span className="font-mono text-[10px] text-[#8E9B4D]/50 uppercase">
                  0{idx + 1}
                </span>
              </div>

              {/* Technology Items */}
              <div className="flex flex-col gap-2.5">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex items-center gap-3.5 p-2 rounded-[5px] transition-all duration-300 cursor-default hover:bg-[#8E9B4D]/10 hover:shadow-[0_0_12px_rgba(142,155,77,0.12)]"
                  >
                    {/* Logo (Official Brand Color, Direct Rendering, No Square Background) */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>

                    {/* Technology Name */}
                    <span className="text-[#E9E5DF] text-xs sm:text-sm font-sans font-medium tracking-wide group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
