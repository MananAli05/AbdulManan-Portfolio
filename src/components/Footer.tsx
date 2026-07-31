import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import FloatingAiWidget from './FloatingAiWidget';

export default function Footer() {
  return (
    <>
      <footer
        id="contact"
        className="relative py-16 sm:py-20 md:py-24 bg-[#070C08] text-[#F3F3EE] overflow-hidden border-t border-[#8E9B4D]/15"
      >
        {/* Floating glow behind footer content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#8E9B4D]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          

          {/* VERY LARGE HEADLINE */}
          <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.92] tracking-[0.015em] text-[#E9E5DF] max-w-[1000px] mx-auto mb-6 text-center font-sans">
            LET'S BUILD SOMETHING <br />
            <span className="text-[#8E9B4D]">INTELLIGENT.</span>
          </h2>

          {/* SUBTITLE UNDER HEADING */}
          <p className="text-[#9EA298] text-xs sm:text-sm md:text-base max-w-[700px] mx-auto font-normal leading-relaxed text-center mb-10">
            Have an idea, product, or workflow that could be smarter? <br className="hidden sm:block" />
            Let’s turn it into something practical, scalable, and ready for the real world.
          </p>

          {/* CENTER CTA BUTTON */}
          <div className="flex justify-center mb-16">
            <a
              href="mailto:abdulmannan.developer@gmail.com"
              className="inline-flex items-center gap-3 bg-[#8E9B4D] hover:bg-[#9EAB5D] text-[#070C08] px-8 py-4 rounded-[6px] font-mono text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-lg shadow-[#8E9B4D]/10"
            >
              LET'S TALK <span className="text-lg">→</span>
            </a>
          </div>

          {/* 3 CLEAN HORIZONTAL CONTACT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1080px] mx-auto mb-16">
            
            {/* EMAIL CARD */}
            <a
              href="mailto:abdulmannan.developer@gmail.com"
              className="group flex items-center justify-between p-5 sm:p-6 rounded-[6px] bg-[#0C120D] border border-[#8E9B4D]/20 transition-all duration-300 hover:border-[#8E9B4D]/60 hover:-translate-y-[2px] hover:shadow-[0_4px_20px_rgba(142,155,77,0.1)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-[5px] bg-[#8E9B4D]/10 flex items-center justify-center text-[#8E9B4D] shrink-0">
                  <FiMail className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[11px] text-[#8E9B4D] tracking-widest uppercase font-semibold">
                    EMAIL
                  </span>
                  <span className="text-[clamp(0.8125rem,1.1vw,1rem)] font-medium text-[#E9E5DF] group-hover:text-[#8E9B4D] transition-colors mt-0.5 font-sans truncate sm:break-all md:break-normal">
                    abdulmannan.developer@gmail.com
                  </span>
                </div>
              </div>
              <span className="text-xl font-mono text-[#8E9B4D] transition-transform duration-300 group-hover:translate-x-1.5 ml-2 shrink-0">
                →
              </span>
            </a>

            {/* LINKEDIN CARD */}
            <a
              href="https://www.linkedin.com/in/abdul-manan05"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 sm:p-6 rounded-[6px] bg-[#0C120D] border border-[#8E9B4D]/20 transition-all duration-300 hover:border-[#8E9B4D]/60 hover:-translate-y-[2px] hover:shadow-[0_4px_20px_rgba(142,155,77,0.1)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[5px] bg-[#8E9B4D]/10 flex items-center justify-center text-[#8E9B4D] shrink-0">
                  <FaLinkedinIn className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[#8E9B4D] tracking-widest uppercase font-semibold">
                    LINKEDIN
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#E9E5DF] group-hover:text-[#8E9B4D] transition-colors mt-0.5 font-sans">
                    Let's Connect
                  </span>
                </div>
              </div>
              <span className="text-xl font-mono text-[#8E9B4D] transition-transform duration-300 group-hover:translate-x-1.5 ml-2">
                →
              </span>
            </a>

            {/* GITHUB CARD */}
            <a
              href="https://github.com/MananAli05"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 sm:p-6 rounded-[6px] bg-[#0C120D] border border-[#8E9B4D]/20 transition-all duration-300 hover:border-[#8E9B4D]/60 hover:-translate-y-[2px] hover:shadow-[0_4px_20px_rgba(142,155,77,0.1)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[5px] bg-[#8E9B4D]/10 flex items-center justify-center text-[#8E9B4D] shrink-0">
                  <FaGithub className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[#8E9B4D] tracking-widest uppercase font-semibold">
                    GITHUB
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#E9E5DF] group-hover:text-[#8E9B4D] transition-colors mt-0.5 font-sans">
                    Explore My Work
                  </span>
                </div>
              </div>
              <span className="text-xl font-mono text-[#8E9B4D] transition-transform duration-300 group-hover:translate-x-1.5 ml-2">
                →
              </span>
            </a>

          </div>

          {/* BOTTOM FOOTER BAR */}
          <div className="pt-8 border-t border-[#8E9B4D]/15 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* LEFT: Portfolio Logo from /public */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Abdul Manan"
                className="h-7 w-auto object-contain filter drop-shadow-sm"
              />
            </div>

            {/* CENTER: Navigation Links */}
            <div className="flex items-center gap-6 font-mono text-xs text-[#9EA298]">
              <a
                href="https://www.linkedin.com/in/abdul-manan05"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8E9B4D] transition-colors uppercase tracking-wider"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/MananAli05"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8E9B4D] transition-colors uppercase tracking-wider"
              >
                GitHub
              </a>
              <a
                href="/AbdulManan_Resume.pdf"
                download="AbdulManan_Resume.pdf"
                className="hover:text-[#8E9B4D] transition-colors uppercase tracking-wider"
              >
                Resume
              </a>
            </div>

            {/* RIGHT: Copyright Notice */}
            <p className="font-mono text-xs text-[#9EA298]/80 tracking-wider">
              © 2026 Abdul Manan
            </p>

          </div>

        </div>
      </footer>

      {/* Floating Combined Chat & Voice AI Assistant Button */}
      <FloatingAiWidget />
    </>
  );
}
