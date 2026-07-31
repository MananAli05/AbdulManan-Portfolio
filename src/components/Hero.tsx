import React from 'react';
import AgentTerminal from './AgentTerminal';

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -76;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-76px)] md:min-h-[calc(100svh-80px)] w-full text-[#F3F3EE] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-24 md:pt-28 pb-10 bg-[#070C08] isolate"
    >
      {/* Dark Forest Green Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_35%,#10190D_0%,#0B130B_55%,#070C08_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(142,155,77,0.06)_0%,transparent_55%)] pointer-events-none z-0" />



      {/* FLOATING SMALL TERMINAL */}
      <div className="hidden xl:block absolute top-[110px] right-[4vw] 2xl:right-[5vw] z-20 pointer-events-auto hero-fade-4">
        <AgentTerminal />
      </div>

      {/* MAIN HERO CONTENT CONTAINER */}
      <div className="max-w-[980px] w-full mx-auto flex flex-col items-center justify-center text-center z-10 my-auto">
        
        {/* Eyebrow */}
        <div className="mb-5 hero-fade-1">
          <span className="text-[#8E9B4D] font-medium text-[11px] sm:text-xs tracking-[0.15em] uppercase">
            AI ENGINEER &nbsp;·&nbsp; AI SYSTEMS &nbsp;·&nbsp; AUTOMATION
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.96] tracking-[0.02em] text-[#E9E5DF] max-w-[840px] mb-5 hero-fade-2 font-sans text-center">
          I BUILD AI SYSTEMS <br />
          THAT <span className="text-[#8E9B4D]">THINK, SPEAK</span> <br />
          &amp; AUTOMATE
        </h1>

        {/* Description */}
        <p className="text-[#9EA298] text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-[580px] mb-7 hero-fade-3">
          AI Engineer building production-focused AI applications, LLM systems, voice agents and intelligent automation for real-world products.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 hero-fade-4 w-full sm:w-auto">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8E9B4D] hover:bg-[#99a754] text-[#080A08] font-medium text-xs tracking-wide px-7 h-[46px] md:h-[48px] rounded-[4px] transition-all duration-200 focus:outline-none cursor-pointer"
          >
            <span>EXPLORE MY WORK</span>
            <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="/AbdulManan_Resume.pdf"
            download="AbdulManan_Resume.pdf"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#8E9B4D]/10 border border-[#8E9B4D]/35 hover:border-[#8E9B4D] text-[#F3F3EE] font-medium text-xs tracking-wide px-7 h-[46px] md:h-[48px] rounded-[4px] transition-all duration-200 focus:outline-none cursor-pointer"
          >
            <span>RESUME</span>
            <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-y-1 text-[#8E9B4D]">
              ↓
            </span>
          </a>
        </div>

        {/* Tablet & Mobile Agent Terminal Presentation */}
        <div className="block xl:hidden mt-7 hero-fade-4">
          <AgentTerminal />
        </div>

        {/* Mobile Horizontal Social Links Bar */}
        <div className="flex lg:hidden items-center justify-center gap-5 mt-6 pt-5 border-t border-[#8B9184]/20 w-full max-w-[300px]">
          <a
            href="https://github.com/MananAli05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B9184] hover:text-[#A7B45C] transition-colors p-1.5"
            aria-label="GitHub Profile"
          >
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/abdul-manan05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B9184] hover:text-[#A7B45C] transition-colors p-1.5"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </a>
          <a
            href="mailto:abdulmannan.developer@gmail.com"
            className="text-[#8B9184] hover:text-[#A7B45C] transition-colors p-1.5"
            aria-label="Send Email"
          >
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

      </div>

      {/* MINIMAL MOUSE SCROLL INDICATOR */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none">
        <div className="w-[18px] h-[26px] rounded-full border-[1.5px] border-[#8E9B4D]/45 flex justify-center pt-1 bg-[#080A08]/40 backdrop-blur-sm">
          <div className="w-1 h-1.5 bg-[#8E9B4D] rounded-full animate-bounce" />
        </div>
        <div className="w-[1px] h-3 bg-[#8E9B4D]/35" />
      </div>
    </section>
  );
}
