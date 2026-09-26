import { useState, useEffect } from 'react';
import { scrollToSection } from './motion/MotionProvider';

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top && scrollPosition < top + el.offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id, -110);
  };

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
      <div className="mx-auto max-w-[1180px] pointer-events-auto">
        {/* FLOATING GLASS PILL */}
        <div className="w-full h-[62px] md:h-[68px] pl-5 pr-2 md:pl-7 md:pr-2.5 rounded-full flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_-8px_rgba(16,19,12,0.12)]">
          {/* LEFT: brand */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2.5 group focus:outline-none text-left cursor-pointer"
            aria-label="Abdul Manan — return to top"
          >
            <img
              src="/logo.png"
              alt=""
              className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span className="font-display font-bold text-ink text-[16px] md:text-[17px] tracking-[-0.03em]">
              Abdul Manan
            </span>
          </button>

          {/* CENTER: links */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`group relative py-1.5 text-[14px] font-sans transition-colors duration-300 focus:outline-none cursor-pointer ${
                    isActive ? 'text-ink font-medium' : 'text-body hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-lime transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* RIGHT: CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => go('contact')}
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-ink text-cream text-[14px] font-sans font-medium transition-colors duration-300 hover:bg-[#1C2114] focus:outline-none cursor-pointer"
            >
              <span>Let's talk</span>
              <span className="grid place-items-center w-9 h-9 rounded-full bg-lime text-ink overflow-hidden">
                <span className="col-start-1 row-start-1 w-full text-center leading-none transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]">
                  →
                </span>
                <span className="col-start-1 row-start-1 w-full text-center leading-none -translate-x-[140%] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0">
                  →
                </span>
              </span>
            </button>
          </div>

          {/* MOBILE TRIGGER */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-11 h-11 rounded-full text-ink hover:bg-ink/5 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE PANEL */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-[28px] border border-line bg-white/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-1 shadow-[0_12px_40px_-12px_rgba(16,19,12,0.2)]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`flex items-center justify-between text-[15px] font-sans py-3 border-b border-line last:border-0 text-left transition-colors ${
                    isActive ? 'text-ink font-medium' : 'text-body'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-5 h-[2px] rounded-full bg-lime" />}
                </button>
              );
            })}
            <button
              onClick={() => go('contact')}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ink text-cream text-[14px] font-medium"
            >
              Let's talk <span className="text-lime">→</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
